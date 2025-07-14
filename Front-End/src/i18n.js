import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// import all translations
import en from "./locales/en/translation.json";
import hi from "./locales/hi/translation.json";
import zh from "./locales/zh/translation.json";
import es from "./locales/es/translation.json";
import ar from "./locales/ar/translation.json";

const resources = {
  en: { translation: en },
  hi: { translation: hi },
  zh: { translation: zh },
  es: { translation: es },
  ar: { translation: ar },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: "en", // Default language
    resources,
    debug: true, //
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
