/// <reference types="react" />
declare type useStateExtendedPropsType<T> = {
    data: T;
    setData: React.Dispatch<React.SetStateAction<T>>;
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};
declare const useStateExtended: <T>(initialValue: T, initialLoading?: boolean) => useStateExtendedPropsType<T>;
export default useStateExtended;
