const { getFarmMetricByOrganizationIds, createOrUpdateSubOrg, getSubOrgs, getMongoSubOrgs, getSubOrgDetails, deactivateSubOrg, deleteSubOrg, exportSubOrgsToCSV } = require('../../../services/admin/organization');
const { logErrorOccurred } = require(rootPath +
    '/helpers/general');
const { successRespSync, serverError } = require(rootPath + '/helpers/api');
const { success } = require(rootPath + "/helpers/language");

async function createOrUpdateSuborg(req, res) {
    try {
        const { organization: parentOrgId } = req.user;
        const payload = req.body;

        const result = await createOrUpdateSubOrg(parentOrgId, payload);

        return res.json(
            successRespSync({
                msg: success.SAVED,
                data: result
            })
        );
    } catch (err) {
        logErrorOccurred(__filename, err);
        return serverError(res, err);
    }
}

async function getSubOrganizations(req, res) {
    try {
        const { organization: parentOrgId } = req.user;
        const { page = 1, limit = 10, search } = req.query;

        const result = await getSubOrgs(parentOrgId, { page, limit, search });

        return res.json(
            successRespSync({
                msg: success.FETCH,
                data: result
            })
        );
    } catch (err) {
        logErrorOccurred(__filename, err);
        return serverError(res, err);
    }
}

async function getMongoSubOrganization(req, res) {
    try {
        const { mongoOrganizationId: parentOrgId } = req.user;
        const { page = 1, limit = 10, search } = req.query;

        const result = await getMongoSubOrgs(parentOrgId, { page, limit, search });

        return res.json(
            successRespSync({
                msg: success.FETCH,
                data: result
            })
        );
    } catch (err) {
        logErrorOccurred(__filename, err);
        return serverError(res, err);
    }
}

async function getSubOrganizationDetails(req, res) {
    try {
        const { id } = req.params;
        const result = await getSubOrgDetails(id);

        return res.json(
            successRespSync({
                msg: success.FETCH,
                data: result
            })
        );
    } catch (err) {
        logErrorOccurred(__filename, err);
        return serverError(res, err);
    }
}

// Deactivate a sub-organization
async function deactivateSubOrganization(req, res) {
    try {
        const { id } = req.params;
        const result = await deactivateSubOrg(id);
        return res.json(
            successRespSync({
                msg: success.UPDATED,
                data: result
            })
        );
    } catch (err) {
        logErrorOccurred(__filename, err);
        return serverError(res, err);
    }
}

// Delete a sub-organization
async function deleteSubOrganization(req, res) {
    try {
        const { id } = req.params;
        const result = await deleteSubOrg(id);

        return res.json(
            successRespSync({
                msg: success.DELETED,
                data: result
            })
        );
    } catch (err) {
        logErrorOccurred(__filename, err);
        return serverError(res, err);
    }
}

async function exportSubOrganization(req, res) {
    try {
        const { organization: parentOrgId } = req.user;
        
        // Generate CSV data
        const csvData = await exportSubOrgsToCSV(parentOrgId);
        
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', `attachment; filename=sub-organizations-${Date.now()}.csv`);
        
        // Send the CSV data
        res.send(csvData);
  
    } catch (err) {
        logErrorOccurred(__filename, err);
        return serverError(res, err);
    }
  }

async function getFarmMetricOfCurrentOrganization(req, res) {
    try {
        const { organization } = req.user;
        const metric = await getFarmMetricByOrganizationIds(organization);
        return res.json(
            successRespSync({
                msg: success.FETCH,
                data: metric,
            })
        );
    } catch (err) {
        logErrorOccurred(__filename, err);
        return serverError(res, err);
    }
}

module.exports = {
    createOrUpdateSuborg,
    getSubOrganizations,
    getSubOrganizationDetails,
    deactivateSubOrganization,
    deleteSubOrganization,
    exportSubOrganization,
    getMongoSubOrganization,
    getFarmMetricOfCurrentOrganization,
};