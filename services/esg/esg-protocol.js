const { ObjectId } = require('mongodb');
const { EsgProtocol } = require('../../mongoose-models/EsgProtocol');
const s3 = require('../../components/s3');
const { EsgIssue } = require('../../mongoose-models/EsgIssue');
const { EsgGoal } = require('../../mongoose-models/EsgGoal');
const moment = require('moment');
const Organization = require('../../mongoose-models/Organization');
const { Op } = require('sequelize');
const { getFarmMetricByOrganizationIds } = require('../admin/organization');
const { getSurveyProgressBySubOrganizationIds, getTotalQuestionScoreFromAssessmentId, getTotalResponseScoreFromAssessmentAndGoal, getESGFinalResult, calculateProtocolESGProgress, getAssessmentProgressByGoalIds } = require('./survey/esgAssessmentScoreService');
const { EsgProtocolIssueGoalResponseInformation } = require('../../mongoose-models/survey/response/esgProtocolIssueGoalResponseInformation');
const db = require(rootPath + '/models');
const { round }  = require('lodash')
const { ChartJSNodeCanvas } = require('chartjs-node-canvas');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const ejs = require('ejs');
const axios = require('axios');
const User = require('../../mongoose-models/User');
const { EsgAssessmentResponse } = require('../../mongoose-models/survey/response/esgAssessmentResponse');

const findProtocolById = async (protocolId, user, populateRelation = false) => {
  const protocol = await EsgProtocol.findOne({
    _id: protocolId,
  }).exec();

  if (!protocol) return null;

  if (protocol.type === 'Protocol') {
    if (!user.isSuperAdmin) {
      if (user.isSubEnterprise) {
        const hasAccess = 
          protocol.cfOrganizationId == user.organization ||
          protocol.subOrganizations?.some(subOrg => 
            subOrg?.toString() === user.organization?.toString()
          );

        if (!hasAccess) return null;
      } else {
        if (protocol.cfOrganizationId != user.organization) return null;
      }
    }
  }

  if (populateRelation) {
    if (protocol.type === 'Protocol') {
      await protocol.populate([
        'esgStandard',
        'subOrganizations',
        {
          path: 'esgIssues',
          populate: 'esgGoals',
        },
      ]);
    } else {
      await protocol.populate({
        path: 'esgIssues',
        populate: 'esgGoals',
      });
    }
  }

  return protocol;
};

const createStandardOrProtocol = async (data, user) => {
  const {
    type,
    title,
    shortCode,
    description,
    sealKey,
    standardId,
    requiresMandatoryScoreForGovernanceScore = false,
    requiresMandatoryScoreForSocialScore = false,
    requiresMandatoryScoreForEnvironmentalScore = false,
    approvalMethod = 'Auto',
    environmentalScore = null,
    socialScore = null,
    governanceScore = null,
    overallScore = null,
    isActive = false,
  } = data;

  const sealUrl = await s3.getObjectURL(sealKey, true);

  const protocolData = {
    type,
    title,
    shortCode,
    description,
    sealKey,
    sealUrl,
    environmentalScore,
    socialScore,
    governanceScore,
    overallScore,
    esgStandard: type === 'Standard' ? null : standardId,
    requiresMandatoryScoreForGovernanceScore,
    requiresMandatoryScoreForSocialScore,
    requiresMandatoryScoreForEnvironmentalScore,
    approvalMethod,
    createdByUser: user.mongoId,
    createdByCfUserId: user.id,
    organization: user.mongoOrganizationId,
    cfOrganizationId: user.organization,
    isActive,
    startDate: isActive ? moment.utc().toDate() : null,
    _clientMetadata: user.clientMetadata,
  };
  if (type === 'Standard' || !standardId) {
    const standard = await EsgProtocol.create(protocolData);
    return standard;
  }

  const standard = await findProtocolById(standardId, user, true);
  if (!standard) {
    return null;
  }

  const clonedStandardData = {
    ...standard.toObject(),
    ...protocolData,
    _id: new ObjectId(),
  };

  const issues = [];
  const goals = [];

  delete clonedStandardData.createdAt;
  delete clonedStandardData.updatedAt;
  if (Array.isArray(clonedStandardData.esgIssues)) {
    clonedStandardData.esgIssues.forEach((issue) => {
      issue.esgProtocol = clonedStandardData._id;
      issue.originalEsgIssue = issue._id;
      issue.createdByUser = user.mongoId;
      issue.createdByCfUserId = user.id;
      issue.organization = user.mongoOrganizationId;
      issue.cfOrganizationId = user.organization;
      issue._id = new ObjectId();
      delete issue.createdAt;
      delete issue.updatedAt;
      if (Array.isArray(issue.esgGoals)) {
        issue.esgGoals.forEach((goal) => {
          goal.createdByUser = user.mongoId;
          goal.createdByCfUserId = user.id;
          goal.organization = user.mongoOrganizationId;
          goal.cfOrganizationId = user.organization;
          goal.esgProtocol = clonedStandardData._id;
          goal.esgIssue = issue._id;
          goal.originalEsgGoal = goal._id;
          delete goal._id;
          delete goal.createdAt;
          delete goal.updatedAt;
          goals.push(goal);
        });
      }
      issues.push(issue);
    });
  }
  await Promise.all([EsgProtocol.create(clonedStandardData), EsgIssue.insertMany(issues), EsgGoal.insertMany(goals)]);

  return clonedStandardData;
};

const updateProtocolDataById = async (protocolId, data, user) => {
  const { title, shortCode, description, sealKey } = data;

  const sealUrl = await s3.getObjectURL(sealKey, true);
  const protocol = await findProtocolById(protocolId, user);
  if (!protocol) return null;

  protocol.set({
    title,
    shortCode,
    description,
    sealKey,
    sealUrl,
    lastModifiedByUser: user.mongoId,
    _clientMetadata: user.clientMetadata,
  });

  await protocol.save();
  return protocol;
};

const updateProtocolSettings = async (protocolId, data, user) => {
  const protocol = await findProtocolById(protocolId, user);

  if (!protocol) return null;
  const {
    approvalMethod = protocol.approvalMethod,
    isActive = protocol.isActive,
    overallScore = protocol.overallScore,
    environmentalScore = protocol.environmentalScore,
    socialScore = protocol.socialScore,
    governanceScore = protocol.governanceScore,
    requiresMandatoryScoreForEnvironmentalScore = protocol.requiresMandatoryScoreForEnvironmentalScore,
    requiresMandatoryScoreForSocialScore = protocol.requiresMandatoryScoreForSocialScore,
    requiresMandatoryScoreForGovernanceScore = protocol.requiresMandatoryScoreForGovernanceScore,
  } = data;
  const startDate = isActive ? (protocol.isActive ? protocol.startDate : moment.utc().toDate()) : null;
  const deadlineDate = startDate ? await getRecalculatedProtocolDeadline(protocolId) : null;
  protocol.set({
    approvalMethod,
    isActive,
    overallScore,
    environmentalScore,
    socialScore,
    governanceScore,
    requiresMandatoryScoreForEnvironmentalScore,
    requiresMandatoryScoreForSocialScore,
    requiresMandatoryScoreForGovernanceScore,
    startDate,
    deadlineDate,
    lastModifiedByUser: user.mongoId,
    _clientMetadata: user.clientMetadata,
  });

  await protocol.save();
  return protocol;
};

const deleteProtocolById = async (protocolId, user) => {
  const protocol = await findProtocolById(protocolId, user);
  if (!protocol) return null;

  protocol._clientMetadata = user.clientMetadata;
  protocol.lastModifiedByUser = user.mongoId;

  await Promise.all([
    protocol.delete(),
    EsgIssue.delete({
      esgProtocol: protocolId,
    }),
    EsgGoal.delete({
      esgProtocol: protocolId,
    }),
  ]);
  return protocol;
};

const incrementIssuesCountOfEsgProtocol = async (protocolId, incrementBy = 1) => {
  return EsgProtocol.updateOne(
    { _id: protocolId },
    {
      $inc: { noOfIssues: incrementBy },
    }
  );
};

const incrementGoalsCountOfEsgProtocol = async (protocolId, incrementBy = 1) => {
  return EsgProtocol.updateOne(
    { _id: protocolId },
    {
      $inc: { noOfGoals: incrementBy },
    }
  );
};

const getRecalculatedProtocolDeadline = async (protocolId) => {
  const goalWithMaxTarget = await EsgGoal.findOne({
    esgProtocol: protocolId,
    isActive: true,
  })
    .sort({
      targetYears: 'desc',
    })
    .populate('esgProtocol', 'startDate')
    .select({
      targetYears: 1,
    })
    .exec();
  if (!goalWithMaxTarget) return null;

  const deadline = moment().utc().year(goalWithMaxTarget.targetYears).endOf('year').toDate();
  return deadline;
};

const recalculateProtocolDeadline = async (protocolId) => {
  const deadline = await getRecalculatedProtocolDeadline(protocolId);
  if(!deadline) return;
  return EsgProtocol.updateOne({ _id: protocolId }, { deadlineDate: deadline });
};

const getProtocolQueryFilter = async (type, user, queryParams) => {
  console.log("queryParams", user);
  const filter = [
    {
      type,
    },
  ];
  const { standardId, isActive, country, product } = queryParams;
  
  if (standardId) {
    filter.push({ esgStandard: standardId });
  }
  
  if (isActive === 'true' || isActive === '1') {
    filter.push({ isActive: true });
  } else if (isActive === 'false' || isActive === '0') {
    filter.push({ isActive: false });
  }

  console.log("userdetails", user);
  // Handle Protocol type with suborganization check
  if (type === 'Protocol') {
    if (user.isSubEnterprise && user.mongoSubOrganizationId) {
      filter.push({
        $or: [
          { subOrganizations: user.mongoSubOrganizationId }
        ]
      });
    } else {
      filter.push({ cfOrganizationId: user.organization });
    }
  }

  const countries = country ? (Array.isArray(country) ? country : [country]) : null;
  const products = product ? (Array.isArray(product) ? product : [product]) : null;

  if (countries || products) {
    const cfSubOrganizations = await db.Organization.findAll({
      where: {
        parentId: user.organization,
        ...(countries ? { country: { [Op.in]: countries } } : {}),
      },
      attributes: ['id'],
      include: [
        {
          association: 'products',
          where: products ? { id: { [Op.in]: products } } : {},
          required: products ? true : false,
          attributes: [],
          through: { attributes: [] },
        },
      ],
    });
    const cfOrganizationIds = cfSubOrganizations.map((subOrg) => subOrg.id);
    const subOrganizations = await Organization.find({
      cfOrgId: { $in: cfOrganizationIds },
    })
      .select('_id')
      .exec();
    const orgIds = subOrganizations.map((subOrg) => subOrg._id);
    
    filter.push({
      $or: [{ organization: { $in: orgIds } }, { subOrganizations: { $in: orgIds } }],
    });
  }

  return { $and: filter };
};

const getProtocolsCount = async (type, user, queryParams) => {
  const filter = await getProtocolQueryFilter(type, user, queryParams);
  return EsgProtocol.countDocuments(filter);
};

const getPaginatedProtocols = async (type, user, queryParams) => {
  const page = (queryParams.page ? parseInt(queryParams.page) : 1) || 1;
  const limit = (queryParams.limit ? parseInt(queryParams.limit) : 10) || 10;
  const filter = await getProtocolQueryFilter(type, user, queryParams);
  const skip = (page - 1) * limit;
  let [protocols, total] = await Promise.all([
    EsgProtocol.find(filter)
      .sort({
        createdAt: 'desc',
      })
      .skip(skip)
      .limit(limit)
      .populate('esgStandard')
      .exec(),
    getProtocolsCount(type, user, queryParams),
  ]);

  if (queryParams.includeProgress === 'true' || queryParams.includeProgress === '1') {
    const protocolIds = protocols.map((protocol) => protocol._id);
    const goals = await EsgGoal.find({
      esgProtocol: { $in: protocolIds },
      isActive: true,
    })
      .select('esgProtocol type')
      .exec();

    const subOrganizationObjectIds = new Set();
    protocols.forEach((protocol) => {
      protocol.subOrganizations.forEach((subOrg) => {
        subOrganizationObjectIds.add(subOrg);
      });
    });
    const subOrganizations = await Organization.find({
      _id: { $in: Array.from(subOrganizationObjectIds) },
    })
      .select('cfOrgId')
      .exec();
    const subOrganizationIds = subOrganizations.map((subOrg) => subOrg.cfOrgId.toString());

    const farmMetricByOrgIds = await getFarmMetricByOrganizationIds(subOrganizationIds);
    protocols = protocols.map((protocol) => {
      protocol = protocol.toObject();
      protocol.farmCount = 0;
      protocol.farmerCount = 0;

      subOrganizations.forEach((subOrg) => {
        const subOrgIds = protocol.subOrganizations.map((subOrg) => subOrg.toString());
        if (protocol.cfOrganizationId.toString() !== subOrg.cfOrgId.toString() && subOrgIds.includes(subOrg._id.toString())) {
          const farmCount = farmMetricByOrgIds[subOrg.cfOrgId.toString()]?.farmCount || 0;
          protocol.farmCount += farmCount;
          const farmerCount = farmMetricByOrgIds[subOrg.cfOrgId.toString()]?.farmerCount || 0;
          protocol.farmerCount += farmerCount;
        }
      });

      const goalsCountByType = {
        Governance: 0,
        Social: 0,
        Environmental: 0,
        total: 0,
      };

      goals.forEach((goal) => {
        if (goal.esgProtocol.toString() === protocol._id.toString()) {
          goalsCountByType[goal.type]++;
          goalsCountByType.total++;
        }
      });
      protocol.goalsCountByType = goalsCountByType;
      return protocol;
    });
  }

  return {
    rows: protocols,
    totalItems: total,
    totalPage: Math.ceil(total / limit),
    currentPage: page,
    limit,
  };
};

const updateProtocolStatusById = async (protocolId, isActive, user) => {
  const protocol = await findProtocolById(protocolId, user);

  if (!protocol) return null;

  const startDate = isActive ? (protocol.isActive ? protocol.startDate : moment.utc().toDate()) : null;
  const deadlineDate = startDate ? await getRecalculatedProtocolDeadline(protocolId) : null;
  protocol.deadlineDate = deadlineDate;
  protocol.startDate = startDate;
  protocol.isActive = isActive;
  protocol.lastModifiedByUser = user.mongoId;
  protocol._clientMetadata = user.clientMetadata;
  await protocol.save();
  return protocol;
};

const assignSubOrganizationToEsgProtocol = async (protocolId, subOrganizationIds, user) => {
  const protocol = await EsgProtocol.findOne({
    _id: protocolId,
  });
  if (!protocol) return null;
  const updatedProtocol = await EsgProtocol.findByIdAndUpdate(
    protocolId,
    {
      $set: { subOrganizations: subOrganizationIds },
      _clientMetadata: user.clientMetadata,
      lastModifiedByUser: user.mongoId,
    },
    { new: true }
  ).populate('subOrganizations');
  return updatedProtocol;
};

const removeSubOrganizationFromEsgProtocol = async (protocolId, subOrganizationIds, user) => {
  const protocol = await EsgProtocol.findOne({
    _id: protocolId,
  });
  if (!protocol) return null;
  const updatedProtocol = await EsgProtocol.findByIdAndUpdate(
    protocolId,
    {
      $pull: { subOrganizations: { $in: subOrganizationIds } },
      _clientMetadata: user.clientMetadata,
      lastModifiedByUser: user.mongoId,
    },
    { new: true }
  ).populate('subOrganizations');
  return updatedProtocol;
};

const getProtocolSubOrganizations = async (protocolId) => {
  const protocol = await EsgProtocol.findOne({
    _id: protocolId,
  })
    .populate('subOrganizations')
    .exec();
  if (!protocol) return null;
  return protocol.subOrganizations;
};

const getProtocolSubOrganizationsProgressTable = async (protocolId, query) => {
  const { 
    search, 
    environmentalRange, 
    socialRange, 
    governanceRange, 
    overallRange,
    page = 1,
    limit = 10 
  } = query;

  const protocol = await EsgProtocol.findOne({
    _id: protocolId,
  }).populate({
    path: 'subOrganizations',
    match: search ? { name: { $regex: search, $options: 'i' } } : {},
    select: 'name status'
  }).exec();

  if (!protocol) return null;

  let filteredOrgs = protocol.subOrganizations.map(org => ({
    ...org.toObject(),
    environmental: protocol.environmentalScore || 0,
    social: protocol.socialScore || 0,
    governance: protocol.governanceScore || 0,
    overallProgress: protocol.overallScore || 0,
  }));

  // Apply range filters if provided
  if (environmentalRange) {
    const [min, max] = environmentalRange.split('-').map(Number);
    filteredOrgs = filteredOrgs.filter(org => 
      org.environmental >= min && org.environmental <= max
    );
  }

  if (socialRange) {
    const [min, max] = socialRange.split('-').map(Number);
    filteredOrgs = filteredOrgs.filter(org => 
      org.social >= min && org.social <= max
    );
  }

  if (governanceRange) {
    const [min, max] = governanceRange.split('-').map(Number);
    filteredOrgs = filteredOrgs.filter(org => 
      org.governance >= min && org.governance <= max
    );
  }

  if (overallRange) {
    const [min, max] = overallRange.split('-').map(Number);
    filteredOrgs = filteredOrgs.filter(org => 
      org.overallProgress >= min && org.overallProgress <= max
    );
  }

  // Calculate pagination
  const totalItems = filteredOrgs.length;
  const totalPages = Math.ceil(totalItems / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  const paginatedOrgs = filteredOrgs.slice(startIndex, endIndex);

  return {
    rows: paginatedOrgs,
    pagination: {
      currentPage: page,
      totalPages,
      totalItems,
    }
  };
};

const getProtocolGoalProgress = async (protocolId, query) => {
  const { 
    goalId,
    search,
    page = 1,
    limit = 10 
  } = query;

  try {
    const subOrganizations = await getProtocolSubOrganizations(protocolId);
    
    if (!subOrganizations || subOrganizations.length === 0) {
      return {
        rows: [],
        pagination: {
          currentPage: page,
          totalPages: 0,
          totalItems: 0,
        }
      };
    }

    const subOrgIds = subOrganizations.map(org => org._id);

    const progress = await getSurveyProgressBySubOrganizationIds({
      subOrganizationIds: subOrgIds,
      goalId,
      protocolId,
    });
    
    const rows = subOrganizations.map(org => ({
      _id: org._id,
      name: org.name,
      code: org.code,
      status: org.status,
      progress: progress.find(p => p.subOrganizationId.toString() === org._id.toString())?.progress || 0
    }));


    let filteredRows = rows;
    if (search) {
      filteredRows = rows.filter(org => 
        org.name.toLowerCase().includes(search.toLowerCase()) ||
        org.code.toLowerCase().includes(search.toLowerCase())
      );
    }

    const totalItems = filteredRows.length;
    const totalPages = Math.ceil(totalItems / limit);
    const startIndex = (page - 1) * limit;
    const paginatedRows = filteredRows.slice(startIndex, startIndex + limit);

    return {
      rows: paginatedRows,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems,
      }
    };

  } catch (error) {
    console.error('Error in getProtocolGoalProgress:', error);
    throw error;
  }
};

function getMonthsOfYear(year) {
  return Array.from({ length: 12 }, (_, i) => moment({ year, month: i }).format('MMM'));
}

const getProtocolProgressForChart = async ({ protocolId, startTargetYear = null, endTargetYear = null }) => {
  try {
    if(startTargetYear) {
      if(isNaN(Number(startTargetYear)) || startTargetYear.toString().length !== 4) {
        startTargetYear = new Date().getFullYear();
      }
    } else {
      startTargetYear = new Date().getFullYear();
    }

    if(endTargetYear) {
      if(isNaN(Number(endTargetYear)) || endTargetYear.toString().length !== 4) {
        endTargetYear = new Date().getFullYear();
      }
    } else {
      endTargetYear = new Date().getFullYear();
    }

    if(startTargetYear > endTargetYear) {
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

    if (!protocolId || protocolId.toString().length < 24) throw new Error('Protocol ID is required');
    const protocol = await EsgProtocol.findOne({ _id: new ObjectId(protocolId) }).lean();
    if (!protocol) throw new Error('Protocol not found');

    const goals = await EsgGoal.find({ esgProtocol: protocolId, ...targetYearQuery }).select('_id esgAssessment type targetYears').lean();

    // Get unique assessment IDs to batch process
    const assessmentIds = [...new Set(goals.map((goal) => goal.esgAssessment.toString()))];

    // Batch fetch all question scores for assessments
    const questionScores = await Promise.all(
      assessmentIds.map((assessmentId) =>
        getTotalQuestionScoreFromAssessmentId({
          assessmentId: new ObjectId(assessmentId),
        })
      )
    );

    // Create a map of assessment scores for quick lookup
    const assessmentScoresMap = new Map(assessmentIds.map((id, index) => [id.toString(), questionScores[index]]));

    // Response Information for protocol
    const protocolIssueGoalResponseInformations = await EsgProtocolIssueGoalResponseInformation.find({
      esgProtocolId: protocolId,
    })
      .select('_id esgAssessmentResponseInformationId esgGoalId')
      .lean();
    const responseInformationIds = protocolIssueGoalResponseInformations.map(
      (info) => info.esgAssessmentResponseInformationId
    );

    // Responses
    const responses = await EsgAssessmentResponse.find({
      esgAssessmentResponseInformationId: { $in: responseInformationIds },
      esgAssessmentId: { $in: assessmentIds },
    })
      .select('_id esgAssessmentId esgAssessmentResponseInformationId responseScore createdAt')
      .lean();

    const isYearly = parseInt(startTargetYear) !== parseInt(endTargetYear);

    const progressLength = isYearly ? endTargetYear - startTargetYear + 1 : 12;

    // Initialize progress tracking
    const progressResult = {
      Environmental: {},
      Social: {},
      Governance: {},
    };

    for (let progressIdx = 0; progressIdx < progressLength; progressIdx++) {
      if(isYearly) {
        const targetYear = parseInt(startTargetYear) + progressIdx;

        for(const type in progressResult) {
          if(!(targetYear in progressResult[type])) {
            progressResult[type] = { ...progressResult[type], [targetYear]: 0 };
          }
        }

        const goalsInTargetYear = goals.filter(goal => parseInt(goal.targetYears) === parseInt(targetYear));

        const progressByIssueType = {
          Governance: { totalQuestionScore: 0, totalResponseScore: 0 },
          Social: { totalQuestionScore: 0, totalResponseScore: 0 },
          Environmental: { totalQuestionScore: 0, totalResponseScore: 0 },
        };

        for(const goal of goalsInTargetYear) {
          const protocolResponseInformations = protocolIssueGoalResponseInformations.filter(
            (info) => info.esgGoalId.toString() === goal._id.toString()
          );
          const responseInformationIds = protocolResponseInformations.map((info) =>
            info.esgAssessmentResponseInformationId.toString()
          );
          const goalResponses = responses.filter((r) => {
            return (
              r.esgAssessmentId.toString() === goal.esgAssessment.toString() &&
              responseInformationIds.includes(r.esgAssessmentResponseInformationId.toString())
            );
          });

          const totalQuestionScore = assessmentScoresMap.get(goal.esgAssessment.toString()) * protocol.subOrganizations.length;
          const totalResponseScore = goalResponses
            .map((response) => response.responseScore || 0)
            .reduce((sum, val) => val + sum, 0);

          const goalType = goal.type;
          progressByIssueType[goalType].totalQuestionScore += totalQuestionScore;
          progressByIssueType[goalType].totalResponseScore += totalResponseScore;
        }

        for (const type in progressByIssueType) {
          const questionScore = progressByIssueType[type].totalQuestionScore;
          const responseScore = progressByIssueType[type].totalResponseScore;
          progressResult[type][targetYear] = questionScore > 0 ? round((responseScore / questionScore) * 100, 2) : 0;
        }
      } else {
        const month = moment.utc(startTargetYear, 'YYYY').month(progressIdx).format('MMM');
        for(const type in progressResult) {
          if(!(month in progressResult[type])) {
            progressResult[type] = { ...progressResult[type], [month]: 0 };
          }
        }

        // Get responses for this month
        const monthResponses = responses.filter((r) => progressIdx >= moment.utc(r.createdAt).month());
        const progressByIssueType = {
          Governance: { totalQuestionScore: 0, totalResponseScore: 0 },
          Social: { totalQuestionScore: 0, totalResponseScore: 0 },
          Environmental: { totalQuestionScore: 0, totalResponseScore: 0 },
        };

        for (const goal of goals) {
          const protocolResponseInformations = protocolIssueGoalResponseInformations.filter(
            (info) => info.esgGoalId.toString() === goal._id.toString()
          );
          const responseInformationIds = protocolResponseInformations.map((info) =>
            info.esgAssessmentResponseInformationId.toString()
          );
          const goalResponses = monthResponses.filter((r) => {
            return (
              r.esgAssessmentId.toString() === goal.esgAssessment.toString() &&
              responseInformationIds.includes(r.esgAssessmentResponseInformationId.toString())
            );
          });
  
          const totalQuestionScore =
            assessmentScoresMap.get(goal.esgAssessment.toString()) * protocol.subOrganizations.length;
          const totalResponseScore = goalResponses
            .map((response) => response.responseScore || 0)
            .reduce((sum, val) => val + sum, 0);

          const type = goal.type;
          progressByIssueType[type].totalQuestionScore += totalQuestionScore;
          progressByIssueType[type].totalResponseScore += totalResponseScore;
        }
  
        for (const type in progressByIssueType) {
          const questionScore = progressByIssueType[type].totalQuestionScore;
          const responseScore = progressByIssueType[type].totalResponseScore;
          progressResult[type][month] = questionScore > 0 ? round((responseScore / questionScore) * 100, 2) : 0;
        }
      }
    }

    return {
      progress: progressResult,
    };
  } catch (error) {
    console.error('Error in getProtocolProgressForChart:', error);
    throw error;
  }
};

const width = 1200; // px
const height = 500; // px
const chartJSNodeCanvas = new ChartJSNodeCanvas({ width, height });

function formatDate(date) {
  if (!date) return '';
  const d = new Date(date);
  if (isNaN(d)) return '';
  return `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getDate()).padStart(2, '0')}`;
}

async function generateESGChart(data) {
  const configuration = {
    type: 'line',
    data: {
      labels: [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
      ],
      datasets: [
        {
          label: 'Environmental',
          data: data.environmental,
          borderColor: '#4CAF50',
          backgroundColor: '#4CAF50',
          fill: false,
          tension: 0.4,
          pointRadius: 7,
          pointBackgroundColor: '#fff',
          pointBorderColor: '#4CAF50',
          pointBorderWidth: 3,
        },
        {
          label: 'Social',
          data: data.social,
          borderColor: '#1976D2',
          backgroundColor: '#1976D2',
          fill: false,
          tension: 0.4,
          pointRadius: 7,
          pointBackgroundColor: '#fff',
          pointBorderColor: '#1976D2',
          pointBorderWidth: 3,
        },
        {
          label: 'Governance',
          data: data.governance,
          borderColor: '#FFB300',
          backgroundColor: '#FFB300',
          fill: false,
          tension: 0.4,
          pointRadius: 7,
          pointBackgroundColor: '#fff',
          pointBorderColor: '#FFB300',
          pointBorderWidth: 3,
        },
      ],
    },
    options: {
      responsive: false,
      plugins: {
        legend: {
          display: true,
          position: 'top',
          align: 'end',
          labels: {
            boxWidth: 20,
            font: { size: 18 }
          }
        },
        title: {
          display: true,
          text: 'ESG Progress',
          font: { size: 24 }
        },
        tooltip: {
          enabled: true,
          callbacks: {
            label: function(context) {
              return `${context.dataset.label}: ${context.parsed.y}%`;
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
          ticks: {
            callback: function(value) { return value + '%'; },
            font: { size: 16 }
          },
          title: {
            display: true,
            text: 'Progress (%)',
            font: { size: 18 }
          }
        },
        x: {
          ticks: { font: { size: 16 } }
        }
      }
    }
  };

  return await chartJSNodeCanvas.renderToBuffer(configuration);
}

async function generateProtocolReportPdfService(protocolId, user, queryParams = {}) {
  let browser;
  try {
    let protocol = await findProtocolById(protocolId, user, true);
    if (!protocol) {
      throw new Error('Protocol not found');
    }

    // Convert to plain object
    protocol = protocol.toObject();

    const { userType, includeFarmerAndSupplier } = queryParams;
    const protocolScore = await calculateProtocolESGProgress({
      protocolId,
      userType,
      includeFarmerAndSupplier
    });

    if (!protocolScore) {
      throw new Error('Protocol score not found');
    }

    const calculateCircleOffset = (radius, percentage) => {
      const circumference = 2 * Math.PI * radius;
      return circumference * (1 - (percentage / 100));
    };

    const circleOffsets = {
      Overall: calculateCircleOffset(70, protocolScore.Overall || 0),
      Environmental: calculateCircleOffset(50, protocolScore.Environmental || 0),
      Social: calculateCircleOffset(50, protocolScore.Social || 0),
      Governance: calculateCircleOffset(50, protocolScore.Governance || 0)
    };

    const circleDashArrays = {
      Overall: 2 * Math.PI * 70,
      Environmental: 2 * Math.PI * 50,
      Social: 2 * Math.PI * 50,
      Governance: 2 * Math.PI * 50
    };

    const year = parseInt(queryParams.year, 10) || new Date().getFullYear();
    const result = await getProtocolProgressForChart({
      protocolId,
      startTargetYear: year,
      endTargetYear: year + 1
    });

    const chartBuffer = await generateESGChart({
      environmental: (result.progress && result.progress.Environmental) || Array(12).fill(0),
      social: (result.progress && result.progress.Social) || Array(12).fill(0),
      governance: (result.progress && result.progress.Governance) || Array(12).fill(0),
    });

    const logoPath = path.join(__dirname, '../../assets/image/logo.svg');
    const logoBuffer = await fs.promises.readFile(logoPath);
    const logoBase64 = logoBuffer.toString('base64');

    let sealBase64 = '';
    if (protocol.esgStandard && protocol.esgStandard.sealUrl) {
      try {
        const sealResponse = await axios.get(protocol.esgStandard.sealUrl, { responseType: 'arraybuffer' });
        const sealMimeType = sealResponse.headers['content-type'] || 'image/png';
        sealBase64 = `data:${sealMimeType};base64,${Buffer.from(sealResponse.data, 'binary').toString('base64')}`;
      } catch (err) {
        console.error('Error fetching seal image:', err.message);
        sealBase64 = '';
      }
    }

    if(protocol.startDate) {
      protocol.startDate = formatDate(protocol.startDate);
    }

    if(protocol.deadlineDate) {
      protocol.deadlineDate = formatDate(protocol.deadlineDate);
    }

    protocol.totalEsgGoals = Array.isArray(protocol.esgIssues)
      ? protocol.esgIssues.reduce((sum, issue) => sum + (Array.isArray(issue.esgGoals) ? issue.esgGoals.length : 0), 0)
      : 0;

    protocol.formattedStartDate = protocol.startDate ? formatDate(protocol.startDate) : '';
    protocol.formattedDeadlineDate = protocol.deadlineDate ? formatDate(protocol.deadlineDate) : '';

    const allGoalIds = [];
    if (protocol.esgIssues && Array.isArray(protocol.esgIssues)) {
      for (const issue of protocol.esgIssues) {
        if (issue.esgGoals && Array.isArray(issue.esgGoals)) {
          for (const goal of issue.esgGoals) {
            allGoalIds.push(goal._id);
          }
        }
      }
    }

    const goalProgressList = await getAssessmentProgressByGoalIds({
      goalIds: allGoalIds,
      user,
      userType: 'sub-organization'
    });

    const goalProgressMap = {};
    goalProgressList.forEach(item => {
      goalProgressMap[item.goalId.toString()] = item.progress;
    });

    if (protocol.esgIssues && Array.isArray(protocol.esgIssues)) {
      for (const issue of protocol.esgIssues) {
        if (issue.esgGoals && Array.isArray(issue.esgGoals)) {
          for (const goal of issue.esgGoals) {
            goal.progress = goalProgressMap[goal._id.toString()] || 0;
          }
        }
      }
    }

    if (protocol.esgIssues && Array.isArray(protocol.esgIssues)) {
      for (const issue of protocol.esgIssues) {
        if (issue.esgGoals && Array.isArray(issue.esgGoals) && issue.esgGoals.length > 0) {
          const total = issue.esgGoals.reduce((sum, goal) => sum + (goal.progress || 0), 0);
          issue.progress = +(total / issue.esgGoals.length).toFixed(2);
        } else {
          issue.progress = 0;
        }
      }
    }

    const html = await ejs.renderFile(
      path.join(__dirname, '../../views/esg/protocol.html'),
      {
        protocol,
        chartImageBase64: chartBuffer.toString('base64'),
        logoBase64: logoBase64,
        sealBase64: sealBase64,
        protocolScore: protocolScore,
        circleOffsets,
        circleDashArrays,
        getScoreColorClass
      }
    );

    browser = await puppeteer.launch({
      headless: 'new',
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--disable-gpu'
      ],
      timeout: 30000
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 800, height: 1600 });
    await page.setContent(html, { 
      waitUntil: ['networkidle0', 'domcontentloaded'],
      timeout: 30000 
    });

    await page.waitForSelector('.chart-container img', { 
      visible: true,
      timeout: 30000 
    });

    await page.waitForFunction(() => {
      return document.readyState === 'complete';
    }, { timeout: 30000 });

    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { 
        top: '0mm',
        right: '0mm',
        bottom: '0mm',
        left: '0mm'
      },
      displayHeaderFooter: true,
      headerTemplate: '<div></div>',
      footerTemplate: `
        <div style="width: 100%; font-family: 'Inter', Arial, sans-serif; font-size: 12px; color: #333; display: flex; justify-content: space-between; align-items: center; padding: 0 30px;">
          <span style="font-weight: 500;">Dimitra.io</span>
          <span style="font-size: 12px;">Page <span class="pageNumber"></span> of <span class="totalPages"></span></span>
        </div>
      `,
      timeout: 30000
    });

    return pdfBuffer;

  } catch (error) {
    throw error;
  } finally {
    if (browser) {
      try {
        await browser.close();
      } catch (closeError) {
        console.error('Error closing browser:', closeError);
      }
    }
  }
}

function getScoreColorClass(score) {
    if (score >= 75) return 'score-success';
    if (score >= 50) return 'score-warning';
    return 'score-error';
}

module.exports = {
  createStandardOrProtocol,
  findProtocolById,
  updateProtocolDataById,
  updateProtocolSettings,
  deleteProtocolById,
  incrementIssuesCountOfEsgProtocol,
  recalculateProtocolDeadline,
  incrementGoalsCountOfEsgProtocol,
  getPaginatedProtocols,
  updateProtocolStatusById,
  assignSubOrganizationToEsgProtocol,
  removeSubOrganizationFromEsgProtocol,
  getProtocolSubOrganizations,
  getProtocolSubOrganizationsProgressTable,
  getProtocolGoalProgress,
  getProtocolProgressForChart,
  generateProtocolReportPdfService
};
