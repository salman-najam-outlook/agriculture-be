const { EsgGoal } = require('../../mongoose-models/EsgGoal');
const { EsgIssue } = require('../../mongoose-models/EsgIssue');
const { EsgProtocol } = require('../../mongoose-models/EsgProtocol');
const esgAssessmentQuestionHeading = require('../../mongoose-models/survey/assessments/esgAssessmentQuestionHeading');
const { EsgAssessmentResponse } = require('../../mongoose-models/survey/response/esgAssessmentResponse');
const {
  EsgProtocolIssueGoalResponseInformation,
} = require('../../mongoose-models/survey/response/esgProtocolIssueGoalResponseInformation');

const { ObjectId } = require('mongodb');
const User = require('../../mongoose-models/User');
const _ = require('lodash');
const { getScoreForSuborganizationForAssessmentIds } = require('./survey/esgAssessmentScoreService');
const { EsgProtocolResponseInformation } = require('../../mongoose-models/survey/response/esgProtocolResponseInformation')

exports.getEsgProgressOfRespondentForProtocol = async (
  protocolId,
  submittedByType,
  submittedById,
  includeFarmerAndSupplier = true
) => {
  const protocol = await EsgProtocol.findOne({
    _id: protocolId,
  })
    .populate([
      {
        path: 'esgIssues',
        populate: 'esgGoals',
      },
      {
        path: 'esgStandard',
      },
    ])
    .exec();
  
  const responseInfo = await EsgProtocolResponseInformation.findOne({
    esgProtocolId: protocolId,
    submittedByType,
    submittedById
  }).sort({ createdAt: -1 }).exec();

  const assessmentIds = [];
  protocol.esgIssues.forEach((issue) => {
    issue.esgGoals.forEach((goal) => {
      if (goal.esgAssessment) {
        assessmentIds.push(goal.esgAssessment.toString());
      }
    });
  });
  const assessmentToScoreMap = await getScoreForSuborganizationForAssessmentIds({
    assessmentIds,
    orgId: submittedByType === 'sub-organization' ? submittedById : null,
    includeFarmerAndSupplier,
    submittedByType,
    submittedById: submittedByType === 'sub-organization' ? null : submittedById,
  });

  const protocolObject = protocol.toObject();
  protocolObject.esgIssues.forEach((issue) => {
    issue.esgGoals.forEach((goal) => {
      const assessmentId = goal.esgAssessment?.toString();
      let progress = 0;
      if (assessmentToScoreMap[assessmentId]) {
        const responseScore = assessmentToScoreMap[assessmentId].responseScore;
        const questionScore = assessmentToScoreMap[assessmentId].questionScore || 1;
        progress = _.round((responseScore / questionScore) * 100, 2);
      }
      goal.progress = progress;
    });

    issue.progress = _.round(
      issue.esgGoals.reduce((acc, goal) => acc + (goal.progress || 0), 0) / issue.esgGoals.length || 0,
      2
    );
  });

  protocolObject.status = responseInfo?.status;
  protocolObject.rejectionReason = responseInfo?.rejectionReason;

  protocolObject.progress = _.round(
    protocolObject.esgIssues.reduce((acc, issue) => acc + (issue.progress || 0), 0) / protocolObject.esgIssues.length ||
      0,
    2
  );

  return protocolObject;
};

exports.getEsgRecommendationOfRespondentForProtocol = async (
  protocolId,
  submittedByType,
  submittedById,
  includeFarmerAndSupplier
) => {
  const isSubOrganizationType = submittedByType === 'sub-organization';
  const parsedSubmittedByType =
    includeFarmerAndSupplier && isSubOrganizationType ? ['supplier', 'user', 'sub-organization'] : [submittedByType];
  const parsedSubmittedByIds = [new ObjectId(submittedById)];
  if (isSubOrganizationType) {
    const filter = {
      subOrganization: submittedById,
    };
    if (!includeFarmerAndSupplier) filter.role = 'sub_enterprise';

    const users = await User.find(filter).select('_id');
    users.forEach((user) => {
      parsedSubmittedByIds.push(user._id);
    });
  }

  const result = await EsgProtocolIssueGoalResponseInformation.aggregate([
    {
      $match: {
        esgProtocolId: new ObjectId(protocolId),
        submittedByType: { $in: parsedSubmittedByType },
        submittedById: { $in: parsedSubmittedByIds },
      },
    },
    {
      $lookup: {
        from: EsgAssessmentResponse.collection.name,
        localField: 'esgAssessmentResponseInformationId',
        foreignField: 'esgAssessmentResponseInformationId',
        as: 'esgResponse',
      },
    },
    {
      $unwind: {
        path: '$esgResponse',
        preserveNullAndEmptyArrays: false,
      },
    },
    {
      $unwind: {
        path: '$esgResponse.esgQuestionDetail.options',
        preserveNullAndEmptyArrays: false,
      },
    },
    {
      $unwind: {
        path: '$esgResponse.response',
        preserveNullAndEmptyArrays: false,
      },
    },
    {
      $match: {
        'esgResponse.esgQuestionDetail.options.isRecommendationEnabled': true,
        $expr: {
          $eq: ['$esgResponse.response.value.id', { $toString: '$esgResponse.esgQuestionDetail.options._id' }],
        },
      },
    },
    {
      $lookup: {
        from: esgAssessmentQuestionHeading.collection.name,
        localField: 'esgResponse.esgQuestionDetail.esgHeadingId',
        foreignField: '_id',
        as: 'esgResponse.esgQuestionDetail.esgHeading',
      },
    },
    {
      $unwind: {
        path: '$esgResponse.esgQuestionDetail.esgHeading',
        preserveNullAndEmptyArrays: false,
      },
    },
    {
      $lookup: {
        from: EsgIssue.collection.name,
        localField: 'esgIssueId',
        foreignField: '_id',
        as: 'esgIssue',
      },
    },
    {
      $unwind: {
        path: '$esgIssue',
        preserveNullAndEmptyArrays: false,
      },
    },
    {
      $lookup: {
        from: EsgGoal.collection.name,
        localField: 'esgGoalId',
        foreignField: '_id',
        as: 'esgGoal',
      },
    },
    {
      $unwind: {
        path: '$esgGoal',
        preserveNullAndEmptyArrays: false,
      },
    },
    {
      $project: {
        _id: 1,
        submittedByType: 1,
        submittedById: 1,
        esgProtocolId: 1,
        esgResponse: {
          _id: 1,
          submittedByType: 1,
          submittedById: 1,
          submittedBy: 1,
          orgId: 1,
          esgAssessmentId: 1,
          esgQuestionId: 1,
          esgQuestionDetail: {
            _id: 1,
            title: 1,
            order: 1,
            questionType: 1,
            questionHeading: {
              _id: 1,
              title: 1,
              order: 1,
            },
            options: {
              _id: 1,
              label: 1,
              recommendation: 1,
            },
          },
        },
        esgIssue: {
          _id: 1,
          title: 1,
          type: 1,
        },
        esgGoal: {
          _id: 1,
          title: 1,
        },
      },
    },
  ]).exec();

  const recommendationsByIssueType = {
    Environmental: [],
    Social: [],
    Governance: [],
  };
  result.forEach((responseInfo) => {
    const issueType = responseInfo.esgIssue.type;
    const optionId = responseInfo.esgResponse?.esgQuestionDetail?.options?._id?.toString();
    if (optionId) {
      const existingRecommendation = recommendationsByIssueType[issueType].find(
        (item) => item.esgQuestionDetail.options._id.toString() === optionId
      );
      if (existingRecommendation) {
        const existingSubmittedBy = existingRecommendation.submittedBy.find(
          (item) =>
            item.type === responseInfo.submittedByType &&
            item.id === responseInfo.submittedById.toString() &&
            item.submittedBy === responseInfo.esgResponse.submittedBy.toString()
        );
        if (!existingSubmittedBy) {
          existingRecommendation.submittedBy.push({
            type: responseInfo.submittedByType,
            id: responseInfo.submittedById.toString(),
          });
        }
      } else {
        recommendationsByIssueType[issueType].push({
          esgQuestionDetail: responseInfo.esgResponse.esgQuestionDetail,
          esgAssessmentId: responseInfo.esgResponse.esgAssessmentId,
          esgProtocolId: responseInfo.esgProtocolId,
          esgIssue: responseInfo.esgIssue,
          esgGoal: responseInfo.esgGoal,
          submittedBy: [
            {
              type: responseInfo.submittedByType,
              id: responseInfo.submittedById.toString(),
              submittedBy: responseInfo.esgResponse.submittedBy.toString(),
            },
          ],
        });
      }
    }
  });
  return recommendationsByIssueType;
};

exports.getRecommendedUsersOfSubOrganizationByOptionId = async (
  protocolId,
  subOrganizationId,
  esgQuestionOptionId,
  filters = {}
) => {
  const parsedSubmittedByIds = [new ObjectId(subOrganizationId)];
  const userFilters = {
    subOrganization: subOrganizationId,
  };
  const subOrganizationUsers = await User.find(userFilters).select('_id');
  subOrganizationUsers.forEach((user) => {
    parsedSubmittedByIds.push(user._id);
  });

  const responseResult = await EsgProtocolIssueGoalResponseInformation.aggregate([
    {
      $match: {
        esgProtocolId: new ObjectId(protocolId),
        submittedById: { $in: parsedSubmittedByIds },
        submittedByType: 'sub-organization',
      },
    },
    {
      $lookup: {
        from: EsgAssessmentResponse.collection.name,
        localField: 'esgAssessmentResponseInformationId',
        foreignField: 'esgAssessmentResponseInformationId',
        as: 'esgResponse',
      },
    },
    {
      $unwind: {
        path: '$esgResponse',
        preserveNullAndEmptyArrays: false,
      },
    },
    {
      $unwind: {
        path: '$esgResponse.esgQuestionDetail.options',
        preserveNullAndEmptyArrays: false,
      },
    },
    {
      $unwind: {
        path: '$esgResponse.response',
        preserveNullAndEmptyArrays: false,
      },
    },
    {
      $match: {
        'esgResponse.esgQuestionDetail.options.isRecommendationEnabled': true,
        'esgResponse.esgQuestionDetail.options._id': new ObjectId(esgQuestionOptionId),
        $expr: {
          $eq: ['$esgResponse.response.value.id', { $toString: '$esgResponse.esgQuestionDetail.options._id' }],
        },
      },
    },
    {
      $project: {
        esgResponse: {
          submittedBy: 1,
          submittedByType: 1,
        },
      },
    },
  ]).exec();

  const submittedByUserIds = responseResult.map((response) => response.esgResponse.submittedBy);
  const page = (filters.page ? parseInt(filters.page) : 1) || 1;
  const limit = (filters.limit ? parseInt(filters.limit) : 10) || 10;
  const skip = (page - 1) * limit;

  const filter = {
    _id: { $in: submittedByUserIds },
    ...(filters.search?.trim().length
      ? {
          $expr: {
            $regexMatch: {
              input: { $concat: ['$firstName', ' ', '$lastName'] },
              regex: new RegExp(filters.search, 'i'),
            },
          },
        }
      : {}),
  };

  const users = await User.find(filter).skip(skip).limit(limit).select({
    _id: 1,
    firstName: 1,
    lastName: 1,
  });

  const total = await User.countDocuments(filter);

  const formattedUsers = users.map((user) => {
    const type = responseResult.find((response) => response.esgResponse.submittedBy.toString() === user._id.toString())
      ?.esgResponse.submittedByType;
    return {
      ...user.toObject(),
      type,
      typeFormatted: type === 'sub-organization' ? 'Sub-Organization' : _.capitalize(type),
    };
  });

  return {
    total,
    users: formattedUsers,
    page,
    limit,
  };
};

exports.updateEsgProtocolResponseStatus = async (status, esgProtocolId, submittedByType, submittedById, user, rejectionReason) => {
  try {
    const updatedProtocol = await EsgProtocolResponseInformation.findOneAndUpdate(
      {
        esgProtocolId,
        submittedByType,
        submittedById,
        orgId: user.mongoOrganizationId,
      },
      {
        $set: {
          status,
          rejectionReason,
          statusUpdatedBy: user.mongoId,
          rejectedByUserId: user.mongoId,
          submittedBy: user.mongoId,
        }
      },
      {
        new: true,
        upsert: true,
      }
    );    
    return updatedProtocol;
  } catch (error) {
    throw new Error(`Failed to update ESG Protocol response status: ${error.message}`);
  }
};