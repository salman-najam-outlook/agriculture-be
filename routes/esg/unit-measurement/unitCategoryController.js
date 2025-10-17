const express = require("express");
const router = express.Router();
const { success, error } = require(rootPath + "/helpers/language");
const { logErrorOccurred } = require(rootPath + "/helpers/general");
const { successResp, serverError, successRespSync, errorResp } = require(rootPath + "/helpers/api");
const UnitCategory = require(rootPath + "/mongoose-models/unit-measurement/categories.js");

/**
 * Unit categories - GET all
 */
router.get("/", async (req, res) => {
    try {
        const unitCategories = await UnitCategory.find({ deletedAt: null });
        return res.status(200).json(
            await successRespSync({
                msg: success.UNIT_CATEGORY_LIST,
                data: unitCategories,
                statusCode: 200,
            })
        );
    } catch (err) {
        logErrorOccurred(__filename, err);
        return serverError(res, err);
    }
});

/**
 * Create Unit Category - POST
 */
router.post("/", async (req, res) => {
    try {
        const newCategory = new UnitCategory(req.body);
        await newCategory.save();
        return res.status(201).json(
            await successRespSync({
                msg: success.UNIT_CATEGORY_ADDED,
                data: newCategory,
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
    console.log(req.body)
    try {
        if (!Array.isArray(req.body) || req.body.length === 0) {
            return res.status(400).json(
                await errorResp({ msg: error.INVALID_INPUT, code: 400 })
            );
        }
        console.log(req.body)
        const newCategories = await UnitCategory.insertMany(req.body);
        return res.status(201).json(
            await successRespSync({
                msg: success.UNIT_LIST_LIST,
                data: newCategories,
                statusCode: 201,
            })
        );
    } catch (err) {
        logErrorOccurred(__filename, err);
        return serverError(res, err);
    }
});

/**
 * Get Single Unit Category by ID - GET
 */
router.get("/:unitCategoryId", async (req, res) => {
    try {
        const category = await UnitCategory.findOne({ _id: req.params.unitCategoryId, deletedAt: null });
        if (!category) {
            return res.status(404).json(
                await errorResp({ msg: error.NOT_FOUND, code: 404 })
            );
        }
        return res.status(200).json(
            await successRespSync({
                msg: success.UNIT_CATEGORY,
                data: category,
                statusCode: 200,
            })
        );
    } catch (err) {
        logErrorOccurred(__filename, err);
        return serverError(res, err);
    }
});

/**
 * Update Unit Category - PUT
 */
router.put("/:unitCategoryId", async (req, res) => {
    try {
        const updatedCategory = await UnitCategory.findByIdAndUpdate(req.params.unitCategoryId, req.body, {
            new: true,
            runValidators: true,
        });
        if (!updatedCategory) {
            return res.status(404).json(
                await errorResp({ msg: error.NOT_FOUND, code: 404 })
            );
        }
        return res.status(200).json(
            await successRespSync({
                msg: success.UNIT_CATEGORY_UPDATED,
                data: updatedCategory,
                statusCode: 200,
            })
        );
    } catch (err) {
        logErrorOccurred(__filename, err);
        return serverError(res, err);
    }
});

/**
 * Soft Delete Unit Category - DELETE
 */
router.delete("/:unitCategoryId", async (req, res) => {
    try {
        const deletedCategory = await UnitCategory.findByIdAndUpdate(
            req.params.unitCategoryId,
            { deletedAt: new Date() },
            { new: true }
        );
        if (!deletedCategory) {
            return res.status(404).json(
                await errorResp({ msg: error.NOT_FOUND, code: 404 })
            );
        }
        return res.status(200).json(
            await successRespSync({
                msg: success.UNIT_CATEGORY_DELETED,
                data: deletedCategory,
                statusCode: 200,
            })
        );
    } catch (err) {
        logErrorOccurred(__filename, err);
        return serverError(res, err);
    }
});

module.exports = router;
