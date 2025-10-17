const { Op } = require('sequelize');
const { default: axios } = require('axios');
const db = require(rootPath + '/models');
const { v4: uuid } = require('uuid');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const { generateUsername } = require('unique-username-generator');

const komodoApiInstance = axios.create({
  baseURL: process.env.OCC_KOMODO_API_BASE_URL || 'https://api.dimitra.occs.openfoodchain.org',
  headers: {
    Accept: 'application/json',
  },
});

const OCC_KOMODO_API_URLS = {
  addFarmerData: 'add/farmer-data',
  addBatchData: 'add/batch',
};

const deforestationApiInstance = axios.create({
  baseURL: process.env.DEFORESTATION_API_BASE_URL || 'https://cf-deforestation-dev.dimitra.dev/api',
  headers: {
    Accept: 'application/json',
  },
});

const DEFORESTATION_API_URLS = {
  userReport: 'deforestation/by-userid',
};

const FARMER_ROLES = ['cacao_farmer'];
const ORGANIZATION_CODES = ['micacao'];

const getUniqueFriendlyName = async () => {
  const username = generateUsername('', 3, 19);
  const user = await db.user.findOne({
    where: {
      friendly_name: username,
    },
    attributes: ['id'],
  });

  if (user) return await getUniqueFriendlyName();
  return username;
};

const removeEmptyValues = (data) => {
  if (typeof data === 'object') {
    if (Array.isArray(data)) {
      data.forEach(removeEmptyValues);
    } else {
      for (const key in data) {
        if (
          data[key] === null ||
          data[key] === undefined ||
          (typeof data[key] === 'string' && data[key].trim().length === 0) ||
          (typeof data[key] === 'number' && isNaN(data[key]))
        ) {
          delete data[key];
        } else if (typeof data[key] === 'object') {
          removeEmptyValues(data[key]);
        }
      }
    }
  }

  return data;
};

const sendDataToOCC = async (data, apiUrl) => {
  try {
    const response = await komodoApiInstance.post(apiUrl, data);

    if (response.data?.inserted_id) {
      return { success: true, insertedId: response.data.inserted_id };
    }

    throw new Error(response.data?.error ?? 'OCC API request failed');
  } catch (error) {
    return { success: false, message: error.message };
  }
};

const getDeforestationReportsOfUser = async (userId) => {
  try {
    const oauthToken = jwt.sign(
      {
        data: {
          userId,
          source: 'CF',
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: 300, // Expires in 5 minutes
      }
    );

    const response = await deforestationApiInstance.post(
      DEFORESTATION_API_URLS.userReport,
      {
        isCertified: null,
      },
      {
        headers: {
          'oauth-token': oauthToken,
        },
      }
    );

    if (!response.data?.status) {
      throw new Error(response.data?.message || 'Deforestation report API failed');
    }

    const deforestationReports = response.data.data.rows;
    return { success: true, deforestationReports };
  } catch (error) {
    console.error('Deforestation Report Error: ', error);
    return { success: false, message: error.message };
  }
};

const attachDeforestationReportToFarmerData = (deforestationReports, farmerData) => {
  if (!farmerData || !Array.isArray(deforestationReports) || deforestationReports.length === 0) return farmerData;

  const undeletedFarms = farmerData.farms.filter((farm) => !farm.isDeleted);
  const farmerDeforestationReports = [];
  for (const deforestationReport of deforestationReports) {
    const { farmId, zoneId } = deforestationReport;
    if (!farmId) {
      farmerDeforestationReports.push(deforestationReport);
      continue;
    }
    const farm = undeletedFarms.find((farm) => farm.id.toString() === farmId.toString());
    if (!farm) {
      continue;
    }

    if (zoneId) {
      const farmZone = farm.zones.find((zone) => zone.id.toString() === zoneId.toString());
      if (farmZone) {
        if (farmZone.deforestationReports) {
          if (Array.isArray(farmZone.deforestationReports)) {
            farmZone.deforestationReports.push(deforestationReport);
          } else {
            farmZone.deforestationReports = [farmZone.deforestationReports, deforestationReport];
          }
        } else {
          farmZone.deforestationReports = deforestationReport;
        }
        continue;
      }
    }
    if (farm.deforestationReports) {
      if (Array.isArray(farm.deforestationReports)) {
        farm.deforestationReports.push(deforestationReport);
      } else {
        farm.deforestationReports = [farm.deforestationReports, deforestationReport];
      }
    } else {
      farm.deforestationReports = deforestationReport;
    }
  }

  farmerData.farms = undeletedFarms;
  if (farmerDeforestationReports.length > 0) {
    if (farmerDeforestationReports.length === 1) {
      farmerData.deforestationReports = farmerDeforestationReports[0];
    } else {
      farmerData.deforestationReports = farmerDeforestationReports;
    }
  }
  return farmerData;
};

const getOnChainSingleDeforestationReport = (deforestationReport) => {
  const data = {
    reportGuid: { value: deforestationReport.reportGuid, clear_text: true },
    transactionHash: deforestationReport.transactionHash
      ? { value: deforestationReport.transactionHash, clear_text: true }
      : null,
    keccakHash: deforestationReport.keccakHash ? { value: deforestationReport.keccakHash, clear_text: true } : null,
    center:
      deforestationReport.centerLatitude && deforestationReport.centerLongitude
        ? {
            lat: deforestationReport.centerLatitude,
            lng: deforestationReport.centerLongitude,
          }
        : null,
    status: deforestationReport.status ? { value: deforestationReport.status, clear_text: true } : null,
    reportType: deforestationReport.reportType ? { value: deforestationReport.reportType, clear_text: true } : null,
    radiusInKm: deforestationReport.radius ? { value: deforestationReport.radius, clear_text: true } : null,
    requestedAt: { value: deforestationReport.createdAt, clear_text: true },
    isCertified: { value: deforestationReport.isCertified, clear_text: true },

    // NEW
    highProbabilityArea:
      deforestationReport.highProb !== null && !isNaN(Number(deforestationReport.highProb))
        ? { value: Number(deforestationReport.highProb), clear_text: true }
        : null,
    highProbabilityPercent:
      deforestationReport.highProbPercent !== null && !isNaN(Number(deforestationReport.highProbPercent))
        ? { value: Number(deforestationReport.highProbPercent), clear_text: true }
        : null,
    lowProbabilityArea:
      deforestationReport.lowProb !== null && !isNaN(Number(deforestationReport.lowProb))
        ? { value: Number(deforestationReport.lowProb), clear_text: true }
        : null,
    lowProbabilityPercent:
      deforestationReport.lowProbPercent !== null && !isNaN(deforestationApiInstance.lowProbPercent)
        ? { value: Number(deforestationReport.lowProbPercent), clear_text: true }
        : null,
    zeroProbabilityArea:
      deforestationReport.zeroProb !== null && !isNaN(Number(deforestationReport.zeroProb))
        ? { value: Number(deforestationReport.zeroProb), clear_text: true }
        : null,
    zeroProbabilityPercent:
      deforestationReport.zeroProbPercent !== null && !isNaN(Number(deforestationReport.zeroProbPercent))
        ? { value: Number(deforestationReport.zeroProbPercent), clear_text: true }
        : null,
    totalArea:
      deforestationReport.totalArea !== null && !isNaN(Number(deforestationReport.totalArea))
        ? { value: Number(deforestationReport.totalArea), clear_text: true }
        : null,
    overallProb: deforestationReport.overallProb ? { value: deforestationReport.overallProb, clear_text: true } : null,
  };

  return data;
};

const getOnChainDeforestationData = (deforestationReports) => {
  if (!deforestationReports) return null;
  if (Array.isArray(deforestationReports)) {
    if (deforestationReports.length === 1) return getOnChainSingleDeforestationReport(deforestationReports);
    return deforestationReports.map(getOnChainSingleDeforestationReport);
  }
  return getOnChainSingleDeforestationReport(deforestationReports);
};

const getOnChainFarmerData = (farmerData) => {
  if (!farmerData) return null;

  const onChainData = {
    recordType: { value: 'FARMER_REGISTRATION', clear_text: true },
    farmerId: { value: farmerData.dimitraUserId, unique: true, clear_text: true },
    farmerNationalId:
      farmerData.id_number !== null ? { value: farmerData.id_number, double_hash: true, lookup: true } : null,
    farmerFriendlyName: { value: farmerData.friendly_name, clear_text: true },
    farms: farmerData.farms.map((farm) => {
      const farmData = {
        farmId: { value: farm.dimitraFarmId, clear_text: true },
        farmRegistrationId: farm.registrationNo !== null ? { value: farm.registrationNo, double_hash: true } : null,
        lat: farm.lat !== null && !isNaN(Number(farm.lat)) ? Number(farm.lat) : null,
        lng: farm.log !== null && !isNaN(Number(farm.log)) ? Number(farm.log) : null,
        geofenceCoordinates: farm.farmCoordinates.map((farmCoordinate) => ({
          lat: farmCoordinate.lat !== null && !isNaN(Number(farmCoordinate.lat)) ? Number(farmCoordinate.lat) : null,
          lng: farmCoordinate.log !== null && !isNaN(Number(farmCoordinate.log)) ? Number(farmCoordinate.log) : null,
        })),
        polygonalZones: farm.zones.map((zone) => {
          const zoneData = {
            zoneId: { value: zone.dimitraGeofenceId, clear_text: true },
            polygonCoordinates: zone.geofence_coordinates.map((coordinate) => ({
              lat: coordinate.lat !== null && !isNaN(Number(coordinate.lat)) ? Number(coordinate.lat) : null,
              lng: coordinate.log !== null && !isNaN(Number(coordinate.log)) ? Number(coordinate.log) : null,
            })),
          };

          if (zone.deforestationReports) {
            zoneData.deforestationReports = getOnChainDeforestationData(zone.deforestationReports);
          }

          return zoneData;
        }),
      };

      if (farm.deforestationReports) {
        farmData.deforestationReports = getOnChainDeforestationData(farm.deforestationReports);
      }

      if (farm.isTechnician && farm.farmerId !== null) {
        farmData.farmerNationalId = { value: farm.farmerId, double_hash: true };
      }

      return farmData;
    }),
  };

  if (farmerData.deforestationReports) {
    onChainData.deforestationReports = getOnChainDeforestationData(farmerData.deforestationReports);
  }

  return removeEmptyValues(onChainData);
};

const handleNewOnChainData = async (dataType, dataId, onChainData, apiUrl) => {
  try {
    // Handle previous pending or error data
    const lastSuccessData = await db.OCCKomodoInsertedId.findOne({
      where: {
        status: 'SUCCESS',
        dataType,
        dataId,
      },
      order: [['createdAt', 'DESC']],
    });

    const pendingOrErrorWhereQuery = {
      status: { [Op.in]: ['PROCESSING', 'ERROR'] },
      dataType,
      dataId,
    };

    if (lastSuccessData) {
      pendingOrErrorWhereQuery.createdAt = { [Op.gte]: lastSuccessData.createdAt };
    }

    const lastItem = await db.OCCKomodoInsertedId.findOne({
      where: {
        dataType,
        dataId,
      },
      order: [['createdAt', 'DESC']],
    });
    // Check for pending or error process
    let previousPendingItem = await db.OCCKomodoInsertedId.findOne({
      where: pendingOrErrorWhereQuery,
      order: [['createdAt', 'ASC']],
    });

    let shouldSendToOCC = true;
    while (previousPendingItem) {
      if (previousPendingItem.status === 'PROCESSING') {
        if (onChainData && (!lastItem || !_.isEqual(lastItem.onChainData, onChainData))) {
          await db.OCCKomodoInsertedId.create({
            dataType,
            dataId,
            status: 'ERROR',
            onChainData,
          });
        }
        shouldSendToOCC = false;
        break;
      } else {
        await db.OCCKomodoInsertedId.update(
          {
            status: 'PROCESSING',
          },
          {
            where: {
              id: previousPendingItem.id,
            },
          }
        );
        const response = await sendDataToOCC(previousPendingItem.onChainData, apiUrl);
        if (response.success) {
          await db.OCCKomodoInsertedId.update(
            {
              status: 'SUCCESS',
              insertedId: response.insertedId,
            },
            {
              where: {
                id: previousPendingItem.id,
              },
            }
          );
          previousPendingItem = await db.OCCKomodoInsertedId.findOne({
            where: pendingOrErrorWhereQuery,
            order: [['createdAt', 'ASC']],
          });
        } else {
          await db.OCCKomodoInsertedId.update(
            {
              status: 'ERROR',
            },
            {
              where: {
                id: previousPendingItem.id,
              },
            }
          );
          if (onChainData && (!lastItem || !_.isEqual(lastItem.onChainData, onChainData))) {
            await db.OCCKomodoInsertedId.create({
              dataType,
              dataId,
              status: 'ERROR',
              onChainData,
            });
          }
          shouldSendToOCC = false;
          break;
        }
      }
    }

    if (shouldSendToOCC) {
      if (onChainData && (!lastItem || !_.isEqual(lastItem.onChainData, onChainData))) {
        const response = await sendDataToOCC(onChainData, apiUrl);
        await db.OCCKomodoInsertedId.create({
          dataType,
          dataId,
          status: response.success ? 'SUCCESS' : 'ERROR',
          insertedId: response.success ? response.insertedId : null,
          onChainData,
        });
      }
    }
    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false };
  }
};

const syncFarmerDataToOCC = async (userId) => {
  let onChainData = null;
  try {
    if (!userId) return { success: true };
    let farmerData = await db.user.findOne({
      where: {
        id: userId,
        [Op.and]: [{ id_number: { [Op.not]: null } }, { id_number: { [Op.ne]: '' } }],
      },
      attributes: ['dimitraUserId', 'id_number', 'friendly_name'],
      include: [
        {
          model: db.Membership,
          attributes: ['id'],
          as: 'user_membership',
          through: { attributes: [] },
          required: true,
          include: [
            {
              model: db.UserRoleMembershipMap,
              as: 'userRoleMembershipMap',
              attributes: [],
              required: true,
              where: {
                isDeleted: false,
                user_role_id: { [Op.in]: FARMER_ROLES },
              },
            },
            {
              model: db.Organization,
              as: 'org_assoc',
              required: true,
              where: {
                isDeleted: false,
                code: { [Op.in]: ORGANIZATION_CODES },
              },
              attributes: [],
            },
          ],
        },
        {
          model: db.user_farm,
          as: 'farms',
          required: true,
          attributes: ['id', 'dimitraFarmId', 'lat', 'log', 'registrationNo', 'farmerId', 'isTechnician', 'isDeleted'],
          include: [
            {
              model: db.Geofence,
              as: 'zones',
              attributes: ['id', 'dimitraGeofenceId'],
              required: false,
              where: {
                deletedAt: { [Op.is]: null },
              },
              include: [
                {
                  model: db.GeofenceCoordinate,
                  as: 'geofence_coordinates',
                  required: false,
                  where: {
                    deletedAt: { [Op.is]: null },
                  },
                  attributes: ['lat', 'log'],
                },
              ],
            },
            {
              model: db.UserFarmCoordinate,
              required: false,
              as: 'farmCoordinates',
              attributes: ['lat', 'log'],
            },
          ],
        },
      ],
    });

    // Skip sending data in following case
    if (
      !farmerData ||
      farmerData?.farms.length === 0 ||
      farmerData?.id_number === null ||
      typeof farmerData?.id_number === 'undefined' ||
      farmerData?.id_number.trim() === ''
    ) {
      return { success: true };
    }

    farmerData = farmerData.toJSON();
    farmerData.farms = farmerData.farms.filter((farm) => !farm.isDeleted);

    const promises = [];
    if (!farmerData.dimitraUserId || !farmerData.friendly_name) {
      if (!farmerData.dimitraUserId) {
        const dimitraUserId = uuid();
        farmerData.dimitraUserId = dimitraUserId;
      }
      if (!farmerData.friendly_name) {
        const friendlyName = await getUniqueFriendlyName();
        farmerData.friendly_name = friendlyName;
      }
      promises.push(
        db.user.update(
          { dimitraUserId: farmerData.dimitraUserId, friendly_name: farmerData.friendly_name },
          { where: { id: userId } }
        )
      );
    }

    for (const farm of farmerData.farms) {
      if (!farm.dimitraFarmId) {
        const dimitraFarmId = uuid();
        farm.dimitraFarmId = dimitraFarmId;
        promises.push(db.user_farm.update({ dimitraFarmId }, { where: { id: farm.id } }));
      }

      if (farm.zones && farm.zones.length > 0) {
        for (const zone of farm.zones) {
          if (!zone.dimitraGeofenceId) {
            const dimitraGeofenceId = uuid();
            zone.dimitraGeofenceId = dimitraGeofenceId;
            promises.push(db.Geofence.update({ dimitraGeofenceId }, { where: { id: zone.id } }));
          }
        }
      }
    }
    await Promise.all(promises);

    const deforestationReportResponse = await getDeforestationReportsOfUser(userId);
    if (!deforestationReportResponse.success) {
      throw new Error(deforestationReportResponse.message);
    }
    const deforestationReports = deforestationReportResponse.deforestationReports;
    farmerData = attachDeforestationReportToFarmerData(deforestationReports, farmerData);
    onChainData = getOnChainFarmerData(farmerData);
    const res = await handleNewOnChainData('FARMER', userId, onChainData, OCC_KOMODO_API_URLS.addFarmerData);
    return {
      success: true,
      res,
      onChainData,
    };
  } catch (error) {
    console.log(error);
    return { success: false, message: error.message, onChainData };
  }
};

const getOnChainCacaoPurchaseOrderData = (purchaseOrder) => {
  if (!purchaseOrder) return null;
  const onChainData = {
    recordType: { value: 'BATCH_REGISTRATION', clear_text: true },
    batchId: {
      value: `#FARMER_NATIONAL_ID:${purchaseOrder.farmer.id_number}|#PURCHASE_DATE:${purchaseOrder.purchasedAt}`,
      double_hash: true,
      unique: true,
    },
    buyerId: { value: purchaseOrder.buyingStation.dimitraUserId, clear_text: true },
    buyer: purchaseOrder.buyer ? { value: purchaseOrder.buyer, clear_text: true } : null,
    farmerId: { value: purchaseOrder.farmer.dimitraUserId, clear_text: true },
    farmerNationalId:
      purchaseOrder.farmer.id_number !== null
        ? { value: purchaseOrder.farmer.id_number, double_hash: true, lookup: true }
        : null,
    farmerFriendlyName: { value: purchaseOrder.farmer.friendly_name, clear_text: true },
    purchasedAt: purchaseOrder.purchasedAt ? { value: purchaseOrder.purchasedAt, clear_text: true } : null,
    quantity:
      purchaseOrder.cacao_weight !== null
        ? { value: Number(Number(purchaseOrder.cacao_weight).toFixed(2)), clear_text: true }
        : null,
    quantityUnit: {
      name: { value: 'Gram', clear_text: true },
      abbvr: { value: 'g', clear_text: true },
    },
    quality: purchaseOrder.product_type ? { value: purchaseOrder.product_type, clear_text: true } : null,
    moisture: purchaseOrder.moisture !== null ? { value: purchaseOrder.moisture, clear_text: true } : null,
    varieties: purchaseOrder.cacaoVariety.map((variety) => ({ value: variety.name, clear_text: true })),
    cacaoType: purchaseOrder.cacao_type ? { value: purchaseOrder.cacao_type, clear_text: true } : null,
    isPremiumPaid: purchaseOrder.premiumPrice !== null ? { value: purchaseOrder.premiumPrice, clear_text: true } : null,
  };

  return removeEmptyValues(onChainData);
};

const syncCacaoPurchaseOrderDataToOCC = async (purchaseOrderId) => {
  if (!purchaseOrderId) return { success: true };
  try {
    let purchaseOrder = await db.CacaoPurchaseOrder.findOne({
      where: {
        id: purchaseOrderId,
        isdeleted: null,
      },
      attributes: [
        'id',
        'cacao_weight',
        'cacao_type',
        'perKgPrice',
        'purchasedAt',
        'moisture',
        'product_type',
        'premiumPrice',
        'dimitraCacaoPurchaseOrderId',
        'buyer',
      ],
      include: [
        {
          model: db.UnitsList,
          as: 'cacaoWeightUnit',
          attributes: ['name', 'abbvr', 'unitType', 'factor'],
          required: false,
        },
        {
          model: db.user,
          as: 'buyingStation',
          attributes: ['id', 'dimitraUserId'],
          required: true,
        },
        {
          model: db.CacaoVariety,
          as: 'cacaoVariety',
          attributes: ['name'],
          required: false,
        },
        {
          model: db.user,
          as: 'farmer',
          attributes: ['id', 'dimitraUserId', 'id_number', 'friendly_name'],
          required: true,
          where: {
            [Op.and]: [{ id_number: { [Op.not]: null } }, { id_number: { [Op.ne]: '' } }],
          },
          include: [
            {
              model: db.Membership,
              attributes: ['id'],
              as: 'user_membership',
              through: { attributes: [] },
              required: true,
              include: [
                {
                  model: db.UserRoleMembershipMap,
                  as: 'userRoleMembershipMap',
                  attributes: [],
                  required: true,
                  where: {
                    isDeleted: false,
                    user_role_id: { [Op.in]: FARMER_ROLES },
                  },
                },
                {
                  model: db.Organization,
                  as: 'org_assoc',
                  required: true,
                  where: {
                    isDeleted: false,
                    code: { [Op.in]: ORGANIZATION_CODES },
                  },
                  attributes: [],
                },
              ],
            },
          ],
        },
      ],
    });

    // Skip sending in following case
    if (
      !purchaseOrder ||
      purchaseOrder.farmer?.id_number === null ||
      typeof purchaseOrder.farmer?.id_number === 'undefined' ||
      purchaseOrder.farmer?.id_number.trim() === ''
    ) {
      return { success: true };
    }

    purchaseOrder = purchaseOrder.toJSON();

    const promises = [];
    if (!purchaseOrder.farmer.dimitraUserId || !purchaseOrder.farmer.friendly_name) {
      if (!purchaseOrder.farmer.dimitraUserId) {
        const dimitraUserId = uuid();
        purchaseOrder.farmer.dimitraUserId = dimitraUserId;
      }
      if (!purchaseOrder.farmer.friendly_name) {
        const friendlyName = await getUniqueFriendlyName();
        purchaseOrder.farmer.friendly_name = friendlyName;
      }
      promises.push(
        db.user.update(
          { dimitraUserId: purchaseOrder.farmer.dimitraUserId, friendly_name: purchaseOrder.farmer.friendly_name },
          { where: { id: purchaseOrder.farmer.id } }
        )
      );
    }

    if (!purchaseOrder.buyingStation.dimitraUserId) {
      const dimitraUserId = uuid();
      purchaseOrder.buyingStation.dimitraUserId = dimitraUserId;
      promises.push(db.user.update({ dimitraUserId }, { where: { id: purchaseOrder.buyingStation.id } }));
    }

    if (!purchaseOrder.dimitraCacaoPurchaseOrderId) {
      const dimitraCacaoPurchaseOrderId = uuid();
      purchaseOrder.dimitraCacaoPurchaseOrderId = dimitraCacaoPurchaseOrderId;
      promises.push(db.CacaoPurchaseOrder.update({ dimitraCacaoPurchaseOrderId }, { where: { id: purchaseOrder.id } }));
    }

    await Promise.all(promises);

    // Unit should be sent in gram
    if (purchaseOrder.cacao_weight !== null && !isNaN(Number(purchaseOrder.cacao_weight))) {
      if (purchaseOrder.cacaoWeightUnit) {
        if (purchaseOrder.cacaoWeightUnit.abbvr !== 'g') {
          if (purchaseOrder.cacaoWeightUnit.abbvr === 'kg') {
            // 1kg = 1000g
            purchaseOrder.cacao_weight *= 1000;
          } else if (purchaseOrder.cacaoWeightUnit.abbvr === 'lb') {
            // 1lb = 453.592g
            purchaseOrder.cacao_weight *= 453.592;
          } else {
            const preferredUnit = await db.UnitsList.findOne({
              where: {
                unitType: purchaseOrder.cacaoWeightUnit,
                name: { [Op.in]: ['gram', 'grams'] },
              },
            });
            purchaseOrder.cacao_weight =
              (purchaseOrder.cacao_weight * (purchaseOrder.cacaoWeightUnit.factor ?? 1)) / (preferredUnit.factor ?? 1);
          }
        }
      } else {
        // Default unit is kilogram
        // 1kg = 1000g
        purchaseOrder.cacao_weight *= 1000;
      }
    }

    const onChainData = getOnChainCacaoPurchaseOrderData(purchaseOrder);

    const res = await handleNewOnChainData('BATCH', purchaseOrder.id, onChainData, OCC_KOMODO_API_URLS.addBatchData);

    return { success: true, res, onChainData };
  } catch (error) {
    console.log(error);
    return { success: false, message: error.message };
  }
};

module.exports = {
  syncFarmerDataToOCC,
  syncCacaoPurchaseOrderDataToOCC,
  FARMER_ROLES,
  ORGANIZATION_CODES,
};
