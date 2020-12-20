/// <reference types="react" />
export declare const addData: (ref: any, prop: string, columns: any) => (data: any) => Promise<void>;
export declare const updateData: (ref: any, prop: string, columns: any) => (data: any) => Promise<void>;
export declare const deleteData: (ref: any, prop: string, columns: any) => (data: any) => Promise<void>;
export declare const addDataDoc: (ref: any, _prop: string, columns: any) => (data: any) => Promise<void>;
export declare const updateDataDoc: (ref: any, prop: string, columns: any) => (data: any) => Promise<void>;
export declare const deleteDataDoc: (ref: any, prop: string, columns: any) => (data: any) => Promise<void>;
export declare const RequiredField: (props: any) => JSX.Element;
declare const Table: (props: any) => any;
export default Table;
