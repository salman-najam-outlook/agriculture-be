const db = require(rootPath + "/models");
const { Op, Sequelize } = require("sequelize");

const getUserFarmCount = async (userIds) => {
    const results = await db.user_farm.findAll({
        attributes: ['userId', [Sequelize.fn('COUNT', Sequelize.col('*')), 'count']],
        where: {
            userId: userIds
        },
        group: 'userId'
    });
    return results;
}

module.exports = {
    getUserFarmCount
}