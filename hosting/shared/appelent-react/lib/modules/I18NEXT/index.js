import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import resources from './translation.json';
i18n.use(LanguageDetector).init({
    // we init with resources
    resources: resources,
    fallbackLng: 'en',
    debug: false,
    // have a common namespace used around the full app
    ns: ['common'],
    defaultNS: 'common',
    //keySeparator: false, // we use content as keys
    interpolation: {
        escapeValue: false,
        formatSeparator: ',',
    },
    react: {
        wait: true,
    },
});
export default i18n;
//# sourceMappingURL=index.js.map