const assessmentCreateRequestConfig = {
  title: true,
  description: true,
  instructions: true,
};

const assessmentListResponseConfig = [
  {
    title: true,
    description: true,
    instructions: true
  }
];

const assessmentByIdResponseConfig = {
  title: true,
  description: true,
  instructions: true,
  questionHeadings: [
    {
      title: true,
      questions: [
        {
          title: true,
          additionalSetting: {
            description: true
          }
        }
      ]
    }
  ]
};

const assessmentDuplicateByIdConfig = {
  title: true,
}

module.exports = {
  assessmentCreateRequestConfig,
  assessmentListResponseConfig,
  assessmentByIdResponseConfig,
  assessmentDuplicateByIdConfig,
};