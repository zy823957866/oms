import { SYSTEM_CONFIG } from 'src/app/framework/core/config/system.config';

export const COLUMN_CONFIG = {
    API: {
        ADD: SYSTEM_CONFIG.APP.OPTION_SERVER + '/' + SYSTEM_CONFIG.API.VERSION.V1 + '/viewCloumn' + SYSTEM_CONFIG.API.LIST.ADD.VALUE,
        QUERY_PAGE: SYSTEM_CONFIG.APP.OPTION_SERVER + '/' + SYSTEM_CONFIG.API.VERSION.V1 + '/viewCloumn' + SYSTEM_CONFIG.API.LIST.QUERY_PAGE.VALUE,
        DELETE_BY_ID: SYSTEM_CONFIG.APP.OPTION_SERVER + '/' + SYSTEM_CONFIG.API.VERSION.V1 + '/viewCloumn' + SYSTEM_CONFIG.API.LIST.DELETE_BY_ID.VALUE,
        UPDATE_BY_ID: SYSTEM_CONFIG.APP.OPTION_SERVER + '/' + SYSTEM_CONFIG.API.VERSION.V1 + '/viewCloumn' + SYSTEM_CONFIG.API.LIST.UPDATE_BY_ID.VALUE,
        QUERY_BY_ID: SYSTEM_CONFIG.APP.OPTION_SERVER + '/' + SYSTEM_CONFIG.API.VERSION.V1 + '/viewCloumn' + SYSTEM_CONFIG.API.LIST.QUERY_BY_ID.VALUE,
        UPDATE_BY_LIST: SYSTEM_CONFIG.APP.OPTION_SERVER + '/' + SYSTEM_CONFIG.API.VERSION.V1 + '/viewCloumn' + '/updateCloumnList.do',
    },

    SEARCH_FROM: {
        layer: false,
        data: [
            { type: 'text', label: '字段名', prop: 'cloumnName' },
            { type: 'text', label: '列编码', prop: 'cloumnCode' },  
            { type: 'select', label: '是否启用', prop: 'isEnable', async: true, options: 'isEnables', filterByPipe: true }
        ],
        actions: [
            { type: 'submit', icon: 'search', label: '查询', color: 'primary', action: 'onSearch' },
            { type: 'reset', icon: 'refresh', label: '重置', color: '', action: 'onReset' },
        ]
    },

    FORM_CONFIG: {
        cloumnName: [null, []],
        cloumnCode: [null, []],
        isEnable: [null, []],
    },

    TABLE_FRAME: [
        { name: '字段名', prop: 'cloumnName' },
        { name: '列的编码', prop: 'cloumnCode' },
        { name: '关联数据表名', prop: 'tableName' },
        { name: '是否启用', prop: 'isEnable', pipes: { dictionary: 'IS_ENABLE' } },
        { name: '列的类型', prop: 'cloumnType', pipes: { dictionary: 'CONT_CLOUMN_TYPE' } },
        { name: '列的字典', prop: 'dictCode' },
        { name: '宽度', prop: 'width' },
        { name: '水平位置', prop: 'textAlign', pipes: { dictionary: 'TEXT_ALIGN_TYPE' } },
        { name: '排序', prop: 'cloumnOrder' },
        { name: '列是否展示', prop: 'ifDisplay', pipes: { userDefine: '0' } },
        { name: '描述', prop: 'cloumnDesc' },
        {
            type: 'actions', name: '操作', actions: [
                { name: '修改', icon: 'edit', actionFun: 'onUpdate', auth: '' },
                { name: '删除', icon: 'delete', actionFun: 'onDelete', auth: '' },
            ]
        }
    ],

    UPDATE_ITEMS: {
        layer: true,
        data: [
            { type: 'text', label: '字段名', prop: 'cloumnName', rules: { maxlength: 100 } },
            { type: 'text', label: '列的编码', prop: 'cloumnCode', rules: { maxlength: 50 } },
            { type: 'text', label: '列的字典', prop: 'dictCode', rules: { maxlength: 50 } },
            { type: 'text', label: '英文名', prop: 'cloumnEngName', rules: { maxlength: 50 } },
            { type: 'text', label: '排序', prop: 'cloumnOrder', rules: { maxlength: 11 } },
            { type: 'select', label: '列的类型', prop: 'cloumnType', async: true, options: 'cloumnTypes', dic_key: 'DIC_KEY', dic_value: 'DIC_VALUE', filterByPipe: true },
            { type: 'select', label: '列是否显示', prop: 'ifDisplay', async: true, options: 'ifDisplays', dic_key: 'DIC_KEY', dic_value: 'DIC_VALUE', filterByPipe: true },
            { type: 'select', label: '是否启用', prop: 'isEnable', async: true, options: 'isEnables', dic_key: 'DIC_KEY', dic_value: 'DIC_VALUE', filterByPipe: true },
            { type: 'select', label: '水平位置', prop: 'textAlign', async: true, options: 'textAligns', dic_key: 'DIC_KEY', dic_value: 'DIC_VALUE', filterByPipe: true },
            { type: 'text', label: '宽度', prop: 'width', rules: { maxlength: 20 } },
            { type: 'text', label: '显示条件', prop: 'displayCond', rules: { maxlength: 200 } },
            { type: 'select', label: '是否排序', prop: 'ifOrder', async: true, options: 'isOrderBy', dic_key: 'DIC_KEY', dic_value: 'DIC_VALUE', filterByPipe: true },
            { type: 'textarea', label: '描述', prop: 'cloumnDesc', height: '48px', rules: { maxlength: 45 } }
        ],
        actions: [
            { type: 'submit', icon: 'save', label: '提交', color: 'primary', action: 'onSubmit' },
            { type: 'reset', icon: 'refresh', label: '重置', color: '', action: 'onReset' },
            { type: 'button', icon: 'close', label: '关闭', color: 'warn' }
        ]
    },

    UPDATE_FORM_CONFIG: {
        cloumnCode: [null, []],
        isEnable: [1, []],
        controlTableId: [null, []],
        ifDisplay: [null, []],
        cloumnName: [null, []],
        cloumnDesc: [null, []],
        controlTableName: [null, []],
        dictCode: [null, []],
        cloumnEngName: [null, []],
        cloumnOrder: [null, []],
        cloumnType: [null, []],
        textAlign: [null, []],
        width: [null, []],
        displayCond: [null, []],
        ifOrder: ['1', []]
    },

    MESSAGE: {
        update_sucess: '列的管理修改成功',
        add_success: '列的管理添加成功',
        addTitle: '新增列的管理',
        updateTitle: '修改列的管理'
    }
}