export interface FileData{
    id: string;
    size: string;
    suffix: string;
    name: string;
    errorMsg?: string;
    img?: string;
    historyUpload?: boolean;    // 是否为历史上传
    file: any;
    File?: any;
    fileCode?: number;
}