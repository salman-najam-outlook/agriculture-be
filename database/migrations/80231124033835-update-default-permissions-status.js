'use strict';

const coffeeOnlyOrganizationCodes = [
  'agronosotros',
  'caffex',
  'satinaki',
  'uniocasmo',
  'comisuyl',
  'jazan',
  'solok',
  'limu_inara',
  'kata_muduga',
];
const cacaoOnlyOrganizationCodes = [
  'aprocam',
  'ceproaa',
  'huallaga',
  'asproc',
  'uchiza',
  'ladivisoria',
  'mi-cacao',
  'micacao',
  'ofc',
  'pangoa',
  'satipo',
  'aspac',
  'manasaba',
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      const coffeeOnlyOrganizations = await queryInterface.select(null, 'organization', {
        where: {
          code: { [Sequelize.Op.in]: coffeeOnlyOrganizationCodes },
        },
        transaction,
      });

      if (coffeeOnlyOrganizations.length > 0) {
        const cacaoBuyingStationModules = await queryInterface.select(null, 'modules', {
          where: {
            parent_module_id: 'cacao',
            id: { [Sequelize.Op.like]: 'cacao_buying_station%' },
          },
          transaction,
        });
        const cacaoWarehouseModules = await queryInterface.select(null, 'modules', {
          where: {
            parent_module_id: 'cacao',
            id: { [Sequelize.Op.like]: 'cacao_warehouse%' },
          },
          transaction,
        });
        const cacaoDryMillingModules = await queryInterface.select(null, 'modules', {
          where: {
            parent_module_id: 'cacao',
            id: { [Sequelize.Op.like]: 'cacao_dry_milling%' },
          },
          transaction,
        });

        const cacaoBuyingStationRoleModuleIds = [];
        const cacaoDryMillingRoleModuleIds = [];
        for (const module of cacaoBuyingStationModules) {
          cacaoBuyingStationRoleModuleIds.push(module.id);
        }
        for (const module of cacaoDryMillingModules) {
          cacaoDryMillingRoleModuleIds.push(module.id);
        }
        for (const module of cacaoWarehouseModules) {
          cacaoBuyingStationRoleModuleIds.push(module.id);
          cacaoDryMillingRoleModuleIds.push(module.id);
        }

        const newUserRoleModulesForCoffeeOrgs = [];
        for (const org of coffeeOnlyOrganizations) {
          for (const moduleId of cacaoBuyingStationRoleModuleIds) {
            newUserRoleModulesForCoffeeOrgs.push({
              id: `buying_station_${moduleId}_${org.id}`,
              user_role_id: 'buying_station',
              module_id: moduleId,
              organization_id: org.id,
              default_enabled: 0,
            });
          }

          for (const moduleId of cacaoDryMillingRoleModuleIds) {
            newUserRoleModulesForCoffeeOrgs.push({
              id: `dry_milling_${moduleId}_${org.id}`,
              user_role_id: 'dry_milling',
              module_id: moduleId,
              organization_id: org.id,
              default_enabled: 0,
            });
          }
        }
        if (newUserRoleModulesForCoffeeOrgs.length > 0) {
          for (const item of newUserRoleModulesForCoffeeOrgs) {
            const existingRoleModule = await queryInterface.select(null, 'user_role_modules', {
              where: {
                id: item.id,
              },
              transaction,
            });
            if (existingRoleModule.length > 0) {
              await queryInterface.bulkUpdate(
                'user_role_modules',
                { default_enabled: 0 },
                { id: item.id },
                { transaction }
              );
            } else {
              await queryInterface.insert(null, 'user_role_modules', item, {
                transaction,
              });
            }
          }
        }
      }

      const cacaoOnlyOrganizations = await queryInterface.select(null, 'organization', {
        where: {
          code: { [Sequelize.Op.in]: cacaoOnlyOrganizationCodes },
        },
        transaction,
      });

      if (cacaoOnlyOrganizations.length > 0) {
        const coffeeBuyingStationModules = await queryInterface.select(null, 'modules', {
          where: {
            parent_module_id: 'coffee',
            id: { [Sequelize.Op.like]: 'coffee/buying-station%' },
          },
          transaction,
        });
        const coffeeWarehouseModules = await queryInterface.select(null, 'modules', {
          where: {
            parent_module_id: 'warehouse',
          },
          transaction,
        });
        const coffeeDryMillingModules = await queryInterface.select(null, 'modules', {
          where: {
            parent_module_id: 'coffee',
            id: { [Sequelize.Op.like]: 'coffee/dry-milling%' },
          },
          transaction,
        });

        const coffeeBuyingStationRoleModuleIds = [];
        const coffeeDryMillingRoleModuleIds = [];
        for (const module of coffeeBuyingStationModules) {
          coffeeBuyingStationRoleModuleIds.push(module.id);
        }
        for (const module of coffeeDryMillingModules) {
          coffeeDryMillingRoleModuleIds.push(module.id);
        }
        for (const module of coffeeWarehouseModules) {
          coffeeBuyingStationRoleModuleIds.push(module.id);
          coffeeDryMillingRoleModuleIds.push(module.id);
        }

        const newUserRoleModulesForCacaoOrgs = [];
        for (const org of cacaoOnlyOrganizations) {
          for (const moduleId of coffeeBuyingStationRoleModuleIds) {
            newUserRoleModulesForCacaoOrgs.push({
              id: `buying_station_${moduleId}_${org.id}`,
              user_role_id: 'buying_station',
              module_id: moduleId,
              organization_id: org.id,
              default_enabled: 0,
            });
          }

          for (const moduleId of coffeeDryMillingRoleModuleIds) {
            newUserRoleModulesForCacaoOrgs.push({
              id: `dry_milling_${moduleId}_${org.id}`,
              user_role_id: 'dry_milling',
              module_id: moduleId,
              organization_id: org.id,
              default_enabled: 0,
            });
          }
        }
        if (newUserRoleModulesForCacaoOrgs.length > 0) {
          for (const item of newUserRoleModulesForCacaoOrgs) {
            const existingRoleModule = await queryInterface.select(null, 'user_role_modules', {
              where: {
                id: item.id,
              },
              transaction,
            });
            if (existingRoleModule.length > 0) {
              await queryInterface.bulkUpdate(
                'user_role_modules',
                { default_enabled: 0 },
                { id: item.id },
                { transaction }
              );
            } else {
              await queryInterface.insert(null, 'user_role_modules', item, {
                transaction,
              });
            }
          }
        }
      }
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      console.error(error);
      throw error;
    }
  },

  async down(queryInterface, Sequelize) {},
};
