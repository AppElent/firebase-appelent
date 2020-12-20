/// <reference types="react" />
declare type useTranslationType = {
    i18n: any;
    t: any;
    translationLoaded: boolean;
    setTranslationLoaded: React.Dispatch<React.SetStateAction<boolean>>;
};
declare const useTranslation: (namespace?: string | undefined, translation?: any) => useTranslationType;
export default useTranslation;
