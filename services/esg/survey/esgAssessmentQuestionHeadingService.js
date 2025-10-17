const esgAssessmentQuestionHeading = require('../../..//mongoose-models/survey/assessments/esgAssessmentQuestionHeading.js');
const esgAssessmentQuestionService = require('../../../services/esg/survey/esgAssessmentQuestionService.js');

exports.createQuestionHeading = async (data) => {
    const { esgAssessmentId } = data;

    const headingCount = await esgAssessmentQuestionHeading.countDocuments({ esgAssessmentId });

    const order = headingCount + 1;

    const newHeading = new esgAssessmentQuestionHeading({
        ...data,
        order,
    });

    return await newHeading.save();
};

exports.getAllQuestionHeadings = async () => {
    return await esgAssessmentQuestionHeading.find({ deletedAt: null });
};

exports.getAllQuestionHeadingsByAssessmentId = async (esgAssessmentId) => {
    return await esgAssessmentQuestionHeading.find({ esgAssessmentId, deletedAt: null }).sort({ order: 1 });
};

exports.getQuestionHeadingById = async (id) => {
    const heading = await esgAssessmentQuestionHeading.findOne({ _id: id, deletedAt: null });

    if (!heading) return null;

    // Fetch associated questions
    const questions = await esgAssessmentQuestionService.getAllQuestionsByQuestionHeadingId(id);

    return {
        ...heading.toObject(),
        questions,
    };
};

exports.updateQuestionHeading = async (id, data) => {
    return await esgAssessmentQuestionHeading.findByIdAndUpdate(
        id,
        { ...data, $inc: { __v: 1 } },
        { new: true, runValidators: true }
    );
};

exports.deleteQuestionHeading = async (id) => {
    return await esgAssessmentQuestionHeading.findByIdAndUpdate(
        id,
        { deletedAt: new Date() },
        { new: true }
    );
};