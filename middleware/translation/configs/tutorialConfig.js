const tutorialCreateRequestConfig = {
  title: true,
  description: true,
};

const tutorialListResponseConfig = {
  tutorials: [
    {
      title: true,
      description: true
    }
  ]
};

const tutorialByIdResponseConfig = {
  title: true,
  description: true,
};

const tutorialUpdateRequestConfig = {
  title: true,
  description: true,
};

module.exports = {
  tutorialCreateRequestConfig,
  tutorialListResponseConfig,
  tutorialByIdResponseConfig,
  tutorialUpdateRequestConfig,
};
