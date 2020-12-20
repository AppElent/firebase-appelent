/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext } from 'react';

export const AppSettingsContext = React.createContext({});

export const useAppSettings = (): any => useContext(AppSettingsContext);

export const setAppSettings = (setFunction: any) => (key: string, data: any): void => {
    setFunction((state: any) => ({ ...state, [key]: data }));
};
