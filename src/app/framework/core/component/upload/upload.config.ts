export const UPLAOD_CONFIG = {
    ACTIONS: [
        { type: 'submit', icon: 'save', label: '保存', color: 'primary', action: 'onSubmit' },
        { type: 'button', icon: 'close', label: '关闭', color: 'warn' }
    ],

    CONFIG: {
        MAX_SIZE_TIPS: '文件大小不能超过$MB',
        SUPPORT: {
            TYPE_SINGLE: ['xls', 'xlsx'],
            TYPE_MULTI: ['pptx', 'doc', 'jpg', 'jpeg', 'png', 'bmp', 'gif', 'xls','xlsx', 'txt', 'rar', 'zip', '7z', 'tar', 'gz'],
            TIPS: '文件格式不支持'
        },
        ACCETP_TIPS: '请上传$格式文件'
    }
}