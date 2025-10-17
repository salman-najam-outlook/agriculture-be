const responseConfig = {
  goal: {
    title: true,
    additionalSetting: {
      description: true
    },
  },
  responses: [
    {
      title: true,
      assessmentQuestions: [
        {
          title: true,
          additionalSetting: {
            description: true
          },
          questionHeading: {
            title: true,
          },
          getDataQuestions: [
            {
              title: true,
              helpText: true,
              optionValues: [true],
            }
              ],
          response: {
            value: true,
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
              getDataQuestions: [
                {
                  title: true,
                  helpText: true,
                  optionValues: [true],
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};

const submitResponseConfig = [
    {
        title: true,
        assessmentQuestions: [
            {
            title: true,
            additionalSetting: {
                description: true
            },
            options: [
                {
                label: true,
                recommendation: true,
                getDataQuestions: [
                    {
                    title: true,
                    helpText: true,
                    optionValues: true
                    }
                ],
                actionPlans: [
                    {
                    title: true
                    }
                ]
                }
            ],
            getDataQuestions: [
                {
                title: true,
                helpText: true,
                optionValues: true
                }
            ],
            actionPlans: [
                {
                title: true
                }
            ]
            }
        ]
    }
]

module.exports = {
    responseConfig,
    submitResponseConfig
}