import { useState, useEffect } from 'react';
import { useTranslation as useTranslationDefault } from 'react-i18next';

type useTranslationType = {
    i18n: any;
    t: any;
    translationLoaded: boolean;
    setTranslationLoaded: React.Dispatch<React.SetStateAction<boolean>>;
};

const useTranslation = (namespace?: string, translation?: any): useTranslationType => {
    const { t, i18n } = useTranslationDefault(['common']);
    const [translationLoaded, setTranslationLoaded] = useState(false);

    useEffect(() => {
        async function loadTranslation(translationObject: any) {
            if (namespace && translationObject) {
                for (const key of Object.keys(translationObject)) {
                    await i18n.addResourceBundle(key, namespace, translationObject[key]);
                }
            }
            setTranslationLoaded(true);
        }
        loadTranslation(translation);
    }, [i18n, namespace, translation]);

    return { i18n, t, setTranslationLoaded, translationLoaded };
};

export default useTranslation;
