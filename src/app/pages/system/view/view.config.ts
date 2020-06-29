import { SYSTEM_CONFIG } from 'src/app/framework/core/config/system.config';

export const SYSTEM_VIEW_CONFIG = {
    API: {
        QUERY_PAGE: '/api-option/v1/viewTable/queryPage.do',
        QUERY_BY_ID: SYSTEM_CONFIG.APP.OPTION_SERVER + '/' + SYSTEM_CONFIG.API.VERSION.V1 + '/viewTable' + SYSTEM_CONFIG.API.LIST.QUERY_BY_ID.VALUE,
        UPDATE_BY_ID: SYSTEM_CONFIG.APP.OPTION_SERVER + '/' + SYSTEM_CONFIG.API.VERSION.V1 + '/viewTable' + SYSTEM_CONFIG.API.LIST.UPDATE_BY_ID.VALUE,
        ADD: SYSTEM_CONFIG.APP.OPTION_SERVER + '/' + SYSTEM_CONFIG.API.VERSION.V1 + '/viewTable' + SYSTEM_CONFIG.API.LIST.ADD.VALUE,
    },

    EXPORT_NAME: '视图管理',

    SEARCH_FROM: {
        layer: false,
        data: [
            { type: 'text', label: '数据表编码', prop: 'tableCode' },
            { type: 'text', label: '表名', prop: 'tableName' },
            { type: 'select', label: '是否启用', prop: 'isEnable', async: true, options: 'isEnables', filterByPipe: true },
            { type: 'select', label: '用户类型', prop: 'userCategory', async: true, options: 'userType', filterByPipe: true, actionFun: 'userCategoryChange' },
            { type: 'userDefine', template: 0 }
        ],
        actions: [
            { type: 'submit', icon: 'search', label: '查询', color: 'primary', action: 'onSearch' },
            { type: 'reset', icon: 'refresh', label: '重置', color: '', action: 'onReset' },
            { type: 'hasMore', searchExpand: true }
        ]
    },

    FORM_CONFIG: {
        tableCode: [null, []],
        tableName: [null, []],
        isEnable: [null, []],
        userCategory: [null, []],
        userId: [null, []]
    },

    UPDATE_ITEMS: {
        layer: true,
        data: [
            { type: 'text', label: '表名', prop: 'tableName', rules: { maxlength: 100 } },
            { type: 'select', label: '是否启用', prop: 'isEnable', async: true, options: 'isEnables', dic_key: 'DIC_KEY', dic_value: 'DIC_VALUE', filterByPipe: true },
            { type: 'text', label: '数据表编码', prop: 'tableCode', rules: { maxlength: 50 } },
            { type: 'textarea', label: '描述', prop: 'tableDesc', height: '48px', rules: { maxlength: 200 } },
        ],
        actions: [
            { type: 'submit', icon: 'save', label: '提交', color: 'primary', action: 'onSubmit' },
            { type: 'reset', icon: 'refresh', label: '重置', color: '', action: 'onReset' }, 
            { type: 'button', icon: 'close', label: '关闭', color: 'warn' }
        ]
    },

    UPDATE_FORM_CONFIG: {
        tableName: [null, []],
        isEnable: [1, []],
        tableCode: [null, []],
        tableDesc: [null, []],
    },

    MESSAGE: {
        update_sucess: '修改成功',
        add_success: '新增成功',
        addTitle: '新增视图表的管理',
        updateTitle: '修改视图表的管理'
    }
}