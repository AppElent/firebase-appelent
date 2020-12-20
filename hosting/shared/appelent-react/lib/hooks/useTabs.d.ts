/// <reference types="react" />
declare type useTabsPropsType = {
    tab: string;
    handleTabChange: (e: any, newValue: string) => void;
    setTab: React.Dispatch<React.SetStateAction<string>>;
};
declare const useTabs: (initialTab?: string) => useTabsPropsType;
export default useTabs;
