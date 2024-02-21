// //import { I18nManager } from 'react-native';
// import i18n from 'i18n-js';
// import memoize from 'lodash.memoize';

// export const DEFAULT_LANGUAGE = 'en';

// export const translationGetters = {
//   // lazy requires (metro bundler does not support symlinks)
//   //  en: () => require('../transtaltions/en.json'),
//   ar: () => require('../transtaltions/ar.json'),
// };

// export const translate = memoize(
//   (key, config) => i18n.t(key, config),
//   (key, config) => (config ? key + JSON.stringify(config) : key),
// );

// export const t = translate;
// const isRTLLanguage = lang => {
//   return lang === 'ar';
// };

// export const setI18nConfig = appLanguage => {
//   const fallback = { languageTag: 'en' };

//   appLanguage = appLanguage ? appLanguage : fallback.languageTag;
//   i18n.translations = { [appLanguage]: translationGetters[appLanguage]() };
//   i18n.locale = appLanguage;
//   return I18nManager.forceRTL(isRTLLanguage(appLanguage));
// };
