const { TranslateClient, TranslateTextCommand } = require('@aws-sdk/client-translate');

const translateClient = new TranslateClient({ region: process.env.AWS_REGION });

async function translate(text, sourceLang, lang) {
  try {
    const command = new TranslateTextCommand({
      Text: text,
      SourceLanguageCode: sourceLang,
      TargetLanguageCode: lang,
    });
    return await translateClient.send(command);
  } catch (error) {
    console.error(`AWS Translate failed for lang ${lang}`, error);
  }
}

// function translator(callback) {
//   return async (text, sourceLang, targetLangs) => {
//     const translations = {};
//     const source = 'aws';

//     await callback(text, sourceLang, targetLangs, translations);

//     return {
//       translations,
//       source,
//     };
//   }
// }

// const translateText = translator(async (text, sourceLang, targetLangs, translations) => {
//   for await (const lang of targetLangs) {
//     const response = await translate(text, sourceLang, lang);
//     translations[lang] = response.TranslatedText;
//   }
// });

// const translateHTML = translator(async (htmlText, sourceLang, targetLangs, translations) => {
//   for await (const lang of targetLangs) {
//     const pattern = />([^<]+)</g;

//     let index = 0;
//     const indexPlaceholder = (idx) =>  (`__TRANSLATION__${idx}__`);

//     const matches = [];

//     let replaced = htmlText.replace(pattern, (match, content) => {
//         if (content.trim().length > 0) {
//             const placeholder = indexPlaceholder(index);
//             index = index + 1;
//             matches.push(content);

//             return placeholder;
//         }

//         return match;
//     });

//     matches.forEach((match, i) => {
//         console.log(i, match);
//     });

//     index = 0;
//     for (const match of matches) {
//       const translation = await translate(match, sourceLang, lang);
//       matches[index] =  translation;
//       replaced = replaced.replace(indexPlaceholder(index), `>${translation}<`);
//       index = index + 1;
//     }
    
//     translations[lang] = replaced;
//   }
// });

async function translateText(text, sourceLang, targetLangs = []) {
  const translations = {};
  const source = 'aws';

  for await (const lang of targetLangs) {
    const response = await translate(text, sourceLang, lang);
    translations[lang] = response.TranslatedText;
  }

  return {
    translations,
    source,
  };
}

async function translateHTML(htmlText, sourceLang, targetLangs = []) {
  const translations = {};
  const source = 'aws';

  for await (const lang of targetLangs) {
    const pattern = />([^<]+)</g;

    let index = 0;
    const indexPlaceholder = (idx) =>  (`__TRANSLATION__${idx}__`);

    const matches = [];

    let replaced = htmlText.replace(pattern, (match, content) => {
        if (content.trim().length > 0) {
            const placeholder = indexPlaceholder(index);
            index = index + 1;
            matches.push(content);

            return placeholder;
        }

        return match;
    });

    index = 0;
    for await (const match of matches) {
      const translation = await translate(match, sourceLang, lang);
      replaced = replaced.replace(indexPlaceholder(index), `>${translation.TranslatedText}<`);
      index = index + 1;
    }
    
    translations[lang] = replaced;
  }

  return {
    translations,
    source,
  };
}

module.exports = {
  translate,
  translateText,
  translateHTML
}