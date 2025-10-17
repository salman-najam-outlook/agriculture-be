const mongoose = require('mongoose');
const { logErrorOccurred } = require(rootPath + '/helpers/general');
const { success, error } = require(rootPath + '/helpers/language');
const { saveSurveyResponse,
     getSurveyQuestionDetailByQId,
     getAssessmentQuestionsWithHeadingsAndResponse,
     saveResponseRejection
 } = require(rootPath +'/services/esg/survey/esgAssessmentResponseService.js');
const { EsgGoal } = require(`${rootPath}/mongoose-models/EsgGoal`);
const User = require(`${rootPath}/mongoose-models/User`);
const ObjectId = mongoose.Types.ObjectId;
const {
     getSurveyResponseQuestions,
     getAssessmentResponseProgressBySelf,
     getAssessmentResponseForSubOrganizationAndFarmeAndSupplier,
     getSurveyResponseQuestionsForSubOrganization,
     getSurveyProgressBySubOrganizationIds,
     getSurveyProgressBySubOrganizationTypeWise,
     getAssessmentProgressByGoalIds
     } = require(rootPath +'/services/esg/survey/esgAssessmentScoreService.js');
const { successResp, serverError, successRespSync, errorResp,errorRespSync } = require(rootPath + '/helpers/api');


exports.getAssessmentQuestions = async (req, res) => {
    const assessmentId = req.params.assessmentId //for Testing
    const goalId = req.params.goalId
    const user = req.user
    try {
        const assessmentQuestions = await getSurveyResponseQuestions({
            assessmentId,
            goalId,
            user,
            userType:'sub-organization',
        })
    
        const score = await getAssessmentResponseProgressBySelf({
            assessmentId, 
            goalId, 
            user,
            userType: 'sub-organization'
        })
    
        //const questionDetail = await getSurveyQuestionDetailByQId(questionId)
        const ares = await successRespSync({ msg: success.LIST,data:assessmentQuestions})
        ares["score_information"] = score
        res.status(200).json(ares);

    }catch(err){
        res.status(200).json(
            await errorResp({
                msg:error.SERVER,
                code:500,
            })
        );  
    }   
}
/**
 * 
 * Get assessment questions with headings and response
 * 
 */
exports.getAssessmentQuestionsV2 = async (req, res, next) => {
    const assessmentId = new ObjectId(req.params.assessmentId)  //for Testing
    const goalId = new ObjectId(req.params.goalId)
    const user = req.user
    const assessmentQuestions = await getAssessmentQuestionsWithHeadingsAndResponse({
        assessmentId,
        user,
        goalId,
        userType: 'sub-organization',
        orgId: user.mongoOrganizationId,
    })
    const score = await getAssessmentResponseProgressBySelf({
        assessmentId, 
        goalId, 
        user,
        userType: 'sub-organization'
    })

    // const ares = await successRespSync({ msg: success.LIST,data:assessmentQuestions})
    // ares["score_information"] = score
    // res.status(200).json(ares);

    res.locals.data = assessmentQuestions.map(h => ({
        ...h,
        score_information: score,
    }));
    next();
}


exports.saveSurveyQuestionResponse = async (req,res) => {
    const user = req.user
    const orgId = user.mongoOrganizationId
    if(!orgId){
        return res.status(400).json(
            await errorRespSync({
                    msg: error.INVALID_INPUT,
                    data:{"message":"Organization id is not mongo id"}
            })
        )
    }
    let result = []
    if(Array.isArray(req.body)){
        for(let i = 0; i < req.body.length; i++) {
            let {
                esgAssessmentId,
                submittedByType,
                submittedById = null,
                esgQuestionId,
                esgGoalId,
                esgProtocolId,
                esgIssueId,
                nextStep,
                response,
            } = req.body[i]
            const saveSurveyResponseReturn = await saveSurveyResponse({
                esgAssessmentId,
                submittedById : submittedById ? submittedById : user.mongoId,
                submittedByType,
                submittedBy:user.mongoId,
                esgIssueId,
                esgQuestionId,
                esgGoalId,
                esgProtocolId,
                nextStep,
                response,
                orgId
            })
            result.push(saveSurveyResponseReturn)
        } 
    }else {
        let {
        esgAssessmentId,
        submittedByType,
        submittedById = null,
        esgQuestionId,
        esgGoalId,
        esgProtocolId,
        esgIssueId,
        nextStep,
        response,
        }   = req.body
        const saveSurveyResponseReturn = await saveSurveyResponse({
            esgAssessmentId,
            submittedById : submittedById ? submittedById : user.mongoId,
            submittedByType,
            submittedBy:user.mongoId,
            esgIssueId,
            esgQuestionId,
            esgGoalId,
            esgProtocolId,
            nextStep,
            response,
            orgId
        })
        result = saveSurveyResponseReturn
    }   

    return res.status(200).json(
        await successRespSync(
            {
                msg: success.LIST,
                data:result
        })
    );
}

/**
 * Response View for sub-organization/ company
 * @POST Request 
 * @param {*} req 
 * @param {*} res 
 * @returns  
 */
exports.getSubOrganizationResponses = async (req, res, next) => {
    let {subOrganizationId, goalId} = req.body

    const submittedUser = await User.findOne({
        subOrganization: new ObjectId(subOrganizationId),
        role: 'sub_enterprise'
    })
    .populate('subOrganization')

    const goal = await EsgGoal.findOne({
        _id: new ObjectId(goalId),
    })

    if(!goal){
        return res.status(400).json(
            await errorRespSync({
                msg: error.INVALID_INPUT,
                data:{"message":"Goal id is not mongo id"}
            })
        )
    }

    const responses = await getSurveyResponseQuestionsForSubOrganization({
        goalId,
        assessmentId: goal.esgAssessment,
        userType: 'sub-organization',
        subOrganizationId,
        submittedUser
    })

    const response = {
        goal,
        responses,
        submittedUser:submittedUser
    }

    // return res.status(200).json(await successRespSync({msg: success.LIST, data: response}))

    res.locals.data = response
    next()
}



exports.getScoreFromAssessmentAndGoal = async (req, res) => {
    const assessmentId = req.params.assessmentId
    const goalId = req.params.goalId
    const user = req.user
    console.log("user", user)
    // const score = await getAssessmentResponseProgressBySelf({
    //     assessmentId, 
    //     goalId, 
    //     user,
    //     userType: 'sub-organization',
    //     includeFarmerAndSupplier: true
    // })   
    const score = await getAssessmentResponseForSubOrganizationAndFarmeAndSupplier({
        assessmentId,
        goalId,
        userType: 'sub-organization',
        includeFarmerAndSupplier: true
    })
    
    return res.status(200).json(await successRespSync({msg: success.LIST, data: score}))
}

/**
 * Progrress by sub-organizations Ids
 */

exports.getSubOrganizationWiseProgress = async (req,res) => {
    const progress = await getSurveyProgressBySubOrganizationIds({
        subOrganizationIds: [new ObjectId('680b039b5f5e388a6b6f57c9'), new ObjectId('680af22c5f5e388a6b6f57c3')],
        esgProtocolId: new ObjectId('680b039b5f5e388a6b6f57c9'),
    })
    return res.status(200).json(await successRespSync({msg: success.LIST, data: progress}))
}

/**
 * Get Progress by sub-orginization IDS 
 * @POST Request
 * @param {subOrganizationIds} req
 * @Return {
 *   [
 *     {
 *      subOrganizationId: '680b039b5f5e388a6b6f57c9',
*       progress: [{
*        type:'environment',
*        progress: 0.5,
 *     },
 *     {
 *       type:'social',progress: 0.5,
 *     },
 *     {
 *      type:'governance', progress: 0.5,
 *     }]
 *   ]
 *   
 * }
 * 
 */

exports.getSubOrganizationTypeWiseProgress = async (req,res) => {
    let { subOrganizationIds, esgProtocolId, startTargetYear, endTargetYear } = req.body;

    if(req.user.isSubEnterprise){
        subOrganizationIds = subOrganizationIds.filter(id => id.toString() == req.user.mongoSubOrganizationId.toString());
    }
    
    const progress = await getSurveyProgressBySubOrganizationTypeWise({
        subOrganizationIds: subOrganizationIds,
        esgProtocolId: new ObjectId(esgProtocolId),
        startTargetYear,
        endTargetYear,
    })
    return res.status(200).json(await successRespSync({msg: success.LIST, data: progress}))
}

//save response rejection 
exports.saveResponseRejection = async (req, res) => {
    const { esgAssessmentResponseId, rejectionReason } = req.body
    const user = req.user
    
    if(!esgAssessmentResponseId || !rejectionReason){
        return res.status(400).json(
            await errorRespSync({
                msg: error.INVALID_INPUT,
                data:{"message":"Invalid input"}
            })
        )
    }
    try {
        const response = await saveResponseRejection({
            esgAssessmentResponseId,
            rejectionReason,
            rejectedByUserId: user.mongoId,
            
        })
        return res.status(200).json(await successRespSync({msg: success.LIST, data: response}))
    } catch (err) {
        logErrorOccurred(err)
        return res.status(500).json(await serverError())
    }
}

exports.getAssessmentProgressByGoalIds = async (req, res) => {
  const { goalIds, subOrganizationId = null } = req.body
  const user = req.user
  let mongoUser = null
  if(subOrganizationId) {
    mongoUser = await User.findOne({subOrganization:new ObjectId(subOrganizationId)})
  }
  try {
        const response = await getAssessmentProgressByGoalIds({
            goalIds,
            userMongoId:subOrganizationId ? mongoUser?._id:user?.mongoId,
            userType: 'sub-organization'
        })
        return res.status(200).json(await successRespSync({msg: success.LIST, data: response}))
    } catch (err) {
        logErrorOccurred(err)
        return res.status(500).json(await serverError())
    }

}