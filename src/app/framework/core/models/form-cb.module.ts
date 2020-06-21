
export interface FormCbDataItem {
    prop: string;
    value?: any; 
    start?: string;
    end?: string; 
}

export interface FormCbData {
    data: FormCbDataItem | string;
    item: any;
}