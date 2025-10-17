const db = require(rootPath + "/models");
const unitTypeVals = [
    { unitType: 'Weight', unitName: 'Kilogram' },
    { unitType: 'Length', unitName: 'Meter' },
    { unitType: 'Volume-Area', unitName: 'Liter-Per-Hectar' },
    { unitType: 'Weight-Area', unitName: 'Kilograms per Hectare' },
    { unitType: 'Area', unitName: 'Hectares' },
    { unitType: 'Perimeter', unitName: 'Meter' }
];
const orgName = 'micacao'

// Helper function to get organization default settings
const getOrganizationDefaultSettings = async (orgId) => {
    try {
        const globalSettings = await db.GlobalSetting.findOne({
            where: { org_id: orgId },
            include: [
                {
                    model: db.UnitsList,
                    as: "areaUnit",
                    attributes: ["id", "name", "abbvr", "unitType", "factor"],
                },
                {
                    model: db.UnitsList,
                    as: "weightUnit",
                    attributes: ["id", "name", "abbvr", "unitType", "factor"],
                },
                {
                    model: db.Currency,
                    as: "currency",
                    attributes: ["id", "name", "abbreviation", "symbol"],
                },
            ],
        });

        if (!globalSettings) {
            // Return default settings if no organization settings found
            return {
                areaUnit: { name: 'Hectares' },
                weightUnit: { name: 'Kilogram' },
                currency: { id: 1, name: 'US Dollar', abbreviation: 'USD', symbol: '$' }
            };
        }

        return {
            areaUnit: globalSettings.areaUnit,
            weightUnit: globalSettings.weightUnit,
            currency: globalSettings.currency
        };
    } catch (error) {
        console.error('Error fetching organization settings:', error);
        // Return default settings on error
        return {
            areaUnit: { name: 'Hectares' },
            weightUnit: { name: 'Kilogram' },
            currency: { id: 1, name: 'US Dollar', abbreviation: 'USD', symbol: '$' }
        };
    }
};

module.exports = {
    setDefaultUnitSettingsForAppUsers: async (userId, orgId) => {
        try {
            // Get organization default settings
            const orgSettings = await getOrganizationDefaultSettings(orgId);
            
            const set = []
            
            // Map organization settings to unit types
            const orgUnitMappings = [
                { unitType: 'Area', unitName: orgSettings.areaUnit?.name || 'Hectares' },
                { unitType: 'Weight', unitName: orgSettings.weightUnit?.name || 'Kilogram' },
                { unitType: 'Length', unitName: 'Meter' },
                { unitType: 'Volume-Area', unitName: 'Liter-Per-Hectar' },
                { unitType: 'Weight-Area', unitName: 'Kilograms per Hectare' },
                { unitType: 'Perimeter', unitName: 'Meter' }
            ];

            for (let row of orgUnitMappings) {
                const unitT = await db.UnitTypes.findOne({
                    where: { name: row.unitType }
                })
                const unitL = await db.UnitsList.findOne({
                    where: { name: row.unitName, unitType: unitT?.id }
                })
                if (unitT && unitL) {
                    const unit_map = await db.UserUnitConfiguration.findOne({
                        where: {
                            userId: userId,
                            unitType: unitT.id
                        }
                    })
                    if (!unit_map) {
                        set.push({
                            userId: userId,
                            unitType: unitT.id,
                            unitId: unitL.id
                        });
                    } 
                }
            }
            if(set.length) {
                await db.UserUnitConfiguration.bulkCreate(set,)
            }

            // Set default currency settings for the user
            if (orgSettings.currency?.id) {
                const existingCurrencySetting = await db.UserCurrencySettings.findOne({
                    where: { userId: userId }
                });
                
                if (!existingCurrencySetting) {
                    await db.UserCurrencySettings.create({
                        userId: userId,
                        currencyId: orgSettings.currency.id
                    });
                }
            }
            
            return
        } catch (error) {
            console.error('Error setting default unit settings for user:', error);
            // Fallback to original logic if there's an error
            const set = []
            for (let row of unitTypeVals) {
                const unitT = await db.UnitTypes.findOne({
                    where: { name: row.unitType }
                })
                const unitL = await db.UnitsList.findOne({
                    where: { name: row.unitName, unitType: unitT.id }
                })
                if (unitT && unitL) {
                    const unit_map = await db.UserUnitConfiguration.findOne({
                        where: {
                            userId: userId,
                            unitType: unitT.id
                        }
                    })
                    if (!unit_map) {
                        set.push({
                            userId: userId,
                            unitType: unitT.id,
                            unitId: unitL.id
                        });
                    } 
                }
            }
            if(set.length) {
                await db.UserUnitConfiguration.bulkCreate(set,)
            }

            // Fallback currency setting
            try {
                const existingCurrencySetting = await db.UserCurrencySettings.findOne({
                    where: { userId: userId }
                });
                
                if (!existingCurrencySetting) {
                    await db.UserCurrencySettings.create({
                        userId: userId,
                        currencyId: 1 
                    });
                }
            } catch (currencyError) {
                console.error('Error setting default currency for user:', currencyError);
            }
            
            return
        }
    },

    updateDefaultUnitForCacaoByUserIdForApp: async (userId, orgId) => {
        try {
            // Get organization default settings
            const orgSettings = await getOrganizationDefaultSettings(orgId);
            
            const set = []
            
            // Map organization settings to unit types
            const orgUnitMappings = [
                { unitType: 'Area', unitName: orgSettings.areaUnit?.name || 'Hectares' },
                { unitType: 'Weight', unitName: orgSettings.weightUnit?.name || 'Kilogram' },
                { unitType: 'Length', unitName: 'Meter' },
                { unitType: 'Volume-Area', unitName: 'Liter-Per-Hectar' },
                { unitType: 'Weight-Area', unitName: 'Kilograms per Hectare' },
                { unitType: 'Perimeter', unitName: 'Meter' }
            ];

            for (let row of orgUnitMappings) {
                const unitT = await db.UnitTypes.findOne({
                    where: { name: row.unitType }
                })
                const unitL = await db.UnitsList.findOne({
                    where: { name: row.unitName, unitType: unitT?.id }
                })
                if (unitT && unitL) {
                    const unit_map = await db.UserUnitConfiguration.findOne({
                        where: {
                            userId: userId,
                            unitType: unitT.id
                        }
                    })
                    if (!unit_map) {
                        set.push({
                            userId: userId,
                            unitType: unitT.id,
                            unitId: unitL.id
                        });
                    } 
                }
            }
            if(set.length) {
                await db.UserUnitConfiguration.bulkCreate(set,)
            }

            // Update currency settings for the user
            if (orgSettings.currency?.id) {
                const existingCurrencySetting = await db.UserCurrencySettings.findOne({
                    where: { userId: userId }
                });
                
                if (existingCurrencySetting) {
                    // Update existing currency setting
                    existingCurrencySetting.currencyId = orgSettings.currency.id;
                    await existingCurrencySetting.save();
                } else {
                    // Create new currency setting
                    await db.UserCurrencySettings.create({
                        userId: userId,
                        currencyId: orgSettings.currency.id
                    });
                }
            }
            
            return
        } catch (error) {
            console.error('Error updating default unit settings for user:', error);
            // Fallback to original logic if there's an error
            const set = []
            for (let row of unitTypeVals) {
                const unitT = await db.UnitTypes.findOne({
                    where: { name: row.unitType }
                })
                const unitL = await db.UnitsList.findOne({
                    where: { name: row.unitName, unitType: unitT.id }
                })
                if (unitT && unitL) {
                    const unit_map = await db.UserUnitConfiguration.findOne({
                        where: {
                            userId: userId,
                            unitType: unitT.id
                        }
                    })
                    if (!unit_map) {
                        set.push({
                            userId: userId,
                            unitType: unitT.id,
                            unitId: unitL.id
                        });
                    } 
                }
            }
            if(set.length) {
                await db.UserUnitConfiguration.bulkCreate(set,)
            }

            // Fallback currency setting
            try {
                const existingCurrencySetting = await db.UserCurrencySettings.findOne({
                    where: { userId: userId }
                });
                
                if (existingCurrencySetting) {
                    existingCurrencySetting.currencyId = 1; // Default USD
                    await existingCurrencySetting.save();
                } else {
                    await db.UserCurrencySettings.create({
                        userId: userId,
                        currencyId: 1 // Default USD
                    });
                }
            } catch (currencyError) {
                console.error('Error updating default currency for user:', currencyError);
            }
            
            return
        }
    },

    updateDefaultUnitForCacaoByUserId: async (userId, orgId, transaction) => {
        const dborg = await db.Organization.findOne({
            where: {
                id: orgId
            }
        })
        if (dborg.name.toLowerCase() != orgName) {
            return
        }
        const set = []
        for (let row of unitTypeVals) {
            const unitT = await db.UnitTypes.findOne({
                where: { name: row.unitType }
            })
            const unitL = await db.UnitsList.findOne({
                where: { name: row.unitName, unitType: unitT.id }
            })
            if (unitT && unitL) {
                const unit_map = await db.UserUnitConfiguration.findOne({
                    where: {
                        userId: userId,
                        unitType: unitT.id
                    }
                })
                if (!unit_map) {
                    set.push({
                        userId: userId,
                        unitType: unitT.id,
                        unitId: unitL.id
                    });
                    console.log(unitT.id,  unitL.id, 'created')
                } 
            }
        }
        if(set.length) {
            await db.UserUnitConfiguration.bulkCreate(set, { transaction })
        }
        return
    },

    updateDefaultUnitForAllCacaoUser: async (organizationName = null) => {
        const orgName = organizationName || 'MiCacao'
        const result = []
        const organization = await db.Organization.findOne({
            attributes: ['id'],
            where: {
                name: orgName
            }
        })
        if (organization) {
            const dbUsers = await db.user.findAll({
                attributes: ['id'],
                where: {
                    organization: organization.id
                }
            })
            if (dbUsers.length) {
                for (let row of unitTypeVals) {
                    const unitT = await db.UnitTypes.findOne({
                        where: { name: row.unitType }
                    })
                    const unitL = await db.UnitsList.findOne({
                        where: { name: row.unitName, unitType: unitT.id }
                    })
                    result.push({
                        unitType: unitT.id,
                        unitId: unitL.id,
                    })
                    if (unitT && unitL) {
                        for (let userRow of dbUsers) {
                            console.log(userRow.id)
                            const unit_map = await db.UserUnitConfiguration.findOne({
                                where: {
                                    userId: userRow.id,
                                    unitType: unitT.id
                                }
                            })
                            if (unit_map) {
                                console.log("updated", unitL.id)
                                unit_map.unitId = unitL.id
                                await unit_map.save()
                            } else {
                                console.log("created", unitL.id)
                                await db.UserUnitConfiguration.create({
                                    userId: userRow.id,
                                    unitType: unitT.id,
                                    unitId: unitL.id
                                })
                            }
                        }
                    }
                }
            }
        }
    }
}