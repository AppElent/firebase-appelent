import React from 'react';
export declare const CacheContext: React.Context<{}>;
export declare const useCache: () => any;
export declare const getCache: (cacheData: any) => (key: string) => any;
export declare const setCache: (setFunction: any) => (key: string, data: any) => void;
export declare const clearCache: (setFunction: any) => () => void;
export declare const clearKey: (setFunction: any) => (key: string) => void;
