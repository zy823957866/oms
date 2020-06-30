import { SYSTEM_CONFIG } from 'src/app/framework/core/config/system.config';
import { Validators } from '@angular/forms';

export const DICT_CONFIG = {
    API: {
        ADD: SYSTEM_CONFIG.APP.OPTION_SERVER + '/' + SYSTEM_CONFIG.API.VERSION.V1 + '/dictionary' + SYSTEM_CONFIG.API.LIST.ADD.VALUE,
        DELETE_BY_ID: SYSTEM_CONFIG.APP.OPTION_SERVER + '/' + SYSTEM_CONFIG.API.VERSION.V1 + '/dictionary' + SYSTEM_CONFIG.API.LIST.DELETE_BY_ID.VALUE,
        DELETE_BY_ID_LIST: SYSTEM_CONFIG.APP.OPTION_SERVER + '/' + SYSTEM_CONFIG.API.VERSION.V1 + '/dictionary' + SYSTEM_CONFIG.API.LIST.DELETE_BY_ID_LIST.VALUE,
        UPDATE_BY_ID: SYSTEM_CONFIG.APP.OPTION_SERVER + '/' + SYSTEM_CONFIG.API.VERSION.V1 + '/dictionary' + SYSTEM_CONFIG.API.LIST.UPDATE_BY_ID.VALUE,
        QUERY_BY_ID: SYSTEM_CONFIG.APP.OPTION_SERVER + '/' + SYSTEM_CONFIG.API.VERSION.V1 + '/dictionary' + SYSTEM_CONFIG.API.LIST.QUERY_BY_ID.VALUE,
        QUERY_PAGE: SYSTEM_CONFIG.APP.OPTION_SERVER + '/' + SYSTEM_CONFIG.API.VERSION.V1 + '/dictionary' + SYSTEM_CONFIG.API.LIST.QUERY_PAGE.VALUE,
        EXPORT: SYSTEM_CONFIG.APP.OPTION_SERVER + '/' + SYSTEM_CONFIG.API.VERSION.V1 + '/dictionary' + SYSTEM_CONFIG.API.LIST.EXPORT.VALUE
    },

    EXPORT_NAME: '数据字典',

    SEARCH_FROM: {
        layer: false,
        data: [
            { type: 'text', label: '字典编码', prop: 'dictCode' },
            { type: 'text', label: '字典名称', prop: 'dictName' },
            { type: 'select', label: '是否启用', prop: 'isEnable', async: true, options: 'isEnables', dic_key: 'DIC_KEY', dic_value: 'DIC_VALUE', filterByPipe: true },
        ],
        actions: [
            { type: 'submit', icon: 'search', label: '查询', color: 'primary', action: 'onSearch' },
            { type: 'reset', icon: 'refresh', label: '重置', color: '', action: 'onReset' }
        ]
    },

    FORM_CONFIG: {
        dictCode: [null, []],
        isEnable: [1, []],
        dictDesc: [null, []],
        dictName: [null, []]
    },
    UPDATE_ITEMS: {
        layer: true,
        data: [
            { type: 'text', label: '字典编码', prop: 'dictCode', rules: { maxlength: 50 } },
            { type: 'select', label: '是否启用', prop: 'isEnable', async: true, options: 'isEnables', filterByPipe: true },
            { type: 'text', label: '字典名称', prop: 'dictName', rules: { maxlength: 50 } },
            { type: 'textarea', label: '字典描述', prop: 'dictDesc', height: '48px', rules: { maxlength: 200 } },
        ],
        actions: [
            { type: 'submit', icon: 'save', label: '提交', color: 'primary', action: 'onSubmit' },
            { type: 'reset', icon: 'refresh', label: '重置', color: '', action: 'onReset' },
            { type: 'button', icon: 'close', label: '关闭', color: 'warn' }
        ]
    },

    UPDATE_FORM_CONFIG: {
        dictCode: [null, [Validators.required]],
        isEnable: [1, []],
        dictDesc: [null, []],
        dictName: [null, [Validators.required]],
    },

    FORM_ERRORS: {
        dictCode: "",
        dictName: "",
    },

    VALID_MES: {
        dictCode: {
            required: '字典编码不能为空',
        },
        dictName: {
            required: '字典名称不能为空',
        }
    },

    MESSAGE: {
        update_sucess: '数据字典修改成功',
        add_success: '数据字典添加成功',
        addTitle: '新增数据字典',
        updateTitle: '修改数据字典'
    }
}