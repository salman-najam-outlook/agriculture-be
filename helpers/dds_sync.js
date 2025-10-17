const Organization = require("../mongoose-models/Organization");
const User = require("../mongoose-models/User");
const { publishToQueue } = require("./rabbitmq/publish");
const {  notEmpty } = require(rootPath + "/helpers/general");

exports.syncUserData = async (userData, organizationData) => {
  const USER_QUEUE = process.env.USER_QUEUE || "user-queue";
  try {
    const payload = {
      cfUserId: userData.id,
      firstName: userData.firstName,
      organizationId: userData?.organization,
      subOrganizationId: userData?.subOrganizationId,
      lastName: userData.lastName,
      email: userData.email,
      mobile: userData.mobile,
      countryCode: userData.countryCode ? parseInt(userData.countryCode) : null,
      countryId: userData.countryId,
      countryIsoCode: userData.countryIsoCode,
      countryId: userData.countryId,
      role: userData.role,
      verified: userData.verified,
      address: userData.address,
      eoriNumber: userData.eori_number,
      licenseNumber: userData.licenseNumber,
      companyId: userData.companyId,
      language: userData.language,
      verified: userData.verified,
      address: userData.address,
      eoriNumber: userData.eori_number,
      profilePicUrl: userData.profilePicUrl,
      registrationUserType: userData?.registrationUserType,
      organization: {
        id: organizationData?.id,
        name: organizationData.name,
        code: organizationData.code,
        subOrganization:organizationData?.subOrganization,
        parentId: organizationData.parentId ?? null,
        isSubOrganization: organizationData.isSubOrganization ?? false, 
        primaryUserId: organizationData.primaryUserId ?? null,
        product: organizationData?.product ?? [],
        country: organizationData?.country ?? null,
        lincense_id: organizationData?.licenseId ?? null,
        logo: organizationData?.logo ?? null,
        accessment_reporturl: organizationData?.accessmentReportUrl ?? null,
      },
      active: userData.active,
      source: userData.source || 'saas_api_sync'
    };

    // Create a deep copy of the payload for DDS queue
    const ddsPayload = JSON.parse(JSON.stringify(payload));
    
    // sync user and organization in MongoDB;
    await syncUserOrgToMongoDB(payload, organizationData);

    await publishToQueue(USER_QUEUE, "dds-exchange", "user", ddsPayload);
    
  } catch (err) {
    console.error("Error Syncing user to dds", err.message);
  }
};

async function syncUserOrgToMongoDB(payload, organizationData){
  try {
    // Sync Organization
    const organization = await Organization.findOneAndUpdate(
      { cfOrgId: organizationData.id }, 
      {
        name: organizationData?.name,
        code: organizationData?.code,
        isSubOrganization: false,
        primaryUserId: organizationData?.primaryUserId,
        product: organizationData?.product,  
        country: organizationData?.country,
        lincense_id: organizationData?.licenseId,
        logo: organizationData?.logo,
        parentId: null,
        accessment_reporturl: organizationData?.accessmentReportUrl,
        cfOrgId: organizationData.id,
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    let subOrganizationModel = null;
    if(organizationData?.subOrganization){
       const subOrg = organizationData?.subOrganization;
       subOrganizationModel = await Organization.findOneAndUpdate(
        { cfOrgId: subOrg.id }, 
      {
        name: subOrg?.name,
        code: subOrg?.code,
        isSubOrganization: true,
        primaryUserId: subOrg?.primaryUserId,
        product: subOrg?.product ?? [],
        country: subOrg?.country ?? null,
        lincense_id: subOrg?.licenseId ?? null,
        logo: subOrg?.logo ?? null,
        accessment_reporturl: subOrg?.accessmentReportUrl ?? null,
        parentId: organization._id,
        cfOrgId: subOrg.id,
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
     );
    }

    if (!organization) {
      throw new Error('Failed to sync organization');
    }

    if(payload?.subOrganizationId && !subOrganizationModel) {
       subOrganizationModel = await Organization.findOne({
        cfOrgId: payload?.subOrganizationId
       });
    }

    if(subOrganizationModel) {
      payload.subOrganization = subOrganizationModel?._id;
    }

    payload.organization = organization._id;
 
    // Sync User
    const user = await User.findOneAndUpdate(
      { cfUserId: payload.cfUserId }, 
      payload,
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    if (!user) {
      throw new Error('Failed to sync user');
    }

    console.log('User and Organization synced successfully in MongoDB');
  } catch (error) {
    console.error('Error syncing user and organization to MongoDB:', error.message);
    throw error; 
  }
}

exports.syncFarmData = async (syncType, farmData, farmGeofence) => {
  const FARM_QUEUE = process.env.FARM_QUEUE || "farm-queue";
  try {
    const payload = {
      syncType: syncType,
      cfUserId: farmData.userId,
      cfFarmId: farmData.farmId,
      farmName: farmData.farmName,
      areaInAcre: farmData.areaInAcre,
      farmType: farmData.farmType,
      location: farmData.location,
      coordinates:
        farmGeofence && Array.isArray(farmGeofence) && notEmpty(farmGeofence)
          ? farmGeofence
              .filter((data) => !!data)
              .map((data) => {
                const { lat, log } = data;
                return {
                  latitude: lat,
                  longitude: log,
                };
              })
          : [],
      pointCoordinates: {
        centerLatitude: farmData.centerLatitude,
        centerLongitude: farmData.centerLongitude,
        radius: farmData.radius,
      },
    };
    await publishToQueue(FARM_QUEUE, "dds-exchange", "farm", payload);
  } catch (err) {
    console.log("Error Syncing farm to dds", err.message);
  }
};

// Sync user deletion to farmer service
exports.syncUserDeletion = async (userId, userData, isHardDelete = false) => {
  const USER_QUEUE = process.env.USER_QUEUE || "user-queue";
  try {
    const payload = {
      cfUserId: userId,
      email: userData.email,
      organization: {
        id: userData.org.id,
        name: userData.org.name,
        code: userData.org.code,
      },
      action: 'DELETE',
      hardDelete: isHardDelete,
      source: 'saas_api_delete'
    };



    // Delete from MongoDB
    await deleteUserFromMongoDB(userId, userData.org.id);

    // Publish deletion to queue
    await publishToQueue(USER_QUEUE, "dds-exchange", "user", payload);
    
    console.log(`User deletion synced successfully for userId: ${userId}`);
  } catch (err) {
    console.error("Error Syncing user deletion to dds", err.message);
    throw err;
  }
};

async function deleteUserFromMongoDB(userId, organizationId) {
  const { id, name, code } = organizationId;
  try {
    // Delete user from MongoDB
    const userResult = await User.findOneAndDelete({ cfUserId: userId });
    
    if (userResult) {
      console.log(`User deleted from MongoDB: ${userId}`);
    }

  } catch (error) {
    console.error('Error deleting user from MongoDB:', error.message);
    throw error;
  }
}

exports.syncUserDeactivation = async (userId, userData) => {
  const USER_QUEUE = process.env.USER_QUEUE || "user-queue";
  try {
    const organizationId = userData.organization;
    const { name, code } = userData.org;
    
    const payload = {
      cfUserId: userId,
      email: userData.email,
      organizationId: organizationId,
      organization: {
        name: name,
        code: code,
      },
      action: 'DEACTIVATE',
      active: false,
      source: 'saas_api_deactivate'
    };

    // Update user in MongoDB - only pass active status, not organization object
    await updateUserInMongoDB(userId, { active: false });

    // Publish deactivation to queue
    await publishToQueue(USER_QUEUE, "dds-exchange", "user", payload);
    
    console.log(`User deactivation synced successfully for userId: ${userId}`);
  } catch (err) {
    console.error("Error Syncing user deactivation to dds", err.message);
    throw err;
  }
};

exports.syncUserActivation = async (userId, userData) => {
  const USER_QUEUE = process.env.USER_QUEUE || "user-queue";
  try {
    const { id, name, code } = userData.organization;
    const payload = {
      email: userData.email,
      cfUserId: userId,
      organization: {
        id: id,
        name: name,
        code: code,
      },
      action: 'ACTIVATE',
      active: true,
      source: 'saas_api_activate'
    };

    // Update user in MongoDB
    await updateUserInMongoDB(userId, { active: true });

    // Publish activation to queue
    await publishToQueue(USER_QUEUE, "dds-exchange", "user", payload);
            
    console.log(`User activation synced successfully for userId: ${userId}`);
  } catch (err) {
    console.error("Error Syncing user activation to dds", err.message);
    throw err;
  }
};
exports.syncUserUpdate = async (userId, organizationData, updateData) => {
  const USER_QUEUE = process.env.USER_QUEUE || "user-queue";
  try {
    const { id, name, code } = organizationData;
    const filterNulls = (obj) => {
      const filtered = {};
      Object.keys(obj).forEach(key => {
        if (obj[key] !== null && obj[key] !== undefined) {
          filtered[key] = obj[key];
        }
      });
      return filtered;
    };

    const payload = {
      cfUserId: userId,
      organizationId: id,
      organization: {
        id: id || null,
        name: name || null,
        code: code || null,
      },
      action: 'UPDATE',
      source: 'saas_api_update',
      ...filterNulls(updateData)
    };

    // Handle organization object separately
    if (updateData.organization && typeof updateData.organization === 'object') {
      const filteredOrg = filterNulls(updateData.organization);
      if (Object.keys(filteredOrg).length > 0) {
        payload.organization = { ...payload.organization, ...filteredOrg };
      }
    }

    // Update user in MongoDB - only pass the actual update data, not organization object
    await updateUserInMongoDB(userId, updateData);

    // Publish update to queue
    await publishToQueue(USER_QUEUE, "dds-exchange", "user", payload);
    
    console.log(`User update synced successfully for userId: ${userId}`);
  } catch (err) {
    console.error("Error Syncing user update to dds", err.message);
    throw err;
  }
};

async function updateUserInMongoDB(userId, updateData) {
  try {
    // Filter out organization object if it exists, keep only the ID
    const filteredUpdateData = { ...updateData };
    if (filteredUpdateData.organization && typeof filteredUpdateData.organization === 'object') {
      // If organization is an object, extract just the ID
      filteredUpdateData.organization = filteredUpdateData.organization.id;
    }
    
    // Update user in MongoDB
    const userResult = await User.findOneAndUpdate(
      { cfUserId: userId }, 
      { $set: filteredUpdateData },
      { new: true }
    );
    
    if (userResult) {
      console.log(`User updated in MongoDB: ${userId}`);
    } else {
      console.log(`User not found in MongoDB for update: ${userId}`);
    }

  } catch (error) {
    console.error('Error updating user in MongoDB:', error.message);
    throw error;
  }
}
