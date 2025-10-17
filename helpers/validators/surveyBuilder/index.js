const { check, body } = require("express-validator");

exports.surveyQuestionValidator = () => [
  check("data.question").trim().notEmpty().withMessage("Question is required"),
  check("data.questionType")
    .trim()
    .notEmpty()
    .withMessage("Question type is required"),
  check("data.questionOptions")
    .if(body("data.questionType").equals("radio"))
    .isArray({ min: 1 })
    .withMessage("Option is required for radio"),
  check("data.questionOptions")
    .if(body("data.questionType").equals("checkbox"))
    .isArray({ min: 1 })
    .withMessage("Option is required for checkbox"),
  check("data.questionOptions.*.nestedQuestions.questionOptions")
    .if(body("data.questionOptions.*.nestedQuestions.questionType").equals("radio"))
    .isArray({ min: 1 })
    .withMessage(
      "Nested question options cannot be empty for nested question type radio"
    ),
    check("data.questionOptions.*.nestedQuestions.questionOptions")
    .if(body("data.questionOptions.*.nestedQuestions.questionType").equals("checkbox"))
    .isArray({ min: 1 })
    .withMessage(
      "Nested question options cannot be empty for nested question type checkbox"
    ),
];
