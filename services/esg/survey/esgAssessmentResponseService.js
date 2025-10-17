const mongoose = require("mongoose");
const esgAssessment = require(rootPath +
  "/mongoose-models/survey/assessments/esgAssessment.js");
const esgActionPlan = require(rootPath +
  "/mongoose-models/survey/questions/esgActionPlans.js");
const esgGetDataQuestion = require(rootPath +
  "/mongoose-models/survey/questions/esgGetDataQuestion.js");
const esgAssessmentQuestion = require(rootPath +
  "/mongoose-models/survey/assessments/esgAssessmentQuestion.js");
const esgAssessmentQuestionOption = require(rootPath +
  "/mongoose-models/survey/questions/esgAssessmentQuestionOptions.js");
const esgAssessmentQuestionHeading = require(rootPath +
  "/mongoose-models/survey/assessments/esgAssessmentQuestionHeading.js");

/**
 * Five models are top to bottom
 */
const { EsgProtocolResponseInformation } = require(rootPath +
  "/mongoose-models/survey/response/esgProtocolResponseInformation.js");
const { EsgProtocolIssueGoalResponseInformation } = require(rootPath +
  "/mongoose-models/survey/response/esgProtocolIssueGoalResponseInformation.js");
const { EsgAssessmentResponseInformation } = require(rootPath +
  "/mongoose-models/survey/response/esgAssessmentResponseInformation.js");
const { EsgAssessmentResponse } = require(rootPath +
  "/mongoose-models/survey/response/esgAssessmentResponse.js");
const {
  calculateQuestionScoreAndResponseScore,
  findAssessmentRespponseFromGoalAndAssessment,
  getTotalQuestionScoreFromAssessmentAndGoal,
  getSurveyQuestionDetailByQId,
} = require("./esgAssessmentScoreService.js");

const ObjectId = mongoose.Types.ObjectId;

const createOrGetProtocolIssueGoalResponseInformation = async (params) => {
  const {
    esgProtocolId,
    esgGoalId,
    esgIssueId,
    esgAssessmentId,
    submittedByType,
    submittedById,
  } = params;

  const existingRecord = await EsgProtocolIssueGoalResponseInformation.findOne({
    esgProtocolId,
    esgGoalId,
    esgIssueId,
    esgAssessmentId,
    submittedByType,
    submittedById,
  });

  if (existingRecord) {
    return existingRecord;
  }

  // Create new record if none exists
  const mainMappingInfo = new EsgProtocolIssueGoalResponseInformation({
    esgProtocolId,
    esgGoalId,
    esgIssueId,
    esgAssessmentId,
    submittedByType,
    submittedById,
  });
  await mainMappingInfo.save();
  return mainMappingInfo;
};

const createOrGetAssessmentResponseInformation = async (params) => {
  const {
    esgAssessmentId,
    submittedById,
    submittedByType,
    submittedBy,
    nextStep,
    status,
    orgId,
  } = params;
  //   const esgAssessmentResponseInformation = await EsgAssessmentResponseInformation.findOne({
  //     esgAssessmentId,
  //     orgId,
  //     submittedById,
  //     submittedByType,
  //   })

  //   if(esgAssessmentResponseInformation){
  //     return esgAssessmentResponseInformation;
  //   }
  const newEsgAssessmentResponseInformation =
    new EsgAssessmentResponseInformation({
      esgAssessmentId,
      submittedById,
      submittedByType,
      submittedBy,
      nextStep,
      status,
      orgId,
    });
  await newEsgAssessmentResponseInformation.save();
  return newEsgAssessmentResponseInformation;
};

const createOrGetEsgProtocolResponseInformation = async (params) => {
  const {
    esgAssessmentResponseInformationId,
    submittedById,
    submittedByType,
    esgProtocolId,
    orgId,
    submittedBy,
  } = params;

  const esgProtocolResponseInformation =
    await EsgProtocolResponseInformation.findOne({
      submittedById,
      submittedByType,
      esgProtocolId,
      orgId,
      submittedBy,
    });

  if (esgProtocolResponseInformation) {
    return esgProtocolResponseInformation;
  }

  const newEsgProtocolResponseInformation = new EsgProtocolResponseInformation({
    esgResponseInformationId: [esgAssessmentResponseInformationId],
    esgAssessmentResponseInformationId: [],
    submittedById,
    submittedByType,
    esgProtocolId,
    orgId,
    submittedBy,
  });
  await newEsgProtocolResponseInformation.save();
  return newEsgProtocolResponseInformation;
};

const createOrUpdateQuestionResponse = async (params) => {
  const {
    esgAssessmentId,
    esgQuestionId,
    esgAssessmentResponseInformationId,
    questionDetail,
    response,
    submittedBy,
    submittedByType,
    submittedById,
    questionScore,
    responseScore,
    orgId,
  } = params;

  const existingQuestionResponse = await EsgAssessmentResponse.findOne({
    esgAssessmentId,
    esgQuestionId,
    esgAssessmentResponseInformationId,
    submittedByType,
    submittedById,
  });

  if (existingQuestionResponse) {
    existingQuestionResponse.response = response;
    existingQuestionResponse.questionScore = questionScore;
    existingQuestionResponse.responseScore = responseScore;
    existingQuestionResponse.rejectionReason = null;
    existingQuestionResponse.rejectedByUserId = null;
    await existingQuestionResponse.save();
    return existingQuestionResponse;
  } else {
    const newQuestionResponse = new EsgAssessmentResponse({
      esgAssessmentId,
      esgQuestionId,
      esgAssessmentResponseInformationId,
      esgQuestionDetail: questionDetail,
      response,
      questionScore,
      responseScore,
      submittedBy,
      submittedByType,
      submittedById,
      orgId,
    });
    await newQuestionResponse.save();
    return newQuestionResponse;
  }
};

const saveSurveyResponse = async (body) => {
  const {
    esgAssessmentId,
    esgQuestionId,
    esgGoalId,
    esgIssueId,
    esgProtocolId,
    submittedById = null,
    submittedBy,
    submittedByType = "user",
    nextStep,
    response,
    orgId,
  } = body;

  /**
   * Step 1: find assessmentID and goalID is there in main mapping table
   * if yes then find assessmentInformationId
   * if not then create mapping table info and find
   */

  const questionDetail = await getSurveyQuestionDetailByQId(esgQuestionId);
  let esgAssessmentResponseInformationId = null;

  const { questionScore, responseScore } =
    await calculateQuestionScoreAndResponseScore({
      questionDetail,
      response,
      esgGoalId,
      submittedById,
      submittedBy,
    });

  const mainMappingInfo = await createOrGetProtocolIssueGoalResponseInformation(
    {
      esgGoalId,
      esgIssueId,
      esgProtocolId,
      esgAssessmentId,
      submittedByType,
      submittedById,
    }
  );

  if (!mainMappingInfo.esgAssessmentResponseInformationId) {
    const assessmentResponseInfo =
      await createOrGetAssessmentResponseInformation({
        esgAssessmentId,
        submittedById,
        submittedByType,
        submittedBy,
        nextStep,
        status: "submitted",
        orgId,
      });
    esgAssessmentResponseInformationId = assessmentResponseInfo._id;
    mainMappingInfo.esgAssessmentResponseInformationId =
      assessmentResponseInfo._id;
    await mainMappingInfo.save();
  } else {
    esgAssessmentResponseInformationId =
      mainMappingInfo.esgAssessmentResponseInformationId;
  }

  /**
   * Find and create esg protocol response information
   * with esgassessment response information id
   */
  const esgProtocolResponseInformation =
    await createOrGetEsgProtocolResponseInformation({
      esgAssessmentResponseInformationId,
      esgProtocolId,
      submittedById,
      submittedByType,
      submittedBy,
      orgId,
    });
  if (
    !esgProtocolResponseInformation?.esgAssessmentResponseInformationId?.includes(
      esgAssessmentResponseInformationId
    )
  ) {
    esgProtocolResponseInformation?.esgAssessmentResponseInformationId?.push(
      esgAssessmentResponseInformationId
    );
    await esgProtocolResponseInformation.save();
  }
  if (!mainMappingInfo?.esgProtocolResponseInformationId) {
    mainMappingInfo.esgProtocolResponseInformationId =
      esgProtocolResponseInformation._id;
    await mainMappingInfo.save();
  }
  /**
   * Save Question Response
   */
  const questionResponse = await createOrUpdateQuestionResponse({
    esgAssessmentId,
    esgQuestionId,
    esgAssessmentResponseInformationId,
    questionDetail,
    response,
    submittedBy,
    submittedByType,
    submittedById,
    questionScore,
    responseScore,
    orgId,
    rejectionReason: null,
    rejectedByUserId: null,
  });

  return questionResponse;
};

const getScoreFromAssessmentAndGoal = async (params) => {
  const { esgAssessmentId, esgGoalId } = params;

  const totalQuestionScore = await getTotalQuestionScoreFromAssessmentAndGoal(
    esgAssessmentId,
    esgGoalId
  );
  return totalQuestionScore;
};

/**
 *
 * Get assessment question information and response information
 *
 */

const getAssessmentQuestionHeadings = async (assessmentId) => {
  const assessmentQuestionHeadings =
    await esgAssessmentQuestionHeading.aggregate([
      {
        $match: {
          esgAssessmentId: assessmentId,
          deletedAt: null,
        },
      },
    ]);
  return assessmentQuestionHeadings;
};

const getAssessmentQuestionsByHeadingId = async ({
  headingId,
  assessmentId = null,
  goalId = null,
  userId = null,
  userType = "sub-organization",
  orgId = null,
}) => {
  const assessmentQuestions = await esgAssessmentQuestion.aggregate([
    {
      $match: {
        esgHeadingId: headingId,
        deletedAt: null,
      },
    },
    {
      $lookup: {
        from: "esggetdataquestions",
        let: { questionId: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ["$esgAssessmentQuestionId", "$$questionId"] },
                  { $eq: ["$esgAssessmentQuestionOptionId", null] },
                ],
              },
            },
          },
        ],
        as: "getDataQuestions",
      },
    },
  ]);
  for (let [index, ast] of assessmentQuestions?.entries()) {
    const isCheckbox = ast.questionType == "check-boxes" ? true : false;
    const isRadio = ast.questionType == "radio-button" ? true : false;
    if (userId && goalId && assessmentId) {
      const response = await findAssessmentRespponseFromGoalAndAssessment({
        goalId,
        assessmentId,
        questionId: ast._id,
        submittedByType: userType,
        submittedById: userId,
      });
      assessmentQuestions[index]["response"] = response || null;
    }
    if (isCheckbox || isRadio) {
      const options = await esgAssessmentQuestionOption.aggregate([
        {
          $match: {
            esgAssessmentQuestionId: ast._id,
            deletedAt: null,
          },
        },
        {
          $lookup: {
            from: "esggetdataquestions",
            localField: "_id",
            foreignField: "esgAssessmentQuestionOptionId",
            as: "getDataQuestions",
          },
        },
        {
          $lookup: {
            from: "esgactionplans",
            localField: "_id",
            foreignField: "esgAssessmentQuestionOptionId",
            as: "actionPlans",
          },
        },
      ]);
      assessmentQuestions[index]["options"] = options;
    } else {
      assessmentQuestions[index]["options"] = [];
    }
  }
  return assessmentQuestions;
};

const getAssessmentQuestionsWithHeadingsAndResponse = async ({
  assessmentId,
  goalId,
  user,
  userType = "sub-organization",
  orgId = null,
}) => {
  const assessmentQuestionHeadings = await getAssessmentQuestionHeadings(
    assessmentId
  );
  for (let [index, heading] of assessmentQuestionHeadings?.entries()) {
    const assessmentQuestions = await getAssessmentQuestionsByHeadingId({
      headingId: heading._id,
      assessmentId,
      goalId,
      userId: user?.mongoId,
      userType,
      orgId,
    });
    assessmentQuestionHeadings[index]["assessmentQuestions"] =
      assessmentQuestions;
  }
  return assessmentQuestionHeadings;
};

/**
 * Get protocol responses with filters and complete assessment question data
 * @param {Object} params - Filter parameters
 * @param {String} params.protocolId - Protocol ID
 * @param {String} params.type - Issue type filter
 * @param {String} params.searchTerm - Search term for issue/goal titles
 * @param {Number} params.page - Page number for pagination
 * @param {Number} params.limit - Number of results per page
 * @param {String} params.userType - Type of user submitting responses
 * @returns {Object} Filtered responses with complete assessment data
 */

const getProtocolResponsesWithFilters = async ({
  protocolId,
  type,
  searchTerm = "",
  page = 1,
  limit = 10,
  userType = "sub-organization",
  submittedById,
}) => {
  const skip = (page - 1) * limit;

  // Validate IDs
  if (!ObjectId.isValid(protocolId)) {
    throw new Error("Invalid protocolId");
  }
  const objectIdProtocolId = new ObjectId(protocolId);
  if (submittedById && !ObjectId.isValid(submittedById)) {
    throw new Error("Invalid submittedById");
  }
  const objectIdSubmittedById = submittedById
    ? new ObjectId(submittedById)
    : null;

  // Build filter conditions
  const typeRegex = type ? new RegExp(`^\\s*${type}\\s*$`, "i") : /.*/;
  const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regexTerm = escapeRegex(searchTerm);
  const searchMatchCondition = searchTerm
    ? {
        $or: [
          { "issue.title": { $regex: regexTerm, $options: "i" } },
          { "goal.title": { $regex: regexTerm, $options: "i" } },
        ],
      }
    : {};
  const typeMatchCondition = type ? { "issue.type": typeRegex } : {};
  const combinedMatchCondition = {
    ...typeMatchCondition,
    ...searchMatchCondition,
  };

  const pipeline = [
    // Match documents
    {
      $match: {
        esgProtocolId: objectIdProtocolId,
        ...(objectIdSubmittedById && { submittedById: objectIdSubmittedById }),
        submittedByType: userType,
      },
    },

    // Lookups for issue, goal, assessment, heading, question
    {
      $lookup: {
        from: "esgIssues",
        localField: "esgIssueId",
        foreignField: "_id",
        as: "issue",
        pipeline: [{ $project: { title: 1, type: 1 } }],
      },
    },
    { $unwind: { path: "$issue", preserveNullAndEmptyArrays: true } },
    {
      $lookup: {
        from: "esgGoals",
        localField: "esgGoalId",
        foreignField: "_id",
        as: "goal",
        pipeline: [{ $project: { title: 1 } }],
      },
    },
    { $unwind: { path: "$goal", preserveNullAndEmptyArrays: true } },
    { $match: combinedMatchCondition },
    {
      $lookup: {
        from: "esgassessments",
        localField: "esgAssessmentId",
        foreignField: "_id",
        as: "assessment",
        pipeline: [{ $project: { title: 1, description: 1 } }],
      },
    },
    { $unwind: { path: "$assessment", preserveNullAndEmptyArrays: true } },
    {
      $lookup: {
        from: "esgassessmentquestionheadings",
        let: { assessmentId: "$esgAssessmentId" },
        pipeline: [
          {
            $match: { $expr: { $eq: ["$esgAssessmentId", "$$assessmentId"] } },
          },
          { $project: { title: 1, targetYear: 1, order: 1 } },
        ],
        as: "heading",
      },
    },
    { $unwind: { path: "$heading", preserveNullAndEmptyArrays: true } },
    {
      $lookup: {
        from: "esgassessmentquestions",
        let: { headingId: "$heading._id" },
        pipeline: [
          { $match: { $expr: { $eq: ["$esgHeadingId", "$$headingId"] } } },
          { $project: { title: 1, questionType: 1, order: 1, score: 1 } },
        ],
        as: "question",
      },
    },
    { $unwind: { path: "$question", preserveNullAndEmptyArrays: true } },

    // Lookup responses with rejection fields and _id
    {
      $lookup: {
        from: "esgassessmentresponses",
        let: {
          responseInfoId: "$esgAssessmentResponseInformationId",
          questionId: "$question._id",
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  {
                    $eq: [
                      "$esgAssessmentResponseInformationId",
                      "$$responseInfoId",
                    ],
                  },
                  { $eq: ["$esgQuestionId", "$$questionId"] },
                  { $eq: ["$rejectionReason", null] },
                ],
              },
            },
          },
          {
            $project: {
              _id: 1,
              response: 1,
              rejectionReason: 1,
              rejectedByUserId: 1,
            },
          },
        ],
        as: "response",
      },
    },
    { $unwind: { path: "$response", preserveNullAndEmptyArrays: true } },

    // Transform response into a flat array of response items with rejection fields and responseId
    {
      $project: {
        issue: { id: "$issue._id", title: "$issue.title", type: "$issue.type" },
        goal: { id: "$goal._id", title: "$goal.title" },
        assessment: {
          id: "$assessment._id",
          title: "$assessment.title",
          description: "$assessment.description",
        },
        heading: {
          id: "$heading._id",
          title: "$heading.title",
          targetYear: "$heading.targetYear",
          order: "$heading.order",
        },
        question: {
          id: "$question._id",
          title: "$question.title",
          questionType: "$question.questionType",
          order: "$question.order",
          score: "$question.score",
        },
        responseItems: {
          $switch: {
            branches: [
              // Simple question types
              {
                case: {
                  $in: [
                    "$question.questionType",
                    [
                      "text-field",
                      "text-area",
                      "numeric",
                      "attach-files",
                      "digital-signature",
                    ],
                  ],
                },
                then: [
                  {
                    type: "main",
                    value: "$response.response.value",
                    responseId: "$response._id",
                    rejectionReason: "$response.rejectionReason",
                    rejectedByUserId: "$response.rejectedByUserId",
                  },
                ],
              },
              // Radio-button questions
              {
                case: { $eq: ["$question.questionType", "radio-button"] },
                then: {
                  $concatArrays: [
                    [
                      {
                        type: "main",
                        value: "$response.response.value",
                        responseId: "$response._id",
                        rejectionReason: "$response.rejectionReason",
                        rejectedByUserId: "$response.rejectedByUserId",
                      },
                    ],
                    {
                      $cond: {
                        if: { $isArray: "$response.response.getDataResponses" },
                        then: {
                          $map: {
                            input: "$response.response.getDataResponses",
                            as: "gd",
                            in: {
                              type: "getData",
                              title: "$$gd.title",
                              value: "$$gd.value",
                              responseId: "$response._id",
                              rejectionReason: "$response.rejectionReason",
                              rejectedByUserId: "$response.rejectedByUserId",
                            },
                          },
                        },
                        else: [],
                      },
                    },
                    {
                      $cond: {
                        if: {
                          $isArray: "$response.response.actionPlanResponses",
                        },
                        then: {
                          $map: {
                            input: "$response.response.actionPlanResponses",
                            as: "ap",
                            in: {
                              type: "actionPlan",
                              title: "$$ap.title",
                              files: "$$ap.files",
                              responseId: "$response._id",
                              rejectionReason: "$response.rejectionReason",
                              rejectedByUserId: "$response.rejectedByUserId",
                            },
                          },
                        },
                        else: [],
                      },
                    },
                  ],
                },
              },
              // Check-boxes questions
              {
                case: { $eq: ["$question.questionType", "check-boxes"] },
                then: {
                  $reduce: {
                    input: { $ifNull: ["$response.response", []] },
                    initialValue: [],
                    in: {
                      $concatArrays: [
                        "$$value",
                        [
                          {
                            type: "main",
                            value: "$$this.value",
                            responseId: "$response._id",
                            rejectionReason: "$response.rejectionReason",
                            rejectedByUserId: "$response.rejectedByUserId",
                          },
                        ],
                        {
                          $cond: {
                            if: { $isArray: "$$this.getDataResponses" },
                            then: {
                              $map: {
                                input: "$$this.getDataResponses",
                                as: "gd",
                                in: {
                                  type: "getData",
                                  title: "$$gd.title",
                                  value: "$$gd.value",
                                  responseId: "$response._id",
                                  rejectionReason: "$response.rejectionReason",
                                  rejectedByUserId:
                                    "$response.rejectedByUserId",
                                },
                              },
                            },
                            else: [],
                          },
                        },
                        {
                          $cond: {
                            if: { $isArray: "$$this.actionPlanResponses" },
                            then: {
                              $map: {
                                input: "$$this.actionPlanResponses",
                                as: "ap",
                                in: {
                                  type: "actionPlan",
                                  title: "$$ap.title",
                                  files: "$$ap.files",
                                  responseId: "$response._id",
                                  rejectionReason: "$response.rejectionReason",
                                  rejectedByUserId:
                                    "$response.rejectedByUserId",
                                },
                              },
                            },
                            else: [],
                          },
                        },
                      ],
                    },
                  },
                },
              },
              // Get-data questions
              {
                case: { $eq: ["$question.questionType", "get-data"] },
                then: {
                  $cond: {
                    if: { $isArray: "$response.response" },
                    then: {
                      $map: {
                        input: "$response.response",
                        as: "gd",
                        in: {
                          type: "getData",
                          title: "$$gd.title",
                          value: "$$gd.value",
                          responseId: "$response._id",
                          rejectionReason: "$response.rejectionReason",
                          rejectedByUserId: "$response.rejectedByUserId",
                        },
                      },
                    },
                    else: [],
                  },
                },
              },
            ],
            default: [],
          },
        },
      },
    },

    // Unwind responseItems to flatten the structure
    {
      $unwind: {
        path: "$responseItems",
        preserveNullAndEmptyArrays: true,
      },
    },
    // Filter out empty response items
    {
      $match: {
        $or: [
          {
            "responseItems.type": "main",
            "responseItems.value": { $exists: true, $ne: null, $ne: "" },
          },
          {
            "responseItems.type": "getData",
            "responseItems.value": { $exists: true, $ne: null, $ne: "" },
          },
          {
            "responseItems.type": "actionPlan",
            "responseItems.files": { $exists: true, $type: "array", $ne: [] },
          },
        ],
      },
    },
    // Add index based on heading.order and question.order
    {
      $addFields: {
        index: {
          $concat: [
            { $toString: "$heading.order" },
            ".",
            { $toString: "$question.order" },
          ],
        },
      },
    },
    // Final projection with rejection fields and responseId
    {
      $project: {
        index: 1,
        type: "$responseItems.type",
        issue: 1,
        goal: 1,
        assessment: 1,
        heading: 1,
        question: 1,
        response: {
          $switch: {
            branches: [
              {
                case: { $eq: ["$responseItems.type", "main"] },
                then: { value: "$responseItems.value" },
              },
              {
                case: { $eq: ["$responseItems.type", "getData"] },
                then: {
                  title: "$responseItems.title",
                  value: "$responseItems.value",
                },
              },
              {
                case: { $eq: ["$responseItems.type", "actionPlan"] },
                then: {
                  title: "$responseItems.title",
                  files: "$responseItems.files",
                },
              },
            ],
            default: {},
          },
        },
        responseId: "$responseItems.responseId",
        rejectionReason: "$responseItems.rejectionReason",
        rejectedByUserId: "$responseItems.rejectedByUserId",
      },
    },
    // Pagination over the flattened list
    {
      $facet: {
        metadata: [{ $count: "total" }],
        data: [{ $skip: skip }, { $limit: limit }],
      },
    },
  ];

  try {
    const result = await mongoose
      .model("EsgProtocolIssueGoalResponseInformation")
      .aggregate(pipeline)
      .exec();
    const facetResult = result[0];
    const total =
      facetResult.metadata.length > 0 ? facetResult.metadata[0].total : 0;
    const flatData = facetResult.data;

    return {
      success: true,
      code: 200,
      message: "Assessment response data with question details",
      data: {
        total,
        page,
        limit,
        info: flatData,
      },
    };
  } catch (error) {
    console.error(`ERROR in getProtocolResponsesWithFilters: ${error.message}`);
    console.error(error.stack);
    throw error;
  }
};
saveResponseRejection = async (params) => {
  const { esgAssessmentResponseId, rejectionReason, rejectedByUserId } = params;

  const esgAssessmentResponse = await EsgAssessmentResponse.findOne({
    _id: esgAssessmentResponseId,
  });
  
  if (!esgAssessmentResponse) {
    throw new Error("Esg Assessment Response not found");
  }
  esgAssessmentResponse.rejectionReason = rejectionReason;
  esgAssessmentResponse.rejectedByUserId = rejectedByUserId;
  await esgAssessmentResponse.save();
  return esgAssessmentResponse;
};

module.exports = {
  saveSurveyResponse,
  getScoreFromAssessmentAndGoal,
  getAssessmentQuestionsWithHeadingsAndResponse,
  getProtocolResponsesWithFilters,
  saveResponseRejection,
};

/**
 *  A.  Response Structure  Define()
 * 
 * 1. Text Field 
 * 2. Text area field
 * 4. Checkbox field
 * 5. Radio button field
 * 6. Date field
 * 7. Number field
 * 8. Get Data field
 * 
 * B. Sample Response Data Preparations 
 * 
 * C. Calculate Score From Question ID
 * D. Calcuate scroe For Assessment Information ID (Total)
 * E. Calculate Score For Sub Organization
 * F. Calculate Score For Organization
 * 
 
 */
