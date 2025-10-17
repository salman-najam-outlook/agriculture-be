module.exports = {
  ORDER_IMG_UPLOAD_PATH: rootPath + "/upload/order-img/",
  // ORDER_IMG_URL: process.env.BASE_URL + "/api/animal/img/",
  ANIMAL_IMAGE_UPLOAD_PATH: rootPath + "/upload/animal-images/",
  ANIMAL_IMAGE_URL: process.env.BASE_URL + "/api/animal/img/",
  PROFILE_IMAGE_UPLOAD_PATH: rootPath + "/upload/profile-img/",
  PROFILE_IMAGE_URL: process.env.BASE_URL + "/api/user/profile/img/",
  IMPORT_USER_PATH: rootPath + "/upload/import-user/",
  IMPORT_USER_URL: process.env.BASE_URL + "/api/user/import/file/",
  WHITELIST_MIMETYPE: {
    images: ["image/jpeg", "image/png"],
    files: [
      "image/jpeg",
      "image/png",
      "text/plain",
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-excel",
      'text/csv',
      "video/mp4",
      "video/webm",
      "application/geo+json"
    ],
    treeBulkUploadFiles:[ 
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-excel",
      'text/csv',
      "application/geo+json",
      'application/octet-stream'
  ],
    none: [],
  },

  ACTION: {
    ANIMAL_REGISTERED: {
      action: "ANIMAL_REGISTERED",
      activity: "Animal registered",
    },
    ANIMAL_IMG_UPDATE: {
      action: "ANIMAL_IMG_UPDATE",
      activity: "Animal image updated",
    },
    ANIMAL_DETAILS_UPDATED: {
      action: "ANIMAL_DETAILS_UPDATED",
      activity: "Animal details updated",
    },
    ANIMAL_CONCEPTION_ADDED: {
      action: "ANIMAL_CONCEPTION_ADDED",
      activity: "Animal conception added",
    },
    ANIMAL_PERFORMANCE_ADDED: {
      action: "ANIMAL_PERFORMANCE_ADDED",
      activity: "Animal performance added",
    },
    HEALTH_RECORD_REGISTERED: {
      action: "HEALTH_RECORD_REGISTERED",
      activity: "health record registered",
    },
    HEALTH_RECORD_UPDATED: {
      action: "HEALTH_RECORD_UPDATED",
      activity: "health record updated",
    },
    FAILED_ATTEMPT: {
      action: "FAILED_ATTEMPT",
      activity: "Failed attempt for modification",
    },
    GENEBANK_REG: {
      action: "GENEBANK_REG",
      activity: "gene bank registered",
    },
    GENETICWORTH_REG: {
      action: "GENETICWORTH_REG",
      activity: "genetic worth registered",
    },
    GENETICWORTH_UPDATE: {
      action: "GENETICWORTH_UPDATE",
      activity: "genetic worth updated",
    },
    GENO_TYPE_PERFORMANCE_ADDED: {
      action: "GENO_TYPE_PERFORMANCE_ADDED",
      activity: "Geno type performance registered"
    },
    GENOTYPE_REG: {
      action: "GENOTYPE_REG",
      activity: "genotype registered",
    },
    GENOTYPE_UPDATE: {
      action: "GENOTYPE_UPDATE",
      activity: "genotype updated",
    },
    NOTE_REG: {
      action: "NOTE_REG",
      activity: "note added for animal",
    },
    ANIMAL_PERFORMANCE_REG: {
      action: "ANIMAL_PERFORMANCE_REG",
      activity: "animal performance registered",
    },
    ANIMAL_PERFORMANCE_UPDATE: {
      action: "ANIMAL_PERFORMANCE_UPDATE",
      activity: "animal performance updated",
    },
    FEED_ADDED: {
      action: "FEED_ADDED",
      activity: "animal feed information added",
    },
    FEED_UPDATED: {
      action: "FEED_UPDATED",
      activity: "animal feed information updated",
    },
    NOTE_UPDATE: {
      action: "NOTE_UPDATE",
      activity: "animal note updated",
    },
    SEMEN_AUTOMATION_ADDED: {
      action: "SEMEN_AUTOMATION_ADDED",
      activity: "semen automation registered",
    },
    USER_REG: {
      action: "USER_REG",
      activity: "user registered",
    },
    USER_LOGIN: {
      action: "USER_LOGIN",
      activity: "user logged in",
    },
    USER_SETTING_UPDATED: {
      action: "USER_SETTING_UPDATED",
      activity: "user setting updated",
    },
    USER_EMAIL_VALIDATION: {
      action: "USER_EMAIL_VALIDATION",
      activity: "user email validation",
    },
    USER_EMAIL_VALIDATION_ERROR: {
      action: "USER_EMAIL_VALIDATION_ERROR",
      activity: "user email already exists for validation",
    },
    USER_DETAILS_UPDATE: {
      action: "USER_DETAILS_UPDATE",
      activity: "user details updated",
    },
    ROLE_ADDED: {
      action: "ROLE_ADDED",
      activity: "new role is added",
    },
    ROLE_UPDATE: {
      action: "ROLE_UPDATE",
      activity: "role details updated",
    },
    DEPT_ADDED: {
      action: "DEPT_ADDED",
      activity: "new department is added",
    },
    DEPT_UPDATE: {
      action: "DEPT_UPDATE",
      activity: "department details updated",
    },
    PERMISSION_UPDATE: {
      action: "PERMISSION_UPDATE",
      activity: "modules permission updated",
    },
    USER_IMPORT: {
      action: "USER_IMPORT",
      activity: "user import file uploaded",
    },
    USER_GENETICS_IMPORT: {
      action: "USER_GENETICS_IMPORT",
      activity: "user genetics import file uploaded",
    },
    IMPORT_FILE_DELETED: {
      action: "IMPORT_FILE_DELETED",
      activity: "import file deleted",
    },
    FARM_REG: {
      action: "FARM_REG",
      activity: "new farm is registered",
    },
    FARM_UPDATED: {
      action: "FARM_UPDATED",
      activity: "farm details updated",
    },
    DRUG_INV_REG: {
      action: "DRUG_INV_REG",
      activity: "drug added in inventory",
    },
    DRUG_INV_UPDATED: {
      action: "DRUG_INV_UPDATED",
      activity: "drug inventory updated",
    },
    DRUG_INV_DEL: {
      action: "DRUG_INV_DEL",
      activity: "drug deleted",
    },
    PROD_REG: {
      action: "PROD_REG",
      activity: "product registered",
    },
    PROD_UPDATE: {
      action: "PROD_UPDATE",
      activity: "product details updated",
    },
    ORDER_ADDED: {
      action: "ORDER_ADDED",
      activity: "order added",
    },
    ORDER_STATUS_UPDATED: {
      action: "ORDER_STATUS_UPDATED",
      activity: "order status updated",
    },
    INSEMINATOR_STATISTIC_REG: {
      action: "INSEMINATOR_STATISTIC_REG",
      activity: "inseminator statistic registered",
    },
    INSEMINATOR_STATISTIC_UPDATED: {
      action: "INSEMINATOR_STATISTIC_UPDATED",
      activity: "inseminator statistic updated",
    },
    TASK_ADDED: {
      action: "TASK_ADDED",
      activity: "new task added",
    },
    TASK_UPDATED: {
      action: "TASK_UPDATED",
      activity: "task details updated",
    },
    TASK_DELETED: {
      action: "TASK_DELETED",
      activity: "task deleted",
    },
    HEALTH_RECORD_SUBMITTED: {
      action: "HEALTH_RECORD_SUBMITTED",
      activity: "health record submitted",
    },
    INSEMINATION_RECORD_SUBMITTED: {
      action: "INSEMINATION_RECORD_SUBMITTED",
      activity: "insemination record submitted",
    },
    SA_APPROVAL_REG: {
      action: "SA_APPROVAL_REG",
      activity: "semen automation approval registered",
    },
    SA_APPROVAL_UPDATED: {
      action: "SA_APPROVAL_UPDATED",
      activity: "semen automation approval updated",
    },
    SA_SIRE_REG: {
      action: "SA_SIRE_REG",
      activity: "semen automation sire registered",
    },
    SA_SIRE_UPDATED: {
      action: "SA_SIRE_UPDATED",
      activity: "semen automation sire updated",
    },
    SA_COLLECTION_REG: {
      action: "SA_COLLECTION_REG",
      activity: "semen automation collection registered",
    },
    SA_COLLECTION_UPDATED: {
      action: "SA_COLLECTION_UPDATED",
      activity: "semen automation collection updated",
    },
    SA_STRAW_REG: {
      action: "SA_STRAW_REG",
      activity: "semen automation straw registered",
    },
    SA_STRAW_UPDATED: {
      action: "SA_STRAW_UPDATED",
      activity: "semen automation straw updated",
    },
    SA_PACK_REG: {
      action: "SA_PACK_REG",
      activity: "semen automation PACK registered",
    },
    SA_PACK_UPDATED: {
      action: "SA_PACK_UPDATED",
      activity: "semen automation PACK updated",
    },
    SA_POSTAGE_REG: {
      action: "SA_POSTAGE_REG",
      activity: "semen automation POSTAGE registered",
    },
    SA_POSTAGE_UPDATED: {
      action: "SA_POSTAGE_UPDATED",
      activity: "semen automation POSTAGE updated",
    },
    PROD_STOCK_ADDED: {
      action: "PROD_STOCK_ADDED",
      activity: "product stock added",
    },
    PROFILE_UPDATED: {
      action: "PROFILE_UPDATED",
      activity: "profile details updated",
    },
    PROFILE_PIC_UPDATED: {
      action: "PROFILE_PIC_UPDATED",
      activity: "profile pic updated",
    },
    PASSWORD_CHANGED: {
      action: "PASSWORD_CHANGED",
      activity: "user password changed",
    },
  },
  LBS_TO_KGS: 0.45359237,
  ANALYTIC_SUBSCRIBER_EMAILS: [
    'amit@dimitra.io',
    'raunak@dimitra.io',
    'saphal@dimitra.io',
    'peterthor@dimitra.io',
    'jon@dimitra.io',
    'diego@dimitra.io',
    'aashish.giri@dimitra.io',
    'anup@dimitra.io',
    'sandesh@dimitra.io',
  ],
};
