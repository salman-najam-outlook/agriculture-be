const assessmentQuestionConfig = {
  question: {
    title: true,
    additionalSetting: {
      description: true
    },
    getData: [
      {
        title: true,
        helpText: true,
        optionValues: [true],
      }
    ]
  },
  options: [
    {
      label: true,
      recommendation: true,
      actionPlans: [
        {
          title: true
        }
      ],
      getData: [
        {
          title: true,
          helpText: true,
          optionValues: [true],
        }
      ]
    }
  ]
};

const assessmentQuestionHeadingConfig = {
    title: true,
}
const assessmentQuestionOptionConfig = {
    label: true,
}
const assessmentActionPlanConfig = {
    title: true,
}
const assessmentGetDataConfig = {
    title: true,
    helpText: true,
    optionValues: [true],
}

module.exports = {
    assessmentQuestionConfig,
    assessmentQuestionHeadingConfig,
    assessmentQuestionOptionConfig,
    assessmentActionPlanConfig,
    assessmentGetDataConfig
};