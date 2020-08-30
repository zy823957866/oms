export const UPLAOD_CONFIG = {
    ACTIONS: [
        { type: 'submit', icon: 'save', label: '保存', color: 'primary', action: 'onSubmit' },
        { type: 'button', icon: 'close', label: '关闭', color: 'warn' }
    ],

    DEFAULT_CONFIG: {
        showDownloadTemp: false,    //是否显示模板下载
        label: '上传',              // 按钮显示文字
        width: '100%',              // 容器默认宽度
        height: '350px',            // 容器默认高度
        uploadSingle: false,        // 是否为单文件上传
        limitSize: null,            // 当个文件最大限制
    }
}