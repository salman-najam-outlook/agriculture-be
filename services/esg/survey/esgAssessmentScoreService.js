const mongoose = require('mongoose');
const esgAssessment = require(rootPath +'/mongoose-models/survey/assessments/esgAssessment.js');
const esgAssessmentQuestionHeading = require(rootPath +'/mongoose-models/survey/assessments/esgAssessmentQuestionHeading.js');
const esgActionPlan = require(rootPath +'/mongoose-models/survey/questions/esgActionPlans.js');
const esgGetDataQuestion = require(rootPath + '/mongoose-models/survey/questions/esgGetDataQuestion.js');
const esgAssessmentQuestion = require(rootPath +'/mongoose-models/survey/assessments/esgAssessmentQuestion.js');
const esgAssessmentQuestionOption = require(rootPath +'/mongoose-models/survey/questions/esgAssessmentQuestionOptions.js');

/**
 * Five models are top to bottom
 */
const { EsgProtocolResponseInformation } = require(rootPath +'/mongoose-models/survey/response/esgProtocolResponseInformation.js');
const { EsgProtocolIssueGoalResponseInformation } = require(rootPath +'/mongoose-models/survey/response/esgProtocolIssueGoalResponseInformation.js');
const { EsgAssessmentResponseInformation, RESPONSE_INFORMATION_STATUS } = require(rootPath +'/mongoose-models/survey/response/esgAssessmentResponseInformation.js');
const { EsgAssessmentResponse } = require(rootPath +'/mongoose-models/survey/response/esgAssessmentResponse.js')
const { EsgGoal } = require(rootPath +'/mongoose-models/EsgGoal.js')
const User  = require(rootPath + '/mongoose-models/User.js')
const { round }  = require('lodash');
const { EsgProtocol } = require('../../../mongoose-models/EsgProtocol');

const ObjectId = mongoose.Types.ObjectId;

const calculateOptionScore = (option) => {
    return (option?.actionPlanScore || 0) + (option?.getDataScore || 0) + (option?.score || 0)
}

const calculateTotalQuestionScore = (question)  => {
  if(!question?.isScoreEnabled) {
    return 0
  }
  let questionScore = 0
  if(question?.options.length) { 
    const optionScores = question.options.map(calculateOptionScore)
     if (question.questionType === 'radio-button') {
        questionScore = Math.max(...optionScores)
      } else if (question.questionType === 'check-boxes') {
        questionScore = optionScores.reduce((sum, score) => sum + score, 0)
      }
      return questionScore
  }
  return question.score || 0
}

const getTotalQuestionScoreFromAssessmentId = async({
    assessmentId,
}) => {
    const questions = await getSurveyResponseQuestions({
        assessmentId
    })
    let totalQuestionScore = 0
    for (let question of questions) {
        const score = calculateTotalQuestionScore(question)
        totalQuestionScore += score
    }
    return totalQuestionScore
}

/**
 * Question Details Without response
 * @param {*} questionId 
 * @returns  
 */

const getSurveyQuestionDetailByQId = async (questionId) => {

    const assessmentQuestion = await esgAssessmentQuestion.aggregate([
        {
            $match: { 
                _id: new ObjectId(questionId),
                deletedAt: null,
            }
        },
        {
            $lookup:{
                from:'esgassessmentquestionheadings',
                localField: 'esgHeadingId',
                foreignField: '_id',
                as: 'questionHeading'
            }
        },
        {
            $lookup: {
                from: 'esggetdataquestions',
                let: { questionId: "$_id" },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $and: [
                                    { $eq: ["$esgAssessmentQuestionId", "$$questionId"] },
                                    { $eq: ["$esgAssessmentQuestionOptionId", null] }
                                ]
                            }
                        }
                    }
                ],
                as: 'getDataQuestions'
            }
        },
        {
            $unwind: '$questionHeading'
        }
    ]);
    for(let [index, ast] of assessmentQuestion?.entries()){
        const isCheckbox = ast.questionType == 'check-boxes' ? true: false
        const isRadio = ast.questionType == 'radio-button' ? true : false
        if(isCheckbox || isRadio) {
            const options = await esgAssessmentQuestionOption.aggregate([
                {
                    $match: {
                        esgAssessmentQuestionId: ast._id,
                        deletedAt: null,
                    },
                },  
                {
                    $lookup:{
                        from:'esggetdataquestions',
                        localField: '_id',
                        foreignField: 'esgAssessmentQuestionOptionId',
                        as: 'getDataQuestions'
                    }
                },
                {
                    $lookup:{
                        from:'esgactionplans',
                        localField: '_id',
                        foreignField: 'esgAssessmentQuestionOptionId',
                        as: 'actionPlans'
                    }
                },
            ])
            assessmentQuestion[index]["options"] = options
        }else{
            assessmentQuestion[index]["options"] = []
        }
    }
    return assessmentQuestion.length ? assessmentQuestion[0] : {}
};


const calculateSimpleQuestionScore = (questionDetail, response = null) => {
    return {
      questionScore: questionDetail.score || 0,
      responseScore: response ? questionDetail.score : 0
    }
}


/**
 * 
 * @param {*} questionDetail 
 * @param {*} response 
 * @returns  Object with questionScore and responseScore
 */


const calculateComplexQuestionScore = (questionDetail, response = null) => {
    let questionScore = 0
    let responseScore = 0

    if(['radio-button', 'check-boxes'].includes(questionDetail.questionType)) {
        // Calculate total possible score for the question
        const optionScores = questionDetail.options.map(calculateOptionScore)

        if (questionDetail.questionType === 'radio-button') {
          questionScore = Math.max(...optionScores)
        } else if (questionDetail.questionType === 'check-boxes') {
          questionScore = optionScores.reduce((sum, score) => sum + score, 0)
        }
    } else if(questionDetail.questionType === 'get-data') {
        questionScore = questionDetail.score;
    }
    if(!response) {
        return { questionScore, responseScore }
    }

    if(response && questionDetail.questionType == 'get-data') {
        responseScore = questionDetail.score;
        return { questionScore, responseScore };
    }

    /** This is for checkbox response and score calculation */
    if(response && Array.isArray(response)) {
        for (let indi of response) {
            let actionPlanScore = 0
            let getDataScore = 0
            const optionScore = questionDetail.options.filter(x => x._id == indi?.value?.id).map(x => x?.score).reduce((sum, score) => sum + score, 0)
            const isAnyActionPlan = response.map(x => x?.actionPlanResponses?.length).some(x => x > 0)
            const isAnyGetData = response.map(x => x?.getDataResponses?.length).some(x => x > 0)
            if(isAnyActionPlan){
                actionPlanScore = questionDetail.options.filter(x => x._id == indi?.value?.id).map(x => x?.actionPlanScore).reduce((sum, score) => sum + score, 0)
            }
            if(isAnyGetData) {
                getDataScore = questionDetail.options.filter(x => x._id == indi?.value?.id).map(x => x?.getDataScore).reduce((sum, score) => sum + score, 0)
            }
            responseScore += (optionScore + actionPlanScore + getDataScore)
        }
    }

    if(response && !Array.isArray(response) && response?.value?.id) {
        const providedOption = questionDetail.options.find(x => x._id.equals(response?.value.id))
       if(response?.actionPlanResponses?.length && response?.getDataResponses?.length){
        responseScore = questionScore
       }else if(response?.actionPlanResponses?.length){
        const actionPlanScore = providedOption.actionPlanScore
        responseScore = providedOption.score + actionPlanScore
       }else if(response?.getDataResponses?.length){
        const getDataScore = providedOption.getDataScore
        responseScore = providedOption.score + getDataScore
       }else{
        responseScore = providedOption.score
       }
    }

    return { questionScore, responseScore }
}


const calculateQuestionScoreAndResponseScore = async (params) => {
    const {
      questionDetail,
      response = null,
    } = params
  
    // Early return if scoring is not enabled
    if (!questionDetail?.isScoreEnabled) {
      return { questionScore: 0, responseScore: 0 }
    }
  
    const QUESTION_TYPES = {
      SIMPLE: ["text-field", "text-area", "attach-files", "digital-signature", "numeric"],
      COMPLEX: ["check-boxes", "radio-button", "get-data"]
    }

    // Route to appropriate calculator based on question type
    if (QUESTION_TYPES.SIMPLE.includes(questionDetail?.questionType)) {
      return calculateSimpleQuestionScore(questionDetail, response)
    }
  
    if (QUESTION_TYPES.COMPLEX.includes(questionDetail?.questionType)) {
      return calculateComplexQuestionScore(questionDetail, response)
    }
  
    // Default case for unknown question types
    return { questionScore: 0, responseScore: 0 }
}

/** Now api db call start from here
 * Get score from assessment id
 * @param {string} assessmentId
 * @param {string} goalId
 * @param {string} user
 * @returns {Promise<number>}
 */

const findAssessmentRespponseFromGoalAndAssessment = async ({
    goalId,
    assessmentId,
    questionId,
    submittedByType,
    submittedById = null,
    orgId = null,
    returnSubmittedData = false
}) => {
    const esgProtocolIssueGoalResponseInformation = await EsgProtocolIssueGoalResponseInformation.findOne({
        esgGoalId: new ObjectId(goalId),
        esgAssessmentId: new ObjectId(assessmentId),
        submittedByType:{$in:[submittedByType]},
        ...(submittedById && {submittedById: submittedById}),
    })
    if(!esgProtocolIssueGoalResponseInformation){
        return null;
    }

    const assessmentResponse = await EsgAssessmentResponse.findOne({
        esgAssessmentId: new ObjectId(assessmentId),
        esgAssessmentResponseInformationId: esgProtocolIssueGoalResponseInformation.esgAssessmentResponseInformationId,
        esgQuestionId: questionId,
        submittedByType:{$in:[submittedByType]},
        ...(submittedById && {submittedById: submittedById})
    })
    if(!assessmentResponse){
        return null;
    }
    if(returnSubmittedData){
        return {
            assessmentResponse: assessmentResponse?.response,
            submittedData: assessmentResponse.createdAt,
        }
    }
    return assessmentResponse?.response;
}

const getScoreForSuborganizationForAssessmentIds = async ({
    submittedByType,
    submittedById,
    orgId,
    includeFarmerAndSupplier = false,
    assessmentIds,
}) => {
    const assessmentToScoreMap = assessmentIds.reduce((assessmentToScore, id) => {
        assessmentToScore[id] = {
            questionScore: 0,
            responseScore: 0,
        };
        return assessmentToScore;
    }, {});

    if(assessmentIds.length === 0) return assessmentToScoreMap;

    const parsedSubmittedByType = includeFarmerAndSupplier && submittedByType === 'sub-organization' ? ['sub-organization', 'farmer', 'supplier'] :     [submittedByType];

    const queryFilter = {
        submittedByType: { $in: parsedSubmittedByType },
        esgAssessmentId: { $in: assessmentIds },
    }

    if(orgId) {
        queryFilter.orgId = orgId;
    }

    if(submittedById) {
        queryFilter.submittedById = submittedById;
    }
    const esgAssessmentResponseInformation = await EsgAssessmentResponseInformation.find(queryFilter);
    if(!esgAssessmentResponseInformation.length) {
        return assessmentToScoreMap;
    }

    const esgAssessmentResponseInformationIds = esgAssessmentResponseInformation.map(x => x._id);
    const assessmentResponse = await EsgAssessmentResponse.find({
        esgAssessmentResponseInformationId: { $in: esgAssessmentResponseInformationIds },
    });
    if(!assessmentResponse.length){
        return assessmentToScoreMap;
    }

    assessmentResponse.forEach(response => {
        const assessmentId = response.esgAssessmentId.toString();
        assessmentToScoreMap[assessmentId].responseScore += response.responseScore || 0;
        assessmentToScoreMap[assessmentId].questionScore += response.questionScore || 0;
    });
    return assessmentToScoreMap;
}

const getTotalResponseScoreFromAssessmentAndGoal = async({
    goalId,
    assessmentId,
    submittedByType,
    submittedById = null,
    orgId = null, 
    returnProgressStatus = false, 
    dateFilter = {}
}) => {

    const returnCase = ({
        returnProgressStatus, 
        score,
        status,
    }) => {
        if(returnProgressStatus){
            return {score, status}
        }
        return score
    }    

    
    const esgProtocolIssueGoalResponseInformation = await EsgProtocolIssueGoalResponseInformation.findOne({
        esgGoalId: goalId,
        esgAssessmentId: assessmentId,
        submittedByType:{$in:[submittedByType]},
        ...(submittedById && {submittedById: submittedById}),
    })
    if(!esgProtocolIssueGoalResponseInformation){
        return returnCase({
            returnProgressStatus, 
            score: 0,
            status: RESPONSE_INFORMATION_STATUS.NOT_STARTED,
        })
    }
    let status = RESPONSE_INFORMATION_STATUS.NOT_STARTED
    if(returnProgressStatus){
        const assessmentResponseInformation = await EsgAssessmentResponseInformation.findOne({
            _id: new ObjectId(esgProtocolIssueGoalResponseInformation.esgAssessmentResponseInformationId)
        })
        status = assessmentResponseInformation?.status
    }

    const assessmentResponse = await EsgAssessmentResponse.find({
        esgAssessmentId: new ObjectId(assessmentId),
        esgAssessmentResponseInformationId: esgProtocolIssueGoalResponseInformation.esgAssessmentResponseInformationId,
        submittedByType:{$in:[submittedByType]},
        ...(submittedById && {submittedById: submittedById}),
        ...(orgId && {orgId: new ObjectId(orgId)}),
        ...dateFilter
    })
    if(!assessmentResponse){
        return returnCase({
            returnProgressStatus, 
            score: 0,
            status: status,
        })
    }
    const responseScore = assessmentResponse.map(x => x.responseScore || 0).reduce((sum, score) => sum + score, 0)
    return returnCase({
        returnProgressStatus, 
        score: responseScore,
        status: status,
    })
}

/**
 * Get survey response questiions for 
 * individual user with goal
 * 
 */
const getSurveyResponseQuestions = async ({
    assessmentId,
    goalId=null,
    user=null,
    userType='sub-organization',
}) => {
    const assessmentQuestions = await esgAssessmentQuestion.aggregate([
        {
            $match: { 
                esgAssessmentId: new ObjectId(assessmentId),
                deletedAt: null,
                //questionType:{$nin:['check-boxes', 'radio-button']}
            }
        },
        {
            $lookup:{
                from:'esgassessmentquestionheadings',
                localField: 'esgHeadingId',
                foreignField: '_id',
                as: 'questionHeading'
            }
        },
        {
            $lookup: {
                from: 'esggetdataquestions',
                let: { questionId: "$_id" },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $and: [
                                    { $eq: ["$esgAssessmentQuestionId", "$$questionId"] },
                                    { $eq: ["$esgAssessmentQuestionOptionId", null] }
                                ]
                            }
                        }
                    }
                ],
                as: 'getDataQuestions'
            }
        },
        {
            $unwind: '$questionHeading'
        }
    ]);

    return Promise.all(assessmentQuestions?.map(async (ast) => {
        if(user){
            const response = await findAssessmentRespponseFromGoalAndAssessment({
                goalId,
                assessmentId,
                questionId: ast._id,
                submittedByType: userType,
                submittedById: user.mongoId,
            })
            ast.response = response || null
        }
        const isCheckbox = ast.questionType == 'check-boxes' ? true: false
        const isRadio = ast.questionType == 'radio-button' ? true : false
        if(isCheckbox || isRadio) {
            const options = await esgAssessmentQuestionOption.aggregate([
                {
                    $match: {
                        esgAssessmentQuestionId: ast._id,
                        deletedAt: null,
                    }
                },  
                {
                    $lookup:{
                        from:'esggetdataquestions',
                        localField: '_id',
                        foreignField: 'esgAssessmentQuestionOptionId',
                        as: 'getDataQuestions'
                    }
                },
                {
                    $lookup:{
                        from:'esgactionplans',
                        localField: '_id',
                        foreignField: 'esgAssessmentQuestionOptionId',
                        as: 'actionPlans'
                    }
                },
            ])
            ast.options = options
        } else {
            ast.options = []
        }

        return ast;
    }));
};

const getAssessmentQuestionHeadings = async (assessmentId) => { 
    const assessmentQuestionHeadings = await esgAssessmentQuestionHeading.aggregate([
        {
            $match: {
                esgAssessmentId: assessmentId,
                deletedAt: null
            }
        },
        
    ])
    return assessmentQuestionHeadings
}

const getAssessmentQuestionsByHeadingId = async ({
    headingId,
    assessmentId = null,
    goalId = null,
    submittedUser = null,
    userType = 'sub-organization',
}) => {
    const assessmentQuestions = await esgAssessmentQuestion.aggregate([
        {
            $match: { 
                esgHeadingId: headingId,
                deletedAt: null
            }
        },
        {
            $lookup:{
                from:'esgassessmentquestionheadings',
                localField: 'esgHeadingId',
                foreignField: '_id',
                as: 'questionHeading'
            }
        },
        {
            $lookup: {
                from: 'esggetdataquestions',
                let: { questionId: "$_id" },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $and: [
                                    { $eq: ["$esgAssessmentQuestionId", "$$questionId"] },
                                    { $eq: ["$esgAssessmentQuestionOptionId", null] }
                                ]
                            }
                        }
                    }
                ],
                as: 'getDataQuestions'
            }
        },
        {
            $unwind: '$questionHeading'
        }
    ]);
    for(let [index, ast] of assessmentQuestions?.entries()){
       if(submittedUser){
            const response = await findAssessmentRespponseFromGoalAndAssessment({
                goalId,
                assessmentId,
                questionId: ast._id,
                submittedByType: userType,
                submittedById: submittedUser._id,
                returnSubmittedData: true,
            })
            assessmentQuestions[index]["response"] = response?.assessmentResponse || null
            assessmentQuestions[index]["submittedDate"] = response?.submittedData || null
        }else{
            assessmentQuestions[index]["response"] = null
            assessmentQuestions[index]["submittedDate"] = null
        }
        const isCheckbox = ast.questionType == 'check-boxes' ? true: false
        const isRadio = ast.questionType == 'radio-button' ? true : false
        if(isCheckbox || isRadio) {
            const options = await esgAssessmentQuestionOption.aggregate([
                {
                    $match: { esgAssessmentQuestionId: ast._id, deletedAt: null}
                },  
                {
                    $lookup:{
                        from:'esggetdataquestions',
                        localField: '_id',
                        foreignField: 'esgAssessmentQuestionOptionId',
                        as: 'getDataQuestions'
                    }
                },
                {
                    $lookup:{
                        from:'esgactionplans',
                        localField: '_id',
                        foreignField: 'esgAssessmentQuestionOptionId',
                        as: 'actionPlans'
                    }
                },
            ])
            assessmentQuestions[index]["options"] = options
        }else{
            assessmentQuestions[index]["options"] = []
        }
    }
    return assessmentQuestions
}
/**
 * 
 * survey response for only for sub-organization
 * @returns 
 */
const getSurveyResponseQuestionsForSubOrganization = async ({
    assessmentId,
    goalId,
    submittedUser,
    userType='sub-organization',
}) => {
    const assessmentQuestionHeadings = await getAssessmentQuestionHeadings(assessmentId)
    
    for(let [index, heading] of assessmentQuestionHeadings?.entries()) {
        const assessmentQuestions = await getAssessmentQuestionsByHeadingId({
            headingId: heading._id,
            assessmentId,
            goalId,
            userType,
            submittedUser
        })
        assessmentQuestionHeadings[index]["assessmentQuestions"] = assessmentQuestions
    }
    return assessmentQuestionHeadings
};

/**
 * 
 * Get survey progress for  by assessmentID and GoalID
 * 
 */
const getSurveyProgressByAssessmentAndGoal = async ({
    assessmentId,
    goalId,
    userType='sub-organization',
    user,
    includeFarmerAndSupplier = false,
    orgId = null,
}) => {
    const totalQuestionScore = await getTotalQuestionScoreFromAssessmentId({
        assessmentId,
    })
    const {score:totalResponseScore, status} = await getTotalResponseScoreFromAssessmentAndGoal({
        assessmentId,
        goalId,
        submittedByType: 'sub-organization',
        returnProgressStatus: true,
    })
    return {
        progress: round((totalResponseScore/totalQuestionScore ) * 100, 2),
        totalQuestionScore,
        totalResponseScore,
        assessmentId,
        goalId,
        status,
    }
}


const getSurveyProgressBySubOrganizationIds = async ({ protocolId, subOrganizationIds = [], goalId = null }) => {
    const goals = await EsgGoal.find({
        esgProtocol: new ObjectId(protocolId),
        ...(goalId && { _id: new ObjectId(goalId) }),
    }).select('_id esgAssessment');
    return await Promise.all(
        subOrganizationIds.map(async (subOrg) => {
            const finalResult = [];
            const users = await User.find({
                subOrganization: subOrg,
                role:'sub_enterprise'
            }).select('_id');
            const userIds = users.map(user => user._id);
            await Promise.all(
                goals.map(async (goal) => {
                    const [questionScore, responseScore] = await Promise.all([
                        getTotalQuestionScoreFromAssessmentId({
                            assessmentId: new ObjectId(goal.esgAssessment),
                        }),
                        getTotalResponseScoreFromAssessmentAndGoal({
                            assessmentId: new ObjectId(goal.esgAssessment),
                            goalId: goal._id,
                            submittedByType: 'sub-organization',
                            submittedById: { $in: userIds },
                        }),
                    ]);

                    finalResult.push({
                        assessmentId: goal.esgAssessment,
                        goalId: goal._id,
                        totalQuestionScore: questionScore,
                        totalResponseScore: responseScore,
                    });
                })
            );

            const totalQuestionScore =
                finalResult.map((x) => x.totalQuestionScore).reduce((sum, score) => sum + score, 0) || 0;
            const totalResponseScore =
                finalResult.map((x) => x.totalResponseScore).reduce((sum, score) => sum + score, 0) || 0;
            const progress = totalQuestionScore > 0 ? (totalResponseScore / totalQuestionScore) * 100 : 0;

            return {
                subOrganizationId: subOrg,
                progress: round(progress, 2),
            };
        })
    );
};


const getESGFinalResult = (param) => {
    const types = ['Environmental', 'Social', 'Governance'];

    const results = types.map(type => {
        const items = param.filter(item => item.progressType === type);
        const totalQuestionScore = items.reduce((sum, item) => sum + item.totalQuestionScore, 0);
        const totalResponseScore = items.reduce((sum, item) => sum + item.totalResponseScore, 0);
        return {
            type,
            progress: totalQuestionScore > 0 ? round((totalResponseScore / totalQuestionScore) * 100, 2) : 0,
        }
    });

    const overallQuestionScore = param.reduce((sum, item) => sum + item.totalQuestionScore, 0);
    const overallResponseScore = param.reduce((sum, item) => sum + item.totalResponseScore, 0);
    const overallProgress = overallQuestionScore > 0 ? round((overallResponseScore / overallQuestionScore) * 100, 2) : 0;

    results.push({
        type: 'Overall',
        progress: overallProgress,
    });
    return results;
}

const getESGProgressForSubOrg = async ({
    subOrgId,
    esgProtocolId,
    submittedByType = 'sub-organization',
    startTargetYear = null,
    endTargetYear = null
}) => {
    if(startTargetYear) {
        if(isNaN(Number(startTargetYear)) || startTargetYear.toString().length !== 4) {
            startTargetYear = null;
        }
    }

    if(endTargetYear) {
        if(isNaN(Number(endTargetYear)) || endTargetYear.toString().length !== 4) {
            endTargetYear = null;
        }
    }

    if(startTargetYear && endTargetYear && startTargetYear > endTargetYear) {
        [startTargetYear, endTargetYear] = [endTargetYear, startTargetYear];
    }

    const targetYearQuery = {};
    if(startTargetYear && endTargetYear) {
        targetYearQuery.targetYears = {
            $gte: parseInt(startTargetYear),
            $lte: parseInt(endTargetYear)
        };
    } else if(startTargetYear) {
        targetYearQuery.targetYears = {
            $gte: parseInt(startTargetYear)
        };
    } else if(endTargetYear) {
        targetYearQuery.targetYears = {
            $lte: parseInt(endTargetYear)
        };
    }

    const [subOrgUser, goals] = await Promise.all([
        User.findOne({
            subOrganization: subOrgId,
            role:'sub_enterprise'
        }).select('_id'),
        EsgGoal.find({
            esgProtocol: esgProtocolId,
            ...targetYearQuery
        }).select('_id esgAssessment type')
    ]);

    const finalResult = []
    await Promise.all(goals.map(async goal => {
        const totalQuestionScore1 = await getTotalQuestionScoreFromAssessmentId({
            assessmentId: goal.esgAssessment,
        });
        const totalResponseScore1 = await getTotalResponseScoreFromAssessmentAndGoal({
            assessmentId:goal.esgAssessment,
            goalId: goal._id,
            submittedByType: submittedByType,
            submittedById: subOrgUser?._id,
        });
        finalResult.push({
            progressType: goal.type,
            assessmentId: goal.esgAssessment,
            goalId: goal._id,
            totalQuestionScore: totalQuestionScore1,
            totalResponseScore: totalResponseScore1,
            progress: totalQuestionScore1 > 0 ? round((totalResponseScore1/totalQuestionScore1) * 100, 2) : 0,
        });
    }));

    return getESGFinalResult(finalResult)
}

const getSurveyProgressBySubOrganizationTypeWise = async ({
 subOrganizationIds = [],
 esgProtocolId,
 startTargetYear = null,
 endTargetYear = null,
}) => {
    const progress = await Promise.all(subOrganizationIds.map(async orgId => {
        let rs = await getESGProgressForSubOrg({
           subOrgId: orgId,
           esgProtocolId,
           startTargetYear,
           endTargetYear
        })
        return {
            subOrganizationId: orgId,
            progress: rs,
        }
    }));

    return progress
}
 

/**
 * filter by Current Year | All Year
 * 
 * Anup Request Making this
 * Progress by  assessmentId, for sub-orgnization, farmer ,suplier ()
 * progress by goalId, assessmentId for sub-orgnization, farmer,suplier  
 * 
 * (Prajwal Request making this)
 * groub by issue type for overall score in issue
 * progress by Issue for sub-orgnization, farmer,suplier  (overall)
 * progress by Protocol for sub-orgnization, farmer,suplier   (Overall)
 * 
 */


/**
 *  For Sub Organization 
 *  ["sub-organization" => "farmer", "suplier"]
 *  Payload:  1. prtocol ID, submittedType,  submittedById 
 *  Response: Overall Prgoress 
 * 
 *  Individual Types: []
 *  Issue Wise Progress 
 *  Goal Wise Progress 
 * 
 * 
 * 
 */



/**
 *  Client (Organization)
 *  ProtocolId,  user (organization)
 *  Sub organization 
 */



//"sub" [3, (2,3)]
// [goalId, assessmentId, 'sub-organization', 'id']
/**
 * 
 * @param {*} param0 
 * @returns 
 * Get Assessment response progreess by self not other 
 */

const getAssessmentProgressByGoalIds = async ({
  goalIds = [],
  userMongoId, 
  userType = 'sub-organization'
}) => {
    const result = []
    for (let goalId of goalIds){
        const goal = await EsgGoal.findOne({_id:goalId})
        const response = await getAssessmentResponseProgressBySelf({
            goalId:goal._id,
            assessmentId:goal.esgAssessment,
            userMongoId,
            userType
        })
        result.push({
            ...response,
            issueId:goal.esgIssue
        })
    }
    return result
}

const getAssessmentResponseProgressBySelf = async ({
    assessmentId,
    goalId,
    userMongoId,
    userType='sub-organization',
}) => {
    const totalQuestionScore  = await getTotalQuestionScoreFromAssessmentId({
        assessmentId,
    })
    const {score:totalResponseScore, status} = await getTotalResponseScoreFromAssessmentAndGoal({
        assessmentId,
        goalId,
        submittedByType: userType,
        submittedById: userMongoId,
        returnProgressStatus: true,
    })

    const progress = totalQuestionScore > 0 ? (totalResponseScore/totalQuestionScore ) * 100 :  0
    return {
        progress:round(progress, 2),
        totalQuestionScore,
        totalResponseScore,
        assessmentId,
        goalId,
        status,
    }
}


/**
 * 
 * Get Assessment Response For individual Sub organization Farmer and supplier
 *  Progress by  assessmentId, for sub-orgnization, farmer ,suplier () For Anup Request
 */
const getAssessmentResponseForSubOrganizationAndFarmeAndSupplier = async ({
    assessmentId, 
    goalId, 
    userType='sub-organization',
    includeFarmerAndSupplier = false
}) => {
    const submittedByType = (userType == 'sub-organization' && includeFarmerAndSupplier) ? ['sub-organization', 'farmer', 'supplier'] : ['sub-organization']
    const questions = await getSurveyResponseQuestions({
        assessmentId,
    })
    let totalQuestionScore = 0
    for(let question of questions) {
        const questionScore = calculateTotalQuestionScore(question)
        totalQuestionScore += questionScore
    }
    /**
     * For future this part will be changed now only for sub-organization
     */
    const finalAssessmentResponse = []
    const mapppingProtocolIssueGoal = await EsgProtocolIssueGoalResponseInformation.find({
        esgGoalId: new ObjectId(goalId),
        esgAssessmentId: new ObjectId(assessmentId),
        submittedByType: {$in: submittedByType},
    })
    for (let mapping of mapppingProtocolIssueGoal) {
        const assessmentResponse = await EsgAssessmentResponse.find({
            esgAssessmentResponseInformationId: new ObjectId(mapping.esgAssessmentResponseInformationId)
        })
        let totalResponseScore = assessmentResponse.map(x => x.responseScore || 0).reduce((sum, score) => sum + score, 0)
        finalAssessmentResponse.push({
            assessmentResponseInformationId: mapping.esgAssessmentResponseInformationId,
            totalResponseScore:totalResponseScore,
            progress: (totalResponseScore/totalQuestionScore ) * 100
        })
    }
    const assessment = await esgAssessment.findOne({
        _id:new ObjectId(assessmentId)
    })
    return {
        assessmentId,
        goalId,
        finalAssessmentResponse,
        totalQuestionScore,
        assessment
    }
}

const calculateProtocolESGProgress = async ({
  protocolId,
  subOrganizationIds = null,
  userType = 'sub-organization',
  includeFarmerAndSupplier = false,
  startTargetYear = null,
  endTargetYear = null,
}) => {
  try {
    if (!protocolId || protocolId.toString().length < 24) throw new Error('Protocol ID is required');
    const protocol = await EsgProtocol.findOne({ _id: new ObjectId(protocolId) }).lean();
    if (!protocol) throw new Error('Protocol not found');

    if(startTargetYear) {
        if(isNaN(Number(startTargetYear)) || startTargetYear.toString().length !== 4) {
            startTargetYear = null;
        }
    }

    if(endTargetYear) {
        if(isNaN(Number(endTargetYear)) || endTargetYear.toString().length !== 4) {
            endTargetYear = null;
        }
    }

    if(startTargetYear && endTargetYear && startTargetYear > endTargetYear) {
        [startTargetYear, endTargetYear] = [endTargetYear, startTargetYear];
    }

    const targetYearQuery = {};
    if(startTargetYear && endTargetYear) {
        targetYearQuery.targetYears = {
            $gte: parseInt(startTargetYear),
            $lte: parseInt(endTargetYear)
        };
    } else if(startTargetYear) {
        targetYearQuery.targetYears = {
            $gte: parseInt(startTargetYear)
        };
    } else if(endTargetYear) {
        targetYearQuery.targetYears = {
            $lte: parseInt(endTargetYear)
        };
    }

    const goals = await EsgGoal.find({
        esgProtocol: protocolId,
        ...targetYearQuery,
    })
      .select('_id esgAssessment type')
      .lean();

    // TODO Update logic to support farmers and suppliers in future
    const submittedByType =
      userType === 'sub-organization' && includeFarmerAndSupplier
        ? ['sub-organization', 'farmer', 'supplier']
        : [userType];
    const processedSubOrganizationIds = Array.isArray(subOrganizationIds)
      ? subOrganizationIds
      : protocol.subOrganizations;

    const subOrganizationUsers = await User.find({
      subOrganization: { $in: processedSubOrganizationIds },
      role: 'sub_enterprise',
    })
      .select('_id subOrganization')
      .lean();

    const finalResult = [];
    await Promise.all(
      goals.map(async (goal) => {
        let questionScore = 0;
        let totalResponseScore = 0;

        await Promise.all([
            (async () => {
                questionScore = await getTotalQuestionScoreFromAssessmentId({
                    assessmentId: goal.esgAssessment,
                });
            })(),
            ...processedSubOrganizationIds.map(async (id) => {
                const userIds = subOrganizationUsers
                  .filter((user) => user.subOrganization.toString() === id.toString())
                  .map((user) => user._id.toString());
                const score = await getTotalResponseScoreFromAssessmentAndGoal({
                    assessmentId: goal.esgAssessment,
                    goalId: goal._id,
                    submittedByType: 'sub-organization',
                    submittedById: userIds,
                });
                totalResponseScore += score;
            }),
        ]);

        const totalQuestionScore = questionScore * processedSubOrganizationIds.length;
        finalResult.push({
          progressType: goal.type,
          assessmentId: goal.esgAssessment,
          goalId: goal._id,
          totalQuestionScore,
          totalResponseScore,
          progress: totalQuestionScore > 0 ? round((totalResponseScore / totalQuestionScore) * 100, 2) : 0,
        });
      })
    );

    const resultByType = getESGFinalResult(finalResult);

    return resultByType.reduce((response, item) => {
      response[item.type] = item.progress;
      return response;
    }, {});
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = {
    calculateQuestionScoreAndResponseScore,
    getAssessmentResponseForSubOrganizationAndFarmeAndSupplier,
    getSurveyQuestionDetailByQId,
    getSurveyResponseQuestions,
    getAssessmentResponseProgressBySelf,
    getSurveyResponseQuestionsForSubOrganization,
    findAssessmentRespponseFromGoalAndAssessment,
    getSurveyProgressBySubOrganizationIds,
    getESGProgressForSubOrg,
    getTotalQuestionScoreFromAssessmentId,
    getTotalResponseScoreFromAssessmentAndGoal,
    getESGFinalResult,
    calculateProtocolESGProgress,
    getSurveyProgressBySubOrganizationTypeWise,
    getScoreForSuborganizationForAssessmentIds,
    getAssessmentProgressByGoalIds
}