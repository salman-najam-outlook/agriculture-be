const db = require(rootPath + '/models');

module.exports.getCalculatedPlantationStatus = async (user_id, organization_id) => {
    let response = {
        status: 'pending',
        plantationStatus: 'pending'
    };
    let result = await db.CacaoPlantationSetting.findOne({
        where: {
            organization_id: organization_id
        }
    });

    if (result && result.approvalOption === 'auto_approve') {
        const limit = result.autoApprovalLimit;
        const plantationCount = await db.CacaoPlantations.count({
            where: {
                user_id: user_id
            }
        });
        if (plantationCount < limit) {
            response.status = 'approved';
            response.plantationStatus = 'active';
        }
    }
    return response;
};