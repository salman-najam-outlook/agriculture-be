const Redis = require('../../components/redis');
const { successResp } = require(rootPath + '/helpers/api');
const { success } = require(rootPath + '/helpers/language');
const { logErrorOccurred } = require(rootPath + '/helpers/general');
const generateTranslationKey = require('./utils/generateTranslationKey');
const Translation = require('../../mongoose-models/language/Translation');

const REDIS_TTL_SECONDS = 60 * 60 * 24 * 40; // 40 days

function translationResponseMiddleware(config) {
  return async function (req, res, next) {
    const targetLang = req.headers['lang'] || 'en';
    const responseData = res.locals.data;

    if (!targetLang || targetLang === 'en' || !responseData) {
      return res.json(await successResp({ msg: success.FETCH, data: responseData }));
    }

    try {
      await applyTranslations(responseData, config, targetLang);
    } catch (error) {
      logErrorOccurred(__filename, error);
      console.error('Error applying translations to response:', error);
    }

    return res.json(await successResp({ msg: success.FETCH, data: responseData }));
  };
}

async function applyTranslations(payload, config, lang) {
  const cache = new Map();
  const allKeys = new Set();

  const collectKeys = (node, conf) => {
    if (Array.isArray(node)) {
      for (const item of node) collectKeys(item, conf[0] || {});
    } else if (typeof node === 'object' && node !== null) {
      for (const key in conf) {
        if (!node.hasOwnProperty(key)) continue;
        const fieldConf = conf[key];
        const value = node[key];

        if (fieldConf === true && typeof value === 'string') {
          const transKey = generateTranslationKey(value);
          allKeys.add(transKey);
          cache.set(transKey, { original: value });
        } else if (Array.isArray(fieldConf) && Array.isArray(value)) {
          collectKeys(value, fieldConf);
        } else if (typeof fieldConf === 'object' && typeof value === 'object') {
          collectKeys(value, fieldConf);
        }
      }
    }
  };

  const applyToData = async (node, conf) => {
    if (Array.isArray(node)) {
      await Promise.all(node.map(item => applyToData(item, conf[0] || {})));
    } else if (typeof node === 'object' && node !== null) {
      await Promise.all(Object.keys(conf).map(async key => {
        if (!node.hasOwnProperty(key)) return;

        const fieldConf = conf[key];
        const value = node[key];

        if (fieldConf === true && typeof value === 'string') {
          const transKey = generateTranslationKey(value);
          node[key] = cache.get(transKey)?.translated || value;
        } else if (Array.isArray(fieldConf) && Array.isArray(value)) {
          await applyToData(value, fieldConf);
        } else if (typeof fieldConf === 'object' && typeof value === 'object') {
          await applyToData(value, fieldConf);
        }
      }));
    }
  };

  collectKeys(payload, config);

  const redisKeys = Array.from(allKeys);
  const redisValues = await Promise.all(redisKeys.map(key => Redis.getKey(key)));

  const now = new Date();

  await Promise.all(redisKeys.map(async (key, index) => {
    const redisVal = redisValues[index];
    if (redisVal) {
      const parsed = JSON.parse(redisVal);
      const translatedText = parsed.translations?.[lang] || cache.get(key).original;
      cache.set(key, { ...cache.get(key), translated: translatedText });

      parsed.metadata = parsed.metadata || {};
      parsed.metadata.usageCount = (parsed.metadata.usageCount || 0) + 1;
      parsed.metadata.lastAccessed = now.toISOString();

      Translation.updateOne(
        { key },
        { $inc: { 'metadata.usageCount': 1 }, $set: { 'metadata.lastAccessed': now } }
      ).catch(() => {});

      Redis.setKeyWithTtl(key, JSON.stringify(parsed), REDIS_TTL_SECONDS).catch(() => {});
    } else {
      const doc = await Translation.findOne({ key });
      if (doc) {
        const translatedText = doc.translations?.[lang] || cache.get(key).original;
        cache.set(key, { ...cache.get(key), translated: translatedText });

        const newRecord = {
          key: doc.key,
          sourceText: doc.sourceText,
          sourceLanguage: doc.sourceLanguage,
          translations: doc.translations,
          module: doc.module,
          source: doc.source,
          metadata: {
            usageCount: (doc.metadata?.usageCount || 0) + 1,
            lastAccessed: now.toISOString()
          },
        };

        Translation.updateOne(
          { key },
          { $inc: { 'metadata.usageCount': 1 }, $set: { 'metadata.lastAccessed': now } }
        ).catch(() => {});

        Redis.setKeyWithTtl(key, JSON.stringify(newRecord), REDIS_TTL_SECONDS).catch(() => {});
      } else {
        cache.set(key, { ...cache.get(key), translated: cache.get(key).original });
      }
    }
  }));

  await applyToData(payload, config);
}

module.exports = translationResponseMiddleware;