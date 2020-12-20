/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext } from 'react';

export const CacheContext = React.createContext({});

export const useCache = (): any => useContext(CacheContext);

export const getCache = (cacheData: any) => (key: string): any => {
  return cacheData[key];
};

export const setCache = (setFunction: Function) => (key: string, data: any): void => {
  setFunction((state: any) => ({ ...state, [key]: data }));
};

export const clearCache = (setFunction: Function) => (): void => {
  setFunction({});
};

export const clearKey = (setFunction: Function) => (key: string): void => {
  setFunction((state: any) => ({ ...state, [key]: {} }));
};
