const Redis = require('../../components/redis');
const generateTranslationKey = require('./utils/generateTranslationKey');
const Translation = require('../../mongoose-models/language/Translation');
const { translateHTML, translateText } = require('../../services/translation/awsTranslateService');

let SOURCE_LANGUAGE;
const TARGET_LANGUAGES = ['pt', 'id', 'es', 'sw', 'nl', 'it'];
const REDIS_TTL_SECONDS = 60 * 60 * 24 * 40; // 40 days

function translationMiddleware(translationConfig, moduleTags = []) {
  return async (req, res, next) => {
    try {
      SOURCE_LANGUAGE = req.headers['lang'] || 'en';
      const payload = req.body;

      await transformPayloadWithTranslations(payload, translationConfig, moduleTags);
      
      next();
    } catch (err) {
      console.error("Translation Middleware Error:", err);
      next(err);
    }
  };
}


/**
 * Translates fields from payload and returns updated values.
 * @param {Object} payload - The original data object
 * @param {Array} config - Array describing which fields to translate
 * @param {Array} moduleTags - Tags like ['esg', 'survey', 'question']
 * @returns {Object} - Payload with translated fields
 */
async function transformPayloadWithTranslations(payload, config, moduleTags = [], currentPath = []) {
  const handleTranslation = async (text) => {
    if (!text || typeof text !== 'string' || text.trim() === '') return text;

    const key = generateTranslationKey(text);
    const now = new Date();

    // 1. Try Redis
    const redisCached = await Redis.getKey(key);
    if (redisCached) {
      const parsed = JSON.parse(redisCached);

      // Ensure metadata object exists
      parsed.metadata = parsed.metadata || {};
      parsed.metadata.usageCount = (parsed.metadata.usageCount || 0) + 1;
      parsed.metadata.lastAccessed = now.toISOString();

      // Check if it exists in MongoDB
      const existingRecord = await Translation.findOne({ key });
      if (existingRecord) {
        // Update metadata
        await Translation.updateOne(
          { key },
          {
            $inc: { 'metadata.usageCount': 1 },
            $set: { 'metadata.lastAccessed': now }
          }
        );
      }

      // Update Redis cached value with incremented metadata
      await Redis.setKeyWithTtl(key, JSON.stringify(parsed), REDIS_TTL_SECONDS);
      console.log(`Redis cached record for text: ${text}`, parsed);
      return;
    }

    let record = await Translation.findOne({ key });
    if (record) {
      await Translation.updateOne(
        { key },
        {
          $inc: { 'metadata.usageCount': 1 },
          $set: { 'metadata.lastAccessed': now },
        }
      );

      const recordForRedis = {
        key,
        sourceText: record.sourceText,
        sourceLanguage: record.sourceLanguage,
        translations: record.translations,
        module: record.module || moduleTags,
        source: record.source || '',
        metadata: {
          usageCount: (record.metadata?.usageCount || 0) + 1,
          lastAccessed: now.toISOString(),
        },
      }
      await Redis.setKeyWithTtl(key, JSON.stringify(recordForRedis), REDIS_TTL_SECONDS);
      console.log(`MongoDB cached record for text: ${text}`, recordForRedis);
      return;
    }

    let translations, source = 'aws';

    // Handling HTML translations
    const htmlPattern = /<\/?[a-z][\s\S]*>/i;
    const translationMethod = htmlPattern.test(text) ? translateHTML: translateText;
    
    ({ translations, source }  = await translationMethod(text, SOURCE_LANGUAGE, TARGET_LANGUAGES));

    const newRecord = await Translation.create({
      key,
      sourceText: text,
      sourceLanguage: SOURCE_LANGUAGE,
      translations,
      module: moduleTags,
      source,
      metadata: {
        usageCount: 1,
        lastAccessed: now,
      },
    });

    // Cache full document (as stored in MongoDB)
    const recordForRedis = {
      key,
      sourceText: newRecord.sourceText,
      sourceLanguage: newRecord.sourceLanguage,
      translations: newRecord.translations,
      module: newRecord.module || moduleTags,
      source: newRecord.source || '',
      metadata: {
        usageCount: 1,
        lastAccessed: now.toISOString(),
      },
    };

    await Redis.setKeyWithTtl(key, JSON.stringify(recordForRedis), REDIS_TTL_SECONDS);
    console.log(`AWS Translate cached record for text: ${text}`, recordForRedis);
    return;
  };

  const processField = async (obj, key) => {
    const originalText = obj[key];
    await handleTranslation(originalText);
  };

  for (const key in config) {
    const value = config[key];
    const target = currentPath.reduce((acc, k) => (acc ? acc[k] : undefined), payload);

    if (!target) continue;

    // Case 1: config value is `true` => translate the field
    if (value === true && typeof target[key] === 'string') {
      await processField(target, key);
    }

    // Case 2: config value is an object => go deeper
    else if (typeof value === 'object' && !Array.isArray(value)) {
      await transformPayloadWithTranslations(payload, value, moduleTags, [...currentPath, key]);
    }

    // Case 3: config value is an array => array of objects with nested config
    else if (Array.isArray(value) && Array.isArray(target[key])) {
      const nestedConfig = value[0];
      
      if (nestedConfig === true) {
        for (let i = 0; i < target[key].length; i++) {
          const text = target[key][i];
          if (typeof text === 'string') {
            await handleTranslation(text);
          }
        }
      } else if (typeof nestedConfig === 'object') {
        for (const item of target[key]) {
          await transformPayloadWithTranslations(item, nestedConfig, moduleTags);
        }
      }
    }
  }

  return payload;
}

module.exports = translationMiddleware;