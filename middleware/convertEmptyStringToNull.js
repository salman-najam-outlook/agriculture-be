const convertEmptyStringToNull = (obj, config = {}) => {
  const skipKeys = Array.isArray(config.skipKeys) ? config.skipKeys : [];
  const defaultValue = config.defaultValue ?? {};
  if (obj && typeof obj === 'object') {
    if (Array.isArray(obj)) {
      obj.forEach((item, idx) => {
        if (!skipKeys.includes(idx)) {
          if (typeof item === 'object') {
            convertEmptyStringToNull(item, { defaultValue: defaultValue[idx], skipKeys });
          } else if (typeof item === 'string' && item.trim().length === 0) {
            obj[idx] =
              typeof defaultValue === 'string' || typeof defaultValue === 'number'
                ? defaultValue
                : Array.isArray(defaultValue) && defaultValue.length
                ? defaultValue[0]
                : null;
          }
        }
      });
    } else {
      for (const key in obj) {
        if (skipKeys.includes(key)) continue;
        if (typeof obj[key] === 'string' && obj[key].trim().length === 0) {
          obj[key] = defaultValue[key] ?? null;
        } else if (typeof obj[key] === 'object') {
          convertEmptyStringToNull(obj[key], { defaultValue: defaultValue[key], skipKeys });
        }
      }
    }
  }
};

module.exports =
  (config = {}) =>
  (req, res, next) => {
    convertEmptyStringToNull(req.body, config);
    next();
  };
