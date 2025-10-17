const db = require(rootPath + '/models');

const getUserOrganization = async (userId) => {
  const userInfo = await db.user.findOne({
    where: {
      id: userId,
    },
    include: [
      {
        model: db.Organization,
        as: 'user_organization',
      },
    ],
  });
  const organization = userInfo.user_organization
    ? userInfo.user_organization.id
    : null;
  return organization;
};

const getReports = async (
  cropType,
  cropsIds,
  organization,
  language,
  systemModule,
) => {
  let reports = [];
  for (let id of cropsIds) {
    const report = await db.CropModulesReport.findOne({
      where: {
        cropType: cropType,
        cropVariety: id,
        language,
        organization,
        module: systemModule,
      },
    });
    reports.push(report);
  }
  return reports;
};

module.exports = { getUserOrganization, getReports };
