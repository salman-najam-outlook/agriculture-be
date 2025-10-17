const { Op } = require("sequelize");

// Create an RWA Tree entry
const db = require(rootPath + "/models");
const { logErrorOccurred } = require(rootPath + "/helpers/general");
const { v4: uuidv4 } = require("uuid");

const createMyTree = async (req) => {
  const {
    tree_id_by_user,
    additional_id,
    farm_id,
    zone_id,
    lat,
    lon,
    location_information,
    tree_type_id,
    tree_species_id,
    date_planted,
    health_condition,
    program_type,
    additional_note,
    recordId,
    images,
  } = req.body;

  const generatedFileUrl = await images?.map((a) => {
    return {
      location: `${
        process.env.PUBLIC_BUCKET_URL ||
        "https://dimitra-public-images.s3.amazonaws.com/"
      }${a.s3_key}`,
    };
  });

  // user_id is the user who is creating the tree
  const user_id = req.user.id;

  let transaction = await db.sequelize.transaction();

  try {
    const newTree = await db.MyTree.create(
      {
        uuid: uuidv4(),
        user_id,
        tree_id_by_user,
        additional_id,
        farm_id,
        zone_id,
        lat,
        lon,
        location_information,
        tree_type_id,
        tree_species_id,
        date_planted,
        health_condition,
        program_type,
        additional_note,
        recordId
      },
      { transaction }
    );

    if (images && images.length > 0) {
      const imageEntries = images.map((image,index) => ({
        my_tree_id: newTree.id,
        file_url: generatedFileUrl[index].location,
        s3_key: image.s3_key,
      }));

      await db.MyTreeImages.bulkCreate(imageEntries, { transaction });
    }

    await transaction.commit();

    return {
      success: true,
      data: newTree,
    };
  } catch (error) {
    await transaction.rollback();
    console.error("Error while creating tree:", error);

    return {
      success: false,
      message: "An error occurred while creating the tree.",
      error: error.message,
    };
  }
};

// create bulk my tree
const createBulkMyTree = async (req) => {
  const trees = req.body.trees; // Assuming the payload contains an array of trees under the key 'trees'

  // user_id is the user who is creating the tree
  const user_id = req.user.id;

  let transaction = await db.sequelize.transaction();

  try {
    const createdTrees = [];

    for (const treeData of trees) {
      const {
        tree_id_by_user,
        additional_id,
        uuid,
        farm_id,
        zone_id,
        lat,
        lon,
        location_information,
        tree_type_id,
        tree_species_id,
        date_planted,
        health_condition,
        program_type,
        additional_note,
        recordId,
        images,
      } = treeData;

      // generate file url
      const generatedFileUrl = await images?.map((a) => {
        return {
          location: `${
            process.env.PUBLIC_BUCKET_URL ||
            "https://dimitra-public-images.s3.amazonaws.com/"
          }${a.s3_key}`,
        };
      });

      const newTree = await db.MyTree.create(
        {
          user_id,
          tree_id_by_user,
          additional_id,
          uuid,
          farm_id,
          zone_id,
          lat,
          lon,
          location_information,
          tree_type_id,
          tree_species_id,
          date_planted,
          health_condition,
          program_type,
          additional_note,
          recordId
        },
        { transaction }
      );

      if (images && images.length > 0) {
        const imageEntries = images.map((image,index) => ({
          my_tree_id: newTree.id,
          file_url: generatedFileUrl[index].location,
          s3_key: image.s3_key,
        }));

        await db.MyTreeImages.bulkCreate(imageEntries, { transaction });
      }

      createdTrees.push(newTree);
    }

    await transaction.commit();

    return {
      success: true,
      message: "Trees created successfully.",
      data: createdTrees,
    };
  } catch (error) {
    await transaction.rollback();
    console.error("Error while creating trees:", error);

    return {
      success: false,
      message: "An error occurred while creating the trees.",
      error: error.message,
    };
  }
};

// update by using PATCH Request
const updateMyTree = async (req) => {
  const {
    id,
    tree_id_by_user, // dimitra ID
    additional_id,
    farm_id,
    zone_id,
    lat,
    lon,
    location_information,
    tree_type,
    tree_species,
    date_planted,
    health_condition,
    program_type,
    additional_note,
    images,
  } = req.body;

  try {
    const tree = await db.MyTree.findByPk(id);

    if (!tree) {
      return {
        success: false,
        message: "Tree not found",
      };
    } else {
      tree.tree_id_by_user = tree_id_by_user || tree.tree_id_by_user;
      tree.additional_id = additional_id || tree.additional_id;
      tree.farm_id = farm_id || tree.farm_id;
      tree.zone_id = zone_id || tree.zone_id;
      tree.lat = lat || tree.lat;
      tree.lon = lon || tree.lon;
      tree.location_information =
        location_information || tree.location_information;
      tree.tree_type = tree_type || tree.tree_type;
      tree.tree_species = tree_species || tree.tree_species;
      tree.date_planted = date_planted || tree.date_planted;
      tree.health_condition = health_condition || tree.health_condition;
      tree.program_type = program_type || tree.program_type;
      tree.additional_note = additional_note || tree.additional_note;

      await tree.save();

      if (images && images.length > 0) {
        const imageEntries = images.map((image) => ({
          my_tree_id: tree.id,
          file_url: image.file_url,
          s3_key: image.s3_key,
        }));

        await db.MyTreeImages.bulkCreate(imageEntries);
      }

      return {
        success: true,
        message: "Tree updated successfully",
      };
    }
  } catch (error) {
    console.error("Error while updating tree:", error);
    return {
      success: false,
      message: "An error occurred while updating the tree.",
      error: error.message,
    };
  }
};

// update by using PUT request as well as create a new history entry with the past tree data
const updateMyTreeAndHistory = async (req) => {
  const {
    uuid,
    tree_id_by_user,
    additional_id,
    farm_id,
    zone_id,
    lat,
    lon,
    location_information,
    tree_type_id,
    tree_species_id,
    date_planted,
    health_condition,
    program_type,
    additional_note,
    recordId,
    images,
  } = req.body;

  // user_id is the user who is creating the tree
  const user_id = req.user.id;

  let transaction;

  try {
    transaction = await db.sequelize.transaction();

    const  id = req.params.id;

    const tree = await db.MyTree.findByPk(id, { transaction });

    if (!tree) {
      return {
        success: false,
        message: "Tree not found",
      };
    }

    // generated file url 
    const generatedFileUrl = await images?.map((a) => {
      return {
        location: `${
          process.env.PUBLIC_BUCKET_URL ||
          "https://dimitra-public-images.s3.amazonaws.com/"
        }${a.s3_key}`,
      };
    });

    // Create a history entry with the past tree data
    const historyEntry = await db.MyTreeHistory.create(
      {
        user_id,
        uuid: tree.uuid,
        tree_id_by_user: tree.tree_id_by_user,
        additional_id: tree.additional_id,
        farm_id: tree.farm_id,
        zone_id: tree.zone_id,
        lat: tree.lat,
        lon: tree.lon,
        location_information: tree.location_information,
        tree_type_id: tree.tree_type_id,
        tree_species_id: tree.tree_species_id,
        date_planted: tree.date_planted,
        health_condition: tree.health_condition,
        program_type: tree.program_type,
        additional_note: tree.additional_note,
        recordId: tree.recordId
      },
      { transaction }
    );

    // Associate existing images with the history entry
    const existingImages = await db.MyTreeImages.findAll({
      where: { my_tree_id: id },
      transaction,
    });

    const historyImageEntries = existingImages.map((image) => ({
      my_tree_history_id: historyEntry.id,
      file_url: image.file_url,
      s3_key: image.s3_key,
    }));

    await db.MyTreeImages.bulkCreate(historyImageEntries, { transaction });

    // Update the tree with the latest data
    await tree.update(
      {
        user_id,
        tree_id_by_user,
        uuid,
        additional_id,
        farm_id,
        zone_id,
        lat,
        lon,
        location_information,
        tree_type_id,
        tree_species_id,
        date_planted,
        health_condition,
        program_type,
        additional_note,
        recordId
      },
      { transaction }
    );

    // Update the images if provided
    if (images && images.length > 0) {
      // Delete existing images
      await db.MyTreeImages.destroy({ where: { my_tree_id: id }, transaction });

      // Create new images
      const imageEntries = images.map((image,index) => ({
        my_tree_id: id,
        file_url: generatedFileUrl[index].location,
        s3_key: image.s3_key,
      }));

      await db.MyTreeImages.bulkCreate(imageEntries, { transaction });
    }

    await transaction.commit();

    return {
      success: true,
      message: "Tree updated successfully",
    };
  } catch (error) {
    if (transaction) await transaction.rollback();
    console.error("Error while updating tree:", error);
    return {
      success: false,
      message: "An error occurred while updating the tree.",
      error: error.message,
    };
  }
};

// delete a tree by ID
const deleteMyTree = async (req) => {
  const Id = req.params.id;

  try {
    const tree = await db.MyTree.findByPk(Id);

    if (!tree) {
      return {
        success: false,
        message: "Tree not found",
      };
    } else {
      await tree.destroy();
      return {
        success: true,
        message: "Tree deleted successfully",
      };
    }
  } catch (error) {
    console.error("Error while deleting tree:", error);
    return {
      success: false,
      message: "An error occurred while deleting the tree.",
      error: error.message,
    };
  }
};

// Find a tree by user-defined ID
const findMyTreeById = async (req) => {
  const { id } = req.params;
  try {
    const tree = await db.MyTree.findByPk(id);
    return tree;
  } catch (error) {
    console.error("Sequelize Error:", error);
    logErrorOccurred(__filename, error);
    throw error;
  }
};

// Find all trees with pagination and search
const findAllMyTrees = async (req) => {
  const {
    page = 1,
    limit = 10,
    search,
    tree_id_by_user,
    tree_id,
    farm_id,
    zone_id,
    date_planted_from,
    date_planted_to,
    farmName,
    zoneName
  } = req.query;
  const offset = (page - 1) * limit;
  const user_id = req.user.id;
  const whereClause = { user_id };

  const addFilterCondition = (
    whereClause,
    condition,
    field,
    operator = Op.like
  ) => {
    if (condition) {
      whereClause[field] = { [operator]: `%${condition}%` };
    }
  };

  addFilterCondition(whereClause, tree_id_by_user, "tree_id_by_user");
  addFilterCondition(whereClause, tree_id, "id");
  addFilterCondition(whereClause, farm_id, "farm_id", Op.eq);
  addFilterCondition(whereClause, zone_id, "zone_id", Op.eq);

  if (date_planted_from || date_planted_to) {
    whereClause.date_planted = {};

    if (date_planted_from) {
      whereClause.date_planted[Op.gte] = new Date(date_planted_from);
    }

    if (date_planted_to) {
      whereClause.date_planted[Op.lte] = new Date(date_planted_to);
    }
  }

  if (search) {
    const searchArr = search.split(" ");
    const fields = [
      "location_information",
      "tree_id_by_user",
      "id",
      "farm_id",
      "zone_id",
    ];
    const searchQuery = fields
      .map((col) => {
        return searchArr.map((word) => {
          return {
            [col]: {
              [Op.like]: `%${word}%`,
            },
          };
        });
      })
      .flat();

    whereClause[Op.or] = [...searchQuery];
  }

  const include = [
    {
      model: db.MyTreeImages,
      as: "my_tree_images",
      attributes: [
        "id",
        "file_url",
        "s3_key",
        "my_tree_id",
        "my_tree_history_id",
      ],
    },
    {
      model: db.TreeType,
      as: "treeType",
      attributes: ["id", "name"],
    },
    {
      model: db.TreeSpecies,
      as: "treeSpecies",
      attributes: ["id", "name", "tree_type_id"],
    },
    {
      model: db.Option,
      as: "healthCondition",
      attributes: ["id", "name", "groupName"],
    },
    {
      model: db.user_farm,
      as: "farm",
      attributes: ["id", "farmName"],
      // required: true,
      // where: farmName ? { farmName: { [Op.like]: `%${farmName}%` } } : undefined,
    },
    {
      model: db.Geofence,
      as: "zone",
      attributes: ["id", "geofenceName"],
      // required: true,
      // where: zoneName ? { geofenceName: { [Op.like]: `%${zoneName}%` } } : undefined,
    },
  ];

  try {
    const { count, rows: trees } = await db.MyTree.findAndCountAll({
      where: whereClause,
      include,
      distinct: true,
      order: [["id", "ASC"]],
      limit: parseInt(limit),
      offset: parseInt(offset),
    });

    // Fetch program_type options for each tree
    const programTypeIds = trees.flatMap((tree) => tree.program_type || []);

    const programTypeOptions = await db.Option.findAll({
      where: {
        id: {
          [Op.in]: programTypeIds,
        },
      },
      attributes: ["id", "name", "groupName"],
    });

    // Map program_type options to each tree
    const programTypeMap = programTypeOptions.reduce((acc, option) => {
      acc[option.id] = option;
      return acc;
    }, {});

    const treesWithProgramType = trees.map((tree) => {
      const programTypeDetails = (tree.program_type || []).map(
        (id) => programTypeMap[id]
      );
      return {
        ...tree.toJSON(),
        program_type: programTypeDetails,
      };
    });

    return {
      trees: treesWithProgramType,
      total: count,
      filters: {
        tree_id_by_user,
        farm_id,
        zone_id,
        date_planted_from,
        date_planted_to,
      },
    };
  } catch (error) {
    console.error("Sequelize Error:", error);
    logErrorOccurred(__filename, error);
    throw error;
  }
};

// Find all images for a tree
const findAllMyTreesImages = async (req) => {
  try {
    const { id, type } = req.body;
    const whereClause = {};

    if (type === "tree") {
      whereClause.my_tree_id = id;
    } else if (type === "history") {
      whereClause.my_tree_history_id = id;
    } else {
      throw new Error("Invalid type specified");
    }

    const result = await db.MyTreeImages.findAll({
      where: whereClause,
    });

    return result;
  } catch (error) {
    console.error("Sequelize Error:", error);
    logErrorOccurred(__filename, error);
    throw error;
  }
};

const findAllMyTreesHistory = async (req) => {
  const user_id = req.user.id;
  const whereClause = { user_id };
  try {
    const { count, rows: treesHistory } =
      await db.MyTreeHistory.findAndCountAll({
        include: [
          {
            model: db.MyTreeImages,
            as: "my_tree_images",
            attributes: [
              "id",
              "file_url",
              "s3_key",
              "my_tree_id",
              "my_tree_history_id",
            ],
          },
          {
            model: db.TreeType,
            as: "treeType",
            attributes: ["id", "name"],
          },
          {
            model: db.TreeSpecies,
            as: "treeSpecies",
            attributes: ["id", "name", "tree_type_id"],
          },
          {
            model: db.Option,
            as: "healthCondition",
            attributes: ["id", "name", "groupName"],
          },
        ],
        where: whereClause,
        order: [["id", "ASC"]],
        distinct: true,
        attributes: [
          "id",
          "user_id",
          "tree_id_by_user",
          "additional_id",
          "lat",
          "lon",
          "location_information",
          "tree_type_id",
          "tree_species_id",
          "date_planted",
          "health_condition",
          "program_type",
          "additional_note",
          "created_at",
          "updated_at",
        ],
      });

    // Fetch program_type options for each tree history
    const programTypeIds = treesHistory.flatMap(
      (tree) => tree.program_type || []
    );

    const programTypeOptions = await db.Option.findAll({
      where: {
        id: {
          [Op.in]: programTypeIds,
        },
      },
      attributes: ["id", "name", "groupName"],
    });

    // Map program_type options to each tree history
    const programTypeMap = programTypeOptions.reduce((acc, option) => {
      acc[option.id] = option;
      return acc;
    }, {});

    const treesHistoryWithProgramType = treesHistory.map((tree) => {
      const programTypeDetails = (tree.program_type || []).map(
        (id) => programTypeMap[id]
      );
      return {
        ...tree.toJSON(),
        program_type: programTypeDetails,
      };
    });

    return { trees: treesHistoryWithProgramType, total: count };
  } catch (error) {
    console.error("Sequelize Error:", error);
    logErrorOccurred(__filename, error);
    throw error;
  }
};

// Find a tree history by tree_id_by_user (unique)
const findMyTreeHistoryByTreeId = async (req) => {
  const id = req.params.id;
  try {
    const tree = await db.MyTreeHistory.findAndCountAll({
       include: [
          {
            model: db.MyTreeImages,
            as: "my_tree_images",
            attributes: [
              "id",
              "file_url",
              "s3_key",
              "my_tree_id",
              "my_tree_history_id",
            ],
          },
          {
            model: db.TreeType,
            as: "treeType",
            attributes: ["id", "name"],
          },
          {
            model: db.TreeSpecies,
            as: "treeSpecies",
            attributes: ["id", "name", "tree_type_id"],
          },
          {
            model: db.Option,
            as: "healthCondition",
            attributes: ["id", "name", "groupName"],
          },
        ],
      where: { tree_id_by_user: id },
      order: [["id", "ASC"]],
      attributes: [
        "id",
        "tree_id_by_user",
        "additional_id",
        "lat",
        "lon",
        "location_information",
        "tree_type_id",
        "tree_species_id",
        "date_planted",
        "health_condition",
        "program_type",
        "additional_note",
        "created_at",
        "updated_at",
      ],
    });
    return tree;
  } catch (error) {
    console.error("Sequelize Error:", error);
    logErrorOccurred(__filename, error);
    throw error;
  }
};

// find all the dropdown values like tree type, tree species, health condition, program type
const findAllDropdownValues = async () => {
  try {
    const treeTypes = await db.TreeType.findAll({
      attributes: ["id", "name"],
    });

    const treeSpecies = await db.TreeSpecies.findAll({
      attributes: ["id", "name", "tree_type_id"],
    });

    const healthConditions = await db.Option.findAll({
      where: { groupName: "health-condition",
        userId: null,
       },
       attributes: ["id", "name"],
    });

    const programTypes = await db.Option.findAll({
      where: { groupName: "program-type",
        userId: null,
       },
       attributes: ["id", "name"],
    });

    return {
      treeTypes,
      treeSpecies,
      healthConditions,
      programTypes,
    };
  } catch (error) {
    console.error("Sequelize Error:", error);
    logErrorOccurred(__filename, error);
    throw error;
  }
};

// upload images of tree
const generatePreSignedUrl = async (req, res) => {
  try {
    const { objectName, mimeType, isPrivate, action, moduleName } = req.body;
    const bucket = isPrivate
      ? process.env.AWS_PRIVATE_BUCKET
      : process.env.AWS_PUBLIC_BUCKET;
    const params = {
      Bucket: bucket,
      Key: `${moduleName}/${req.user.id}/${objectName}`,
      Expires: 60 * 60,
    };
    if (action === "put") params.ContentType = mimeType;
    const url =
      action === "put"
        ? await getSignedURL("putObject", params)
        : await getSignedURL("getObject", params);
    return url;
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
};

// Test endpoint logic
const test = async (req, res) => {
  res.json({ message: "API is working. Because God wants it to be." });
};

module.exports = {
  createMyTree,
  updateMyTree,
  test,
  findMyTreeById,
  findAllMyTrees,
  findAllMyTreesImages,
  createBulkMyTree,
  deleteMyTree,
  updateMyTreeAndHistory,
  findAllMyTreesHistory,
  findMyTreeHistoryByTreeId,
  findAllDropdownValues,
  generatePreSignedUrl,
};