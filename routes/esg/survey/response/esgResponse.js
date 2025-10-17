const express = require('express');
const router = express.Router();
const { getAssessmentQuestions, saveSurveyQuestionResponse, getScoreFromAssessmentAndGoal,getSubOrganizationResponses,getAssessmentQuestionsV2, getSubOrganizationWiseProgress, getSubOrganizationTypeWiseProgress, saveResponseRejection,getAssessmentProgressByGoalIds } = require(rootPath + '/controllers/esg/survey/esgAssessmentResponseController.js')
const auth = require(rootPath +'/middleware/auth.js');
const { checkSchema } = require('express-validator');
const translationResponseMiddleware = require('../../../../middleware/translation/translationResponseMiddleware.js');
const {responseConfig, submitResponseConfig} = require('../../../../middleware/translation/configs/assessmentResponseConfig.js');

const surveyResponseSaveSchema = {
  esgProtocolId:{
    isMongoId: true,
    trim: true,
    notEmpty: true,
  },
  esgIssueId:{
    isMongoId: true,
    trim: true,
    notEmpty: true,
  },
  esgGoalId:{
    isMongoId: true,
    trim: true,
    notEmpty: true,
  },
  esgAssessmentId: {
    isMongoId: true,
    trim: true,
    notEmpty: true,
  },
  submittedById:{
    isMongoId: true,
    trim: true,
    notEmpty: false, 
  },
  submittedByType:{
    isString: true,
    notEmpty: true,
    isIn: {
      options: ["user",'supplier'],
    }
  },
  esgQuestionId:{
    isMongoId: true,
    trim: true,
    notEmpty: true,
  },
  nextStep:{
    isNumeric: true,   
    notEmpty: true,
  },
  response:{
    errorMessage: 'Response must be a valid object',
    notEmpty: true,
    custom: {
      options: (value) => {
        return typeof value === 'object' && !Array.isArray(value) && value !== null;
      }
    }
  },
};

router.get('/questions/:assessmentId/:goalId', auth, getAssessmentQuestions)
router.get('/questions-v2/:assessmentId/:goalId', auth, getAssessmentQuestionsV2, translationResponseMiddleware(submitResponseConfig))
router.post('/save-response', auth, checkSchema(surveyResponseSaveSchema), saveSurveyQuestionResponse)
router.get('/score-from-assessment-and-goal/:assessmentId/:goalId', auth, getScoreFromAssessmentAndGoal)

const subOrganizationResponseViewSchema = {
  subOrganizationId: {
    in: ['body'],
    exists: {
      errorMessage: 'subOrganizationId is required',
      options: { checkNull: true, checkFalsy: true },
    },
    optional: false,
    isMongoId: true,
    trim: true,
  },
  goalId: {
    in: ['body'],
    exists: {
      errorMessage: 'goalId is required',
      options: { checkNull: true, checkFalsy: true },
    },  
    optional: false,
    isMongoId: true,
    trim: true,
  },
}
router.post('/sub-organization-response-view',
  auth,
  checkSchema(subOrganizationResponseViewSchema, ['body']),
  getSubOrganizationResponses,
  translationResponseMiddleware(responseConfig)
)

/**
 * dashboard progress
 */
router.get('/sub-organization-wise-progress', auth, getSubOrganizationWiseProgress)

/**
 * sub organization wise type wise progress
 */
const validateSubOrganizationIds = {
  subOrganizationIds: {
    in: ['body'],
    exists: {
      errorMessage: 'subOrganizationIds is required',
      options: { checkNull: true, checkFalsy: true },
    },
    optional: false,
    isArray: true,
    custom: {
      options: (value) => {
        return value.every((id) => typeof id === 'string' && id.trim() !== '');
      }
    }
  },
  esgProtocolId:{
    in: ['body'],
    exists: {
      errorMessage: 'esgProtocolId is required',
      options: { checkNull: true, checkFalsy: true },
    },
    optional: false,
    isMongoId: true,
    trim: true,
  },
  startTargetYear: {
    in: ['body'],
    optional: true,
    isNumeric: true,
    isLength: {
      min: 4,
      max: 4,
    },
  },
  endTargetYear: {
    in: ['body'],
    optional: true,
    isNumeric: true,
    isLength: {
      min: 4,
      max: 4,
    },
  },
}
router.post('/sub-organization-wise-type-progress', checkSchema(validateSubOrganizationIds), auth, getSubOrganizationTypeWiseProgress)


//save response rejection
const saveResponseRejectionSchema = {
  esgAssessmentResponseId:{
    in:['body'],
    exists:{
      errorMessage:'esgAssessmentResponseId is required',
      options:{checkNull:true,checkFalsy:true},
    },
    optional:false,
    isMongoId:true,
    trim:true
  },
  rejectionReason:{
    in:['body'],
    exists:{
      errorMessage:'rejectionReason is required',
      options:{checkNull:true,checkFalsy:true},
    },
    optional:false,
    isString:true,
    trim:true,
  }
}
router.post('/save-response-rejection', auth, checkSchema(saveResponseRejectionSchema), saveResponseRejection)

router.post('/assessment-progress-by-goal-ids', auth, getAssessmentProgressByGoalIds)

module.exports = router;