const esgIssuesConfig = {
    title: true,
}
const esgGoalsConfig = {
    title: true,
}

// Config for ESG protocol request data (create/update operations)
const esgProtocolRequestConfig = {
  title: true,
  description: true,
};

const esgProtocolResponseConfig = {
  title: true,
  description: true,
  esgIssues: [
    {
      title: true,
      esgGoals: [
        {
          title: true
        }
      ]
    }
  ]
};

// Config for ESG protocol list response - matches res.locals.data structure
const esgProtocolListResponseConfig = {
  rows: [
    {
      title: true,
      description: true
    }
  ]
};

module.exports = {
    esgIssuesConfig,
    esgGoalsConfig,
    esgProtocolRequestConfig,
    esgProtocolResponseConfig,
    esgProtocolListResponseConfig
};