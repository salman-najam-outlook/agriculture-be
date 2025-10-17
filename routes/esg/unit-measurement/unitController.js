const express = require("express");
const router = express.Router();
const { success, error } = require(rootPath + "/helpers/language");
const { logErrorOccurred } = require(rootPath + "/helpers/general");
const { successResp, serverError, successRespSync, errorResp } = require(rootPath + "/helpers/api");
const Unit = require(rootPath + "/mongoose-models/unit-measurement/unitList.js"); // Updated schema reference
const UnitCategory = require(rootPath + "/mongoose-models/unit-measurement/categories.js");

/**
 * Get all Units - GET
 */
router.get("/", async (req, res) => {
    try {
        const units = await Unit.find({ deletedAt: null }).populate("unit_category");
        return res.status(200).json(
            await successRespSync({
                msg: success.UNIT_LIST_LIST,
                data: units,
                statusCode: 200,
            })
        );
    } catch (err) {
        logErrorOccurred(__filename, err);
        return serverError(res, err);
    }
});

/**
 * Create a new Unit - POST
 */
router.post("/", async (req, res) => {
    try {
        const unit = new Unit(req.body);
        await unit.save();
        return res.status(201).json(
            await successRespSync({
                msg: success.UNIT_LIST_ADDED,
                data: unit,
                statusCode: 201,
            })
        );
    } catch (err) {
        logErrorOccurred(__filename, err);
        return serverError(res, err);
    }
});

/**
 * Bulk Upload Unit Categories - POST
 */
router.post("/bulk", async (req, res) => {
    try {
        if ((!Array.isArray(req.body)) || req.body.length === 0) {
            return res.status(404).json(
                await errorResp({ msg: error.INVALID_INPUT, code: 404 })
            );
        }
        const reviseUnit = []
        for(let item of req.body){
            console.log(item.saas_id)
            const category = await UnitCategory.findOne({ saas_id: item.saas_id, deletedAt: null });
            if(!category){
                continue
            }
            reviseUnit.push({
               ...item,
               unit_category:category._id
            })
          }
          //console.log(item.saas_id)
        const newUnitLists = await Unit.insertMany(reviseUnit);
        return res.status(201).json(
            await successRespSync({
                msg: success.UNIT_LIST_ADDED,
                data: newUnitLists,
                statusCode: 201,
            })
        );
    } catch (err) {
        logErrorOccurred(__filename, err);
        return serverError(res, err);
    }
});

/**
 * Get a Single Unit by ID - GET
 */
router.get("/:unitId", async (req, res) => {
    try {
        const unit = await Unit.findOne({ _id: req.params.unitId, deletedAt: null }).populate("unit_category");
        if (!unit) {
            return res.status(404).json(
                await errorResp({ msg: error.NOT_FOUND, code: 404 })
            );
        }
        return res.status(200).json(
            await successRespSync({
                msg: success.UNIT_LIST,
                data: unit,
                statusCode: 200,
            })
        );
    } catch (err) {
        logErrorOccurred(__filename, err);
        return serverError(res, err);
    }
});

/**
 * Update a Unit - PUT
 */
router.put("/:unitId", async (req, res) => {
    try {
        const updatedUnit = await Unit.findByIdAndUpdate(req.params.unitId, req.body, {
            new: true,
            runValidators: true,
        }).populate("unit_category");
        
        if (!updatedUnit) {
            return res.status(404).json(
                await errorResp({ msg: error.NOT_FOUND, code: 404 })
            );
        }
        return res.status(200).json(
            await successRespSync({
                msg: success.UNIT_LIST_UPDATED,
                data: updatedUnit,
                statusCode: 200,
            })
        );
    } catch (err) {
        logErrorOccurred(__filename, err);
        return serverError(res, err);
    }
});

/**
 * Soft Delete a Unit - DELETE
 */
router.delete("/:unitId", async (req, res) => {
    try {
        const deletedUnit = await Unit.findByIdAndUpdate(
            req.params.unitId,
            { deletedAt: new Date() },
            { new: true }
        );
        if (!deletedUnit) {
            return res.status(404).json(
                await errorResp({ msg: error.NOT_FOUND, code: 404 })
            );
        }
        return res.status(200).json(
            await successRespSync({
                msg: success.UNIT_LIST_DELETED,
                data: deletedUnit,
                statusCode: 200,
            })
        );
    } catch (err) {
        logErrorOccurred(__filename, err);
        return serverError(res, err);
    }
});

module.exports = router;
