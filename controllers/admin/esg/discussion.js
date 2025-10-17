const discussionService = require('../../../services/esg/discussion');
const { errorRespSync, successRespSync, serverError } = require('../../../helpers/api');
const { logErrorOccurred } = require('../../../helpers/general');
const { error, success } = require('../../../helpers/language');
exports.create = async (req, res) => {
  try {
    const discussion = await discussionService.createDiscussion(req.body, req.user);
    
    res.json({
      success: true,
      message: success.SAVED,
      data: discussion
    });
  } catch (err) {
    return res.json(
      errorRespSync({
        code: 500,
        msg: err.SERVER_ERROR,
        error: err.message
      })
    );
  }
};

exports.list = async (req, res) => {
  try {
    const { protocolId } = req.params;
    const { page, limit } = req.query;
    
    const result = await discussionService.listDiscussions(
      protocolId,
      req.user.mongoOrganizationId,
      page,
      limit
    );

    res.json({
      success: true,
      data: result
    });
  } catch (err) {
    return res.json(
      errorRespSync({
        code: 500,
        msg: err.SERVER_ERROR,
        error: err.message
      })
    );
  }
};

exports.getAttachments = async (req, res) => {
  try {
    const { protocolId } = req.params;
    const { page, limit } = req.query;
    
    const result = await discussionService.getAttachments(protocolId, page, limit);

    res.json({
      success: true,
      data: result
    });
  } catch (err) {
    return res.json(
      errorRespSync({
        code: 500,
        msg: err.SERVER_ERROR,
        error: err.message
      })
    );
  }
};

exports.assignUser = async (req, res) => {
  try {
    const { discussionId } = req.params;
    const { assignedUserId } = req.body;

    const updatedDiscussion = await discussionService.assignUser(
      discussionId,
      assignedUserId,
      req.user.mongoOrganizationId
    );

    return res.json({
      success: true,
      message: success.SAVED,
      data: [{
        ...updatedDiscussion,
        user: updatedDiscussion.createdByUser,
        assignedUser: updatedDiscussion.assignedToUser,
        comment: updatedDiscussion.content
      }]
    });
  } catch (err) {
    return res.json(
      errorRespSync({
        code: 500,
        msg: err.SERVER_ERROR,
        error: err.message
      })
    );
  }
};

exports.getAvailableUsers = async (req, res) => {
  console.log("testing",req.user);

  try {
    const result = await discussionService.getAvailableUsers(req.user.mongoOrganizationId);

    return res.json({
      msg: success.LIST,
      success: true,
      data: result
    });
  } catch (err) {
    console.log("error",err);
    return res.json(
      errorRespSync({
        code: 500,
        msg: err.SERVER_ERROR,
        error: err.message
      })
    );
  }
};