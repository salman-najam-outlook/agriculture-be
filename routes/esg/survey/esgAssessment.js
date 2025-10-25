const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const auth = require('../../../middleware/auth.js');
const { success, error } = require(rootPath + '/helpers/language');
const { logErrorOccurred } = require(rootPath + '/helpers/general');
const esgActionPlan = require('../../../mongoose-models/survey/questions/esgActionPlans.js');
const translationMiddleware = require('../../../middleware/translation/translationEngine.js');
const esgAssessment = require(rootPath + '/mongoose-models/survey/assessments/esgAssessment.js');
const { successResp, serverError, successRespSync, errorResp } = require(rootPath + '/helpers/api');
const esgGetDataQuestion = require('../../../mongoose-models/survey/questions/esgGetDataQuestion.js');
const esgAssessmentQuestionService = require('../../../services/esg/survey/esgAssessmentQuestionService.js');
const translationResponseMiddleware = require('../../../middleware/translation/translationResponseMiddleware.js');
const esgAssessmentQuestionOption = require('../../../mongoose-models/survey/questions/esgAssessmentQuestionOptions.js');
const esgAssessmentQuestionHeadingService = require('../../../services/esg/survey/esgAssessmentQuestionHeadingService.js');
const { assessmentCreateRequestConfig, assessmentByIdResponseConfig, assessmentDuplicateByIdConfig, assessmentListResponseConfig } = require('../../../middleware/translation/configs/assessmentConfig.js');

/** 
 * @swagger
 * /api/esg-assessments:
 *   post:
 *     summary: Create a new ESG Assessment
 *     description: Adds a new ESG assessment to the database
 *     tags: [ESG Assessments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, type, respondentType, orgId, createdBy]
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Sustainability Audit 2025"
 *               description:
 *                 type: string
 *                 example: "Annual ESG compliance review"
 *               type:
 *                 type: string
 *                 enum: ["Standard Survey", "Risk Assessment Survey", "ESG Goal Survey", "RWA Survey"]
 *                 example: "Risk Assessment Survey"
 *               respondentType:
 *                 type: string
 *                 enum: ["Farmer (Single response for all farms)", "Farmer (Separate response for each farm)", "Sub-Organization", "Supplier"]
 *                 example: "Farmer (Single response for all farms)"
 *               orgId:
 *                 type: integer
 *                 example: 101
 *               createdBy:
 *                 type: integer
 *                 example: 5
 *     responses:
 *       201:
 *         description: ESG Assessment created successfully
 *       400:
 *         description: Validation error
 */
router.post('/', auth,
    translationMiddleware(assessmentCreateRequestConfig, ['esg', 'survey']),
    async (req, res) => {
    try {
        const newAssessment = new esgAssessment({
            ...req.body,
            createdByUser: req.user.mongoId,
            _clientMetadata: req.user.clientMetadata,
        });
        await newAssessment.save();
          return res.status(201).json(
            await successRespSync({
                msg: success.ESG_ASSESSMENT_CREATED,
                data: newAssessment,
                statusCode: 201
            })
      );
    } catch (err) {
        logErrorOccurred(__filename, err);
        return serverError(res, err);
    }
});

/** 
 * @swagger
 * /api/esg-assessments:
 *   get:
 *     summary: Get all ESG Assessments
 *     description: Fetches all ESG assessments from the database with pagination and search
 *     tags: [ESG Assessments]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *         description: Number of items per page
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search term to filter assessments by title
 *     responses:
 *       200:
 *         description: Successfully retrieved list of ESG Assessments
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 code:
 *                   type: integer
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     numRows:
 *                       type: integer
 *                     data:
 *                       type: array
 *                       items:
 *                         type: object
 *                     total:
 *                       type: integer
 *                     page:
 *                       type: integer
 *       500:
 *         description: Internal Server Error
 */
router.get('/',
    auth,
    async (req, res, next) => {
        try {
            // Extract query parameters with defaults
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const search = req.query.search || '';

            // Ensure limit is within reasonable bounds
            const finalLimit = Math.min(Math.max(limit, 1), 1000);
            const offset = (page - 1) * finalLimit;

            // Build query filter
            const filter = { deletedAt: null };
            
            // Add search functionality for title
            if (search.trim()) {
                filter.title = { $regex: search.trim(), $options: 'i' }; // Case-insensitive search
            }

            // Get total count for pagination
            const totalItems = await esgAssessment.countDocuments(filter);
            
            // Get paginated results
            const assessments = await esgAssessment
                .find(filter)
                .skip(offset)
                .limit(finalLimit)
                .lean();

            // Prepare response following the established pattern
            const responseData = {
                numRows: totalItems,
                data: assessments,
                total: totalItems,
                page: page,
            };

            res.locals.data = responseData;
            next();
        } catch (err) {
            logErrorOccurred(__filename, err);
            return serverError(res, err);
        }
    },
    translationResponseMiddleware(assessmentListResponseConfig)
);

/** 
 * @swagger
 * /api/esg-assessments/{id}:
 *   get:
 *     summary: Get a single ESG Assessment by ID
 *     description: Fetches an ESG assessment based on ID
 *     tags: [ESG Assessments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved ESG Assessment
 *       404:
 *         description: Assessment not found
 */
router.get('/:id', auth,
    async (req, res, next) => {
    try {
        const assessment = await esgAssessment.findOne({ _id: req.params.id, deletedAt: null });

        if (!assessment) {
            return res.status(404).json(await errorResp({ msg: error.NOT_FOUND, code: 404 }));
        }

        // Fetch all question headings related to the assessment (Ensure it's queried correctly)
        const questionHeadings = await esgAssessmentQuestionHeadingService.getAllQuestionHeadingsByAssessmentId(req.params.id);

        // Fetch all questions for each heading
        const questionHeadingsWithQuestions = await Promise.all(
            questionHeadings.map(async (heading) => {
                const questions = await esgAssessmentQuestionService.getAllQuestionsByQuestionHeadingId(heading._id);
                const expandedQuestions = questions.map((q) => q.toObject()); 
                return { ...heading.toObject(), questions: expandedQuestions };
            })
        );

        const structuredResponse = {
            ...assessment.toObject(),
            questionHeadings: questionHeadingsWithQuestions
        };
        res.locals.data = structuredResponse;
        next();
    } catch (err) {
        logErrorOccurred(__filename, err);
        return serverError(res, err);
    }
},
    translationResponseMiddleware(assessmentByIdResponseConfig)
);

/** 
 * @swagger
 * /api/esg-assessments/{id}:
 *   put:
 *     summary: Update an ESG Assessment
 *     description: Updates an ESG assessment based on ID
 *     tags: [ESG Assessments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Assessment updated successfully
 *       404:
 *         description: Assessment not found
 */
router.put('/:id', auth,
    translationMiddleware(assessmentCreateRequestConfig, ['esg', 'survey']),
    async (req, res) => {
    try {
        const updatedAssessment = await esgAssessment.findByIdAndUpdate(
            req.params.id,
            { ...req.body, $inc: { __v: 1 }, _clientMetadata: req.user.clientMetadata, lastModifiedByUser: req.user.mongoId },
            { new: true, runValidators: true }
        );
        if (!updatedAssessment) {
            return res.status(404).json(
                await errorResp({ msg: error.NOT_FOUND, code: 404 })
            );
        }
        return res.status(201).json(
            await successResp({
                msg: success.UPDATED,
                data: updatedAssessment,
                code: 201,
            })
        )
    } catch (err) {
        logErrorOccurred(__filename, err);
        return serverError(res, err); 
    }
});

/** 
 * @swagger
 * /api/esg-assessments/{id}:
 *   delete:
 *     summary: Delete an ESG Assessment
 *     description: Deletes an ESG assessment based on ID
 *     tags: [ESG Assessments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Assessment deleted successfully
 *       404:
 *         description: Assessment not found
 */
router.delete('/:id', auth, async (req, res) => {
    try {
        const deletedAssessment = await esgAssessment.findByIdAndUpdate(
            req.params.id, 
            { deletedAt: new Date(), lastModifiedByUser: req.user.mongoId, _clientMetadata: req.user.clientMetadata },
            { new: true }
        );

        if (!deletedAssessment) {
            return res.status(404).json(
                await errorResp({ msg: error.NOT_FOUND, code: 404 })
            );
        }
        return res.json(successRespSync({ msg: success.DELETED }));
    } catch (err) {
        logErrorOccurred(__filename, err);
        return serverError(res, err);
    }
});

router.post('/:id/duplicate', auth,
    translationMiddleware(assessmentDuplicateByIdConfig, ['esg', 'survey, duplicate']),
    async (req, res) => {
    try {
        const originalSurveyId = req.params.id;
        const user = req.user;

        const originalSurvey = await esgAssessment.findOne({ _id: originalSurveyId, deletedAt: null });
        if (!originalSurvey) {
            return res.status(404).json(await errorResp({ msg: error.NOT_FOUND, code: 404 }));
        }

        const newSurvey = await esgAssessment.create({
            ...originalSurvey.toObject(),
            _id: new mongoose.Types.ObjectId(),
            isNew: true,
            parentSurveyId: originalSurveyId,
            title: `${originalSurvey.title} (Copy)`,
            createdByUser: user.mongoId,
            createdBy: user.id,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        const headings = await esgAssessmentQuestionHeadingService.getAllQuestionHeadingsByAssessmentId(originalSurveyId);

        for (const heading of headings) {
            const newHeadingId = new mongoose.Types.ObjectId();
            const newHeading = {
                ...heading.toObject(),
                _id: newHeadingId,
                esgAssessmentId: newSurvey._id,
                createdAt: new Date(),
                updatedAt: new Date(),
                isNew: true,
            };
            await esgAssessmentQuestionHeadingService.createQuestionHeading(newHeading);

            const questions = await esgAssessmentQuestionService.getAllQuestionsByQuestionHeadingId(heading._id);

            for (const question of questions) {
                const newQuestionId = new mongoose.Types.ObjectId();

                const newQuestion = {
                    ...question.toObject(),
                    _id: newQuestionId,
                    esgHeadingId: newHeadingId,
                    esgAssessmentId: newSurvey._id,
                    parentQuestionId: question._id,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    isNew: true,
                };
                await esgAssessmentQuestionService.createQuestion(newQuestion, user);

                const options = await esgAssessmentQuestionOption.find({ esgAssessmentQuestionId: question._id, deletedAt: null });

                for (const option of options) {
                    const newOptionId = new mongoose.Types.ObjectId();
                    const newOption = {
                        ...option.toObject(),
                        _id: newOptionId,
                        esgAssessmentQuestionId: newQuestionId,
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        isNew: true,
                    };
                    await esgAssessmentQuestionOption.create(newOption);

                    const getData = await esgGetDataQuestion.find({ esgAssessmentQuestionOptionId: option._id });
                    for (const gd of getData) {
                        const newGd = {
                            ...gd.toObject(),
                            _id: new mongoose.Types.ObjectId(),
                            esgAssessmentQuestionId: newQuestionId,
                            esgAssessmentQuestionOptionId: newOptionId,
                            createdAt: new Date(),
                            updatedAt: new Date(),
                            isNew: true,
                        };
                        await esgGetDataQuestion.create(newGd);
                    }

                    const actions = await esgActionPlan.find({ esgAssessmentQuestionOptionId: option._id });
                    for (const act of actions) {
                        const newAct = {
                            ...act.toObject(),
                            _id: new mongoose.Types.ObjectId(),
                            esgAssessmentQuestionId: newQuestionId,
                            esgAssessmentQuestionOptionId: newOptionId,
                            createdAt: new Date(),
                            updatedAt: new Date(),
                            isNew: true,
                        };
                        await esgActionPlan.create(newAct);
                    }
                }

                // If the question itself has GetData (not just options)
                const questionLevelGetData = await esgGetDataQuestion.find({ esgAssessmentQuestionId: question._id, esgAssessmentQuestionOptionId: null });
                for (const gd of questionLevelGetData) {
                    const newGd = {
                        ...gd.toObject(),
                        _id: new mongoose.Types.ObjectId(),
                        esgAssessmentQuestionId: newQuestionId,
                        esgAssessmentQuestionOptionId: null,
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        isNew: true,
                    };
                    await esgGetDataQuestion.create(newGd);
                }
            }
        }


        const duplicatedHeadings = await esgAssessmentQuestionHeadingService.getAllQuestionHeadingsByAssessmentId(newSurvey._id);

        const fullSurveyStructure = await Promise.all(
        duplicatedHeadings.map(async (heading) => {
            const questions = await esgAssessmentQuestionService.getAllQuestionsByQuestionHeadingId(heading._id);

            const enrichedQuestions = await Promise.all(
            questions.map(async (question) => {
                const options = await esgAssessmentQuestionOption.find({ esgAssessmentQuestionId: question._id, deletedAt: null });

                const enrichedOptions = await Promise.all(
                options.map(async (opt) => {
                    const getData = await esgGetDataQuestion.find({ esgAssessmentQuestionOptionId: opt._id });
                    const actionPlans = await esgActionPlan.find({ esgAssessmentQuestionOptionId: opt._id });
                    return { ...opt.toObject(), getData, actionPlans };
                })
                );

                const questionLevelGetData = await esgGetDataQuestion.find({ esgAssessmentQuestionId: question._id, esgAssessmentQuestionOptionId: null });

                return {
                ...question.toObject(),
                options: enrichedOptions,
                getData: questionLevelGetData
                };
            })
            );

            return {
            ...heading.toObject(),
            questions: enrichedQuestions
            };
        })
        );

        return res.status(201).json(await successResp({
            msg: "Survey duplicated successfully",
            data: {
                ...newSurvey.toObject(),
                questionHeadings: fullSurveyStructure
            }
        }));
    } catch (err) {
        logErrorOccurred(__filename, err);
        return serverError(res, err);
    }
});


module.exports = router;