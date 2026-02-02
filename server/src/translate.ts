import {LingoDotDevEngine} from "lingo.dev/sdk";

export const translate = async (text: string, sourceLanguage: string, targetLanguage: string) => {
    console.log(text,sourceLanguage,targetLanguage);
  const apiKey = process.env.LINGODOTDEV_API_KEY;
  if (!apiKey) throw new Error("API key missing");
  
  const lingoDotDev = new LingoDotDevEngine({ apiKey });
  return await lingoDotDev.localizeText(text, {
    sourceLocale: sourceLanguage,
    targetLocale: targetLanguage,
  });
};

