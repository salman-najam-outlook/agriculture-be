const { createHash } = require('crypto');

/**
 * Generates a SHA-256 key based only on the text.
 * @param {string} text - The original string
 * @returns {string} - The SHA256 hex hash
 */
function generateTranslationKey(text) {
  const hash = createHash('sha256');
  hash.update(text.trim());
  return hash.digest('hex');
}

module.exports = generateTranslationKey;