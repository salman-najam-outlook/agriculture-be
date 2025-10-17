const db = require(rootPath + '/models');

let langObj = 
{  en: "english",
  hi: "hindi",
  mr: "marathi",
  ne: "nepali",
  es: "spanish",
  id: "indonesian",
  in: "indonesian",
  ar: "arabic",
  pt: "portugese",
  fr: "french",
  vi: "vietnamese",
  am: "amharic",
  so: "somali",
  om: "oromo",
  bn: "bengali",
  sw: "swahili",
  el: "greek",
  nl:"dutch",
  tr: "turkish"}

module.exports = async function (req, res, next) {
  const { lang } = req.headers;
  req.langWhere = {}
  req.langWhere = {
    language: langObj[lang]
  }
  next();
};