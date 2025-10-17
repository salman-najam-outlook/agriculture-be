const { EsgGoal } = require('../../mongoose-models/EsgGoal');
const { EsgIssue } = require('../../mongoose-models/EsgIssue');
const esgAssessment = require('../../mongoose-models/survey/assessments/esgAssessment');
const { incrementGoalsCountOfEsgIssue } = require('./esg-issue');
const { recalculateProtocolDeadline, incrementGoalsCountOfEsgProtocol } = require('./esg-protocol');

const findEsgGoalById = async (goalId, user) => {
  const goal = await EsgGoal.findOne({
    _id: goalId,
  }).exec();
  if (!goal) return null;
  if (!user.isSuperAdmin && goal.cfOrganizationId != user.organization) {
    await goal.populate('esgProtocol');
    if (goal.esgProtocol.type === 'Protocol') return null;
  }
  return goal;
};

const createEsgGoal = async (data, user) => {
  const issue = await EsgIssue.findOne({
    _id: data.issueId,
  })
    .select({
      noOfGoals: 1,
      esgProtocol: 1,
      type: 1,
      organization: 1,
      cfOrganizationId: 1,
    })
    .exec();
  if (!issue) return null;
  const defaultOrder = (issue.noOfGoals || 0) + 1;
  const { targetYears, title, order = defaultOrder, esgAssessmentId } = data;
  const assessment = await esgAssessment.findOne({ _id: esgAssessmentId }).select('noOfQuestions').exec();

  const goalData = {
    type: issue.type,
    title,
    order,
    targetYears,
    esgProtocol: issue.esgProtocol,
    esgIssue: issue._id,
    createdByUser: user.mongoId,
    createdByCfUserId: user.id,
    organization: issue.organization,
    cfOrganizationId: issue.cfOrganizationId,
    esgAssessment: esgAssessmentId,
    noOfQuestions: assessment?.noOfQuestions ?? 0,
    _clientMetadata: user.clientMetadata,
  };

  const goal = await EsgGoal.create(goalData);

  await Promise.all([
    recalculateProtocolDeadline(issue.esgProtocol),
    incrementGoalsCountOfEsgIssue(issue._id),
    incrementGoalsCountOfEsgProtocol(issue.esgProtocol),
  ]);

  return goal;
};

const reorderEsgGoals = async (goalOrders, user) => {
  const goalIds = goalOrders.map((item) => item._id);

  const findOptions = {
    _id: { $in: goalIds },
  };
  if (!user.isSuperAdmin) {
    findOptions.cfOrganizationId = user.organization;
  }
  const goals = await EsgGoal.find(findOptions).exec();
  if (!goals.length) return null;

  await Promise.all(
    goals.map(async (goal) => {
      const order = goalOrders.find((item) => item._id === goal._id.toString()).order;
      goal.lastModifiedByUser = user.mongoId;
      goal._clientMetadata = user.clientMetadata;
      goal.order = order;
      return goal.save();
    })
  );

  return goals;
};

const updateEsgGoal = async (goalId, data, user) => {
  const goal = await findEsgGoalById(goalId, user);
  if (!goal) return null;

  const { title, order, targetYears, esgAssessmentId } = data;
  goal.title = title;
  goal.order = order ?? goal.order;
  goal.targetYears = targetYears;
  goal.esgAssessment = esgAssessmentId;
  const assessment = await esgAssessment.findOne({ _id: esgAssessmentId }).select('noOfQuestions').exec();
  goal.noOfQuestions = assessment?.noOfQuestions ?? 0;
  goal.lastModifiedByUser = user.mongoId;
  goal._clientMetadata = user.clientMetadata;
  await goal.save();
  await recalculateProtocolDeadline(goal.esgProtocol);
  return goal;
};

const deleteEsgGoalById = async (goalId, user) => {
  const goal = await findEsgGoalById(goalId, user);
  if (!goal) return null;
  goal.lastModifiedByUser = user.mongoId;
  goal._clientMetadata = user.clientMetadata;
  await goal.delete();
  await Promise.all([
    recalculateProtocolDeadline(goal.esgProtocol),
    incrementGoalsCountOfEsgProtocol(goal.esgProtocol, -1),
  ]);
  return goal;
};

const updateGoalStatusByIds = async (goalIds, isActive, user) => {
  const findOptions = {
    _id: { $in: goalIds },
  };
  if (!user.isSuperAdmin) {
    findOptions.cfOrganizationId = user.organization;
  }

  const result = await EsgGoal.updateMany(findOptions, {
    isActive,
    lastModifiedByUser: user.mongoId,
    _clientMetadata: user.clientMetadata,
  });
  if (!result.matchedCount) return null;
  const goals = await EsgGoal.find(findOptions).exec();

  await Promise.all(goals.map((goal) => recalculateProtocolDeadline(goal.esgProtocol)));
  return goals;
};

module.exports = {
  findEsgGoalById,
  createEsgGoal,
  reorderEsgGoals,
  updateEsgGoal,
  deleteEsgGoalById,
  updateGoalStatusByIds,
};
