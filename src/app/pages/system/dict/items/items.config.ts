import { SYSTEM_CONFIG } from 'src/app/framework/core/config/system.config';
import { Validators } from '@angular/forms';

export const DICT_ITEMS_CONFIG = {
    API: {
        ADD: SYSTEM_CONFIG.APP.OPTION_SERVER + '/' + SYSTEM_CONFIG.API.VERSION.V1 + '/dictionaryItem' + SYSTEM_CONFIG.API.LIST.ADD.VALUE,
        DELETE_BY_ID: SYSTEM_CONFIG.APP.OPTION_SERVER + '/' + SYSTEM_CONFIG.API.VERSION.V1 + '/dictionaryItem' + SYSTEM_CONFIG.API.LIST.DELETE_BY_ID.VALUE,
        DELETE_BY_ID_LIST: SYSTEM_CONFIG.APP.OPTION_SERVER + '/' + SYSTEM_CONFIG.API.VERSION.V1 + '/dictionaryItem' + SYSTEM_CONFIG.API.LIST.DELETE_BY_ID_LIST.VALUE,
        UPDATE_BY_ID: SYSTEM_CONFIG.APP.OPTION_SERVER + '/' + SYSTEM_CONFIG.API.VERSION.V1 + '/dictionaryItem' + SYSTEM_CONFIG.API.LIST.UPDATE_BY_ID.VALUE,
        QUERY_BY_ID: SYSTEM_CONFIG.APP.OPTION_SERVER + '/' + SYSTEM_CONFIG.API.VERSION.V1 + '/dictionaryItem' + SYSTEM_CONFIG.API.LIST.QUERY_BY_ID.VALUE,
        QUERY_PAGE: SYSTEM_CONFIG.APP.OPTION_SERVER + '/' + SYSTEM_CONFIG.API.VERSION.V1 + '/dictionaryItem' + SYSTEM_CONFIG.API.LIST.QUERY_PAGE.VALUE,
        EXPORT: SYSTEM_CONFIG.APP.OPTION_SERVER + '/' + SYSTEM_CONFIG.API.VERSION.V1 + '/dictionaryItem' + SYSTEM_CONFIG.API.LIST.EXPORT.VALUE
    },

    EXPORT_NAME: '数据字典项',

    UPDATE_ITEMS: {
        layer: true,
        data: [
            { type: 'text', label: '字典项编码', prop: 'itemCode', rules: { maxlength: 50 } },
            { type: 'text', label: '字典项显示值', prop: 'itemValue', rules: { maxlength: 50 } },
            { type: 'number', label: '顺序', prop: 'itemOrder', step: '1', rules: { maxlength: 11 } },
            { type: 'text', label: '扩展字段一', prop: 'extStringOne', rules: { maxlength: 45 } },
            { type: 'text', label: '扩展字段二', prop: 'extStringTwo', rules: { maxlength: 45 } },
            { type: 'text', label: '扩展字段三', prop: 'extStringThree', rules: { maxlength: 45 } },
            { type: 'select', label: '是否启用', prop: 'isEnable', async: true, options: 'isEnables', filterByPipe: true },
            { type: 'textarea', label: '字典项描述', prop: 'itemDesc', rules: { maxlength: 100 } },

        ],
        actions: [
            { type: 'submit', icon: 'save', label: '提交', color: 'primary', action: 'onSubmit' },
            { type: 'reset', icon: 'refresh', label: '重置', color: '', action: 'onReset' },
            { type: 'button', icon: 'close', label: '关闭', color: 'warn' }
        ]
    },

    UPDATE_FORM_CONFIG: {
        itemOrder: [null, [Validators.required]],
        isEnable: [1, []],
        itemValue: [null, [Validators.required]],
        itemDesc: [null, []],
        itemCode: [null, [Validators.required]],
        extStringOne: [null, []],
        extStringTwo: [null, []],
        extStringThree: [null, []],
    },

    FORM_ERRORS: {
        itemOrder: "",
        itemValue: "",
        itemCode: ""
    },

    VALID_MES: {
        itemOrder: {
            required: '顺序不能为空',
        },
        itemValue: {
            required: '字典项显示值不能为空',
        },
        itemCode: {
            required: '字典项编码不能为空',
        }
    },

    MESSAGE: {
        update_sucess: '数据字典项修改成功',
        add_success: '数据字典项添加成功',
        addTitle: '新增数据字典项',
        updateTitle: '修改数据字典项'
    }
}