const { errorRespSync, successRespSync, serverError } = require('../../../helpers/api');
const { logErrorOccurred } = require('../../../helpers/general');
const { error, success } = require('../../../helpers/language');
const {
  createStandardOrProtocol,
  updateProtocolDataById,
  updateProtocolSettings,
  updateProtocolStatusById,
  deleteProtocolById,
  findProtocolById,
  assignSubOrganizationToEsgProtocol,
  removeSubOrganizationFromEsgProtocol,
  getProtocolSubOrganizations,
  getPaginatedProtocols,
  getProtocolSubOrganizationsProgressTable,
  getProtocolGoalProgress,
  getProtocolProgressForChart,
  generateProtocolReportPdfService,
} = require('../../../services/esg/esg-protocol');
const { calculateProtocolESGProgress } = require('../../../services/esg/survey/esgAssessmentScoreService');
const { getProtocolResponsesWithFilters } = require('../../../services/esg/survey/esgAssessmentResponseService');
exports.createEsgProtocolRouteHandler = async (req, res) => {
  try {
    const user = req.user;
    const protocol = await createStandardOrProtocol(req.body, user);
    if (!protocol) {
      return res.json(
        errorRespSync({
          code: 400,
          msg: error.BAD_REQUEST,
        })
      );
    }

    return res.json(
      successRespSync({
        msg: success.SAVED,
        data: protocol,
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
};

exports.updateEsgProtocolRouteHandler = async (req, res) => {
  try {
    const id = req.params.esgProtocolId;
    const user = req.user;

    const protocol = await updateProtocolDataById(id, req.body, user);
    if (!protocol) {
      return res.json(
        errorRespSync({
          code: 404,
          msg: error.NOT_FOUND,
        })
      );
    }

    return res.json(
      successRespSync({
        msg: success.SAVED,
        data: protocol,
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
};

exports.updateEsgProtocolSettingRouteHandler = async (req, res) => {
  try {
    const id = req.params.esgProtocolId;
    const user = req.user;

    const protocol = await updateProtocolSettings(id, req.body, user);

    if (!protocol) {
      return res.json(
        errorRespSync({
          code: 404,
          msg: error.NOT_FOUND,
        })
      );
    }

    return res.json(
      successRespSync({
        msg: success.SAVED,
        data: protocol,
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
};

exports.updateEsgProtocolStatusRouteHandler = async (req, res) => {
  try {
    const user = req.user;
    const updatedProtocol = await updateProtocolStatusById(req.params.esgProtocolId, req.body.isActive, user);
    if (!updatedProtocol) {
      return res.json(
        errorRespSync({
          code: 404,
          msg: error.NOT_FOUND,
        })
      );
    }

    return res.json(
      successRespSync({
        msg: success.SAVED,
        data: updatedProtocol,
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    serverError(res, err);
  }
};

exports.deleteEsgProtocolRouteHandler = async (req, res) => {
  try {
    const user = req.user;
    const esgProtocolId = req.params.esgProtocolId;
    const protocol = await deleteProtocolById(esgProtocolId, user);
    if (!protocol) {
      return res.json(
        errorRespSync({
          code: 404,
          msg: error.NOT_FOUND,
        })
      );
    }

    return res.json(
      successRespSync({
        msg: success.DELETED,
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
};

exports.getEsgProtocolRouteHandler = async (req, res, next) => {
  try {
    const user = req.user;
    const esgProtocolId = req.params.esgProtocolId;
    const protocol = await findProtocolById(esgProtocolId, user, true);
    if (!protocol) {
      return res.json(
        errorRespSync({
          code: 404,
          msg: error.NOT_FOUND,
        })
      );
    }

    res.locals.data = typeof protocol.toObject === 'function' ? protocol.toObject() : protocol;
    next();
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
};

exports.listEsgProtocolsRouteHandler = async (req, res, next) => {
  try {
    const user = req.user;
    const type = req.query.type || 'Standard';
    const result = await getPaginatedProtocols(type, user, req.query);
    
    // Convert result to plain object, ensuring rows array items are also plain objects
    res.locals.data = typeof result.toObject === 'function' ? result.toObject() : result;
    
    // Convert each Mongoose document in rows array to plain object
    if (res.locals.data.rows && Array.isArray(res.locals.data.rows)) {
      res.locals.data.rows = res.locals.data.rows.map(item => 
        typeof item.toObject === 'function' ? item.toObject() : item
      );
    }
    next();
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
};

exports.assignSubOrganizationToEsgProtocolRouteHandler = async (req, res) => {
  const { subOrganizations } = req.body;
  const protocolId = req.params.esgProtocolId;
  const protocol = await assignSubOrganizationToEsgProtocol(protocolId, subOrganizations, req.user);
  if (!protocol) {
    return res.json(
      errorRespSync({
        code: 404,
        msg: error.NOT_FOUND,
      })
    );
  }
  return res.json({
    success: true,
    message: success.SAVED,
    data: protocol,
  });
};

exports.removeSubOrganizationFromEsgProtocolRouteHandler = async (req, res) => {
  const protocolId = req.params.esgProtocolId;
  const { subOrganizations } = req.body;
  const protocol = await removeSubOrganizationFromEsgProtocol(protocolId, subOrganizations, req.user);
  if (!protocol) {
    return res.json(
      errorRespSync({
        code: 404,
        msg: error.NOT_FOUND,
      })
    );
  }
  return res.json({
    success: true,
    message: success.SAVED,
    data: protocol,
  });
};

exports.getEsgProtocolSubOrganizationsRouteHandler = async (req, res) => {
  const protocolId = req.params.esgProtocolId;
  const subOrganizations = await getProtocolSubOrganizations(protocolId);

  if (!subOrganizations) {
    return res.json(
      errorRespSync({
        code: 404,
        msg: error.NOT_FOUND,
      })
    );
  }
  return res.json({
    success: true,
    message: success.LIST,
    data: subOrganizations,
  });
};

exports.getEsgProtocolSubOrganizationsProgressTableHandler = async (req, res) => {
  try {
    const protocolId = req.params.esgProtocolId;
    const result = await getProtocolSubOrganizationsProgressTable(protocolId, req.query);

    if (!result) {
      return res.json(
        errorRespSync({
          code: 404,
          msg: error.NOT_FOUND,
        })
      );
    }

    return res.json({
      success: true,
      message: success.LIST,
      data: result
    });
  } catch (err) {
    return res.json(
      errorRespSync({
        code: 500,
        msg: error.SERVER_ERROR,
        error: err.message
      })
    );
  }
};

exports.getEsgProtocolGoalProgressHandler = async (req, res) => {
  try {
    const protocolId = req.params.esgProtocolId;
    const result = await getProtocolGoalProgress(protocolId, req.query);

    if (!result) {
      return res.json(
        errorRespSync({
          code: 404,
          msg: error.NOT_FOUND,
        })
      );
    }

    return res.json({
      success: true,
      message: success.LIST,
      data: result
    });

  } catch (err) {
    return res.json(
      errorRespSync({
        code: 500,
        msg: error.SERVER_ERROR,
        error: err.message
      })
    );
  }
};

exports.getEsgProtocolOverallProgressScore = async (req, res) => {
  try {
    const protocolId = req.params.esgProtocolId;
    const startTargetYear = req.query.startTargetYear;
    const endTargetYear = req.query.endTargetYear;
    let subOrganizationIds = null;
    if(req.user.isSubEnterprise){
      subOrganizationIds = [req.user.mongoSubOrganizationId.toString()];
    }
    
    const { userType, includeFarmerAndSupplier } = req.query;
    const result = await calculateProtocolESGProgress({
      protocolId,
      userType,
      includeFarmerAndSupplier,
      subOrganizationIds,
      startTargetYear,
      endTargetYear,
    });
   
    if (!result) {
      return res.json(
        errorRespSync({
          code: 404,
          msg: error.NOT_FOUND,
        })
      );
    }

    return res.json({
      success: true,
      message: success.LIST,
      data: result
    });
  } catch (err) {
    return res.json(
      errorRespSync({
        code: 500,
        msg: error.SERVER_ERROR,
        error: err.message
      })
    );
  }
};

exports.getProtocolProgressForChartHandler = async (req, res) => {
  try {
    const protocolId = req.params.protocolId;
    const startTargetYear = req.query.startTargetYear;
    const endTargetYear = req.query.endTargetYear;

    const result = await getProtocolProgressForChart({
      protocolId,
      startTargetYear,
      endTargetYear
    });

    if (!result) {
      return res.json(
        errorRespSync({
          code: 404,
          msg: error.NOT_FOUND,
        })
      );
    }

    return res.json({
      success: true,
      message: success.LIST,
      data: result
    });
  } catch (err) {
    return res.json(
      errorRespSync({
        code: 500,
        msg: error.SERVER_ERROR,
        error: err.message
      })
    );
  }
};

exports.generateProtocolReportPDFHandler = async (req, res) => {
  try {
    const protocolId = req.params.protocolId;
    const pdfBuffer = await generateProtocolReportPdfService(protocolId, req.user, req.query);
 
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=protocol-report-${protocolId}-${Date.now()}.pdf`);
    res.send(pdfBuffer);

  } catch (error) {
    console.error('Error generating protocol report:', error);
    return res.json(
      errorRespSync({
        code: 500,
        msg: error.SERVER_ERROR,
        error: error.message
      })
    );
  }
};


exports.getFilteredProtocolResponses = async (req, res) => {
  try {
    const { protocolId: protocolId } = req.params;
    const {type, searchTerm, page, limit } = req.query;

    // Validate required parameters
    if (!protocolId || !type) {
      return res.json(
        errorRespSync({
          code: 400,
          msg: error.INVALID_INPUT,
          data: { message: "protocolId and type are required" }
        })
      );
    }

    // Call the service with query parameters, providing defaults where needed
    const response = await getProtocolResponsesWithFilters({
      protocolId,
      type,
      searchTerm: searchTerm || '',
      page: parseInt(page) || 1,
      limit: parseInt(limit) || 10
    });
  
    
    // Return successful response
    return res.json(
      successRespSync({
        msg: success.LIST,
        data: response
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
};
