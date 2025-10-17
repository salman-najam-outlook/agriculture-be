const { EsgProtocol } = require('../../mongoose-models/EsgProtocol');
const { EsgIssue } = require('../../mongoose-models/EsgIssue');
const { incrementIssuesCountOfEsgProtocol } = require('./esg-protocol');
const { EsgGoal } = require('../../mongoose-models/EsgGoal');

const findEsgIssueById = async (issueId, user, populateRelation = false) => {
  const issue = await EsgIssue.findOne({
    _id: issueId,
  }).exec();
  if (!issue) return null;
  if (populateRelation) {
    await issue.populate('esgGoals');
  }
  if (!user.isSuperAdmin && issue.cfOrganizationId != user.organization) {
    await issue.populate('esgProtocol');
    if (issue.esgProtocol.type === 'Protocol') return null;
  }

  return issue;
};

const createEsgIssue = async (data, user) => {
  const protocol = await EsgProtocol.findOne({
    _id: data.protocolId,
  })
    .select({ noOfIssues: 1, cfOrganizationId: 1, organization: 1 })
    .exec();
  if (!protocol) return null;

  const defaultOrder = (protocol.noOfIssues || 0) + 1;
  const { type, title, protocolId, order = defaultOrder } = data;

  const issueData = {
    type,
    title,
    order,
    createdByUser: user.mongoId,
    createdByCfUserId: user.id,
    esgProtocol: protocolId,
    organization: protocol.organization,
    cfOrganizationId: protocol.cfOrganizationId,
    _clientMetadata: user.clientMetadata,
  };

  const issue = await EsgIssue.create(issueData);
  await incrementIssuesCountOfEsgProtocol(protocolId);

  return issue;
};

const reorderEsgIssues = async (issueOrders, user) => {
  const issueIds = issueOrders.map((item) => item._id);

  const findOptions = {
    _id: { $in: issueIds },
  };
  if (!user.isSuperAdmin) findOptions.cfOrganizationId = user.organization;
  const issues = await EsgIssue.find(findOptions);
  if (!issues.length) return null;

  await Promise.all(
    issues.map(async (issue) => {
      const order = issueOrders.find((item) => item._id === issue._id.toString()).order;
      issue.order = order;
      issue.lastModifiedByUser = user.mongoId;
      issue._clientMetadata = user.clientMetadata;
      return issue.save();
    })
  );

  return issues;
};

const updateEsgIssue = async (issueId, data, user) => {
  const issue = await findEsgIssueById(issueId, user);
  if (!issue) return null;

  const { title, order } = data;

  issue.title = title;
  issue.lastModifiedByUser = user.mongoId;
  issue._clientMetadata = user.clientMetadata;
  issue.order = order ?? issue.order;
  await issue.save();
  return issue;
};

const deleteEsgIssueById = async (issueId, user) => {
  const issue = await findEsgIssueById(issueId, user);
  if (!issue) return null;
  issue.lastModifiedByUser = user.mongoId;
  issue._clientMetadata = user.clientMetadata;
  await Promise.all([
    issue.delete(),
    EsgGoal.delete({
      esgIssue: issueId,
    }),
    incrementIssuesCountOfEsgProtocol(issue.esgProtocol, -1),
  ]);
  return issue;
};

const incrementGoalsCountOfEsgIssue = async (issueId, incrementBy = 1) => {
  return EsgIssue.updateOne(
    { _id: issueId },
    {
      $inc: { noOfGoals: incrementBy },
    }
  );
};

module.exports = {
  findEsgIssueById,
  createEsgIssue,
  reorderEsgIssues,
  updateEsgIssue,
  deleteEsgIssueById,
  incrementGoalsCountOfEsgIssue,
};
