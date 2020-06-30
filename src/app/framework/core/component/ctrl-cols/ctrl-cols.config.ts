import { SYSTEM_CONFIG } from '../../config/system.config';

export const CTRL_COLS_CONFIG = {
    API:{
        QUERY_PAGE: SYSTEM_CONFIG.APP.OPTION_SERVER + '/' + SYSTEM_CONFIG.API.VERSION.V1 + '/viewCloumn' + SYSTEM_CONFIG.API.COLS.QUERY_PAGE.VALUE,
        QUERY_BY_ID: SYSTEM_CONFIG.APP.OPTION_SERVER + '/' + SYSTEM_CONFIG.API.VERSION.V1 + '/viewCloumn' + SYSTEM_CONFIG.API.COLS.QUERY_BY_ID.VALUE,
        UPDATE_BY_ID: SYSTEM_CONFIG.APP.OPTION_SERVER + '/' + SYSTEM_CONFIG.API.VERSION.V1 + '/viewCloumn' + SYSTEM_CONFIG.API.COLS.UPDATE_BY_ID.VALUE,
        UPDATE_BY_LIST: SYSTEM_CONFIG.APP.OPTION_SERVER + '/' + SYSTEM_CONFIG.API.VERSION.V1 + '/viewCloumn' + '/updateCloumnList.do',
    },

    TABLE_FRAME: [
        { name: '字段名', prop: 'cloumnName'},
        { name: '排序', prop: 'cloumnOrder'},
        { name: '列是否显示', prop: 'ifDisplay', pipes: { userDefine: '0' }},
        { name: '描述', prop: 'cloumnDesc'},
        {
            type: 'actions', name: '操作', actions: [
                { name: '修改', icon: 'edit', actionFun: 'onUpdate', auth: '' }
            ]
        }
    ],

    SEARCH_ITEMS: {
        isLayer: false,
        data: [
            { type: 'text', label: '字段名', prop: 'cloumnName'},
        ],
        actions: [
            // 查询
            { type: 'submit', icon: 'search', label: '查询', color: 'primary', action: 'onSearch' },
            // 重置
            { type: 'reset', icon: 'refresh', label: '重置', color: '', action: 'onReset' },
        ]
    },

    FORM_CONFIG: {
        cloumnName: [null, []]
    },

    UPDATE_ITEMS: {
        layer: true,
        data: [
            { type: 'text', label: '字段名', prop: 'cloumnName', disabled: true, rules: { maxlength: 100 } },
            { type: 'select', label: '列是否显示', prop: 'ifDisplay', async: true, options: 'ifDisplays', filterByPipe: true },
            { type: 'text', label: '排序', prop: 'cloumnOrder', rules: { maxlength: 11 } },
            { type: 'textarea', label: '描述', prop: 'cloumnDesc', height: '42px', disabled: true, rules: { maxlength: 45 } }
        ],
        actions: [
            { type: 'submit', icon: 'save', label: '提交', color: 'primary', action: 'onSubmit' },
            { type: 'reset', icon: 'refresh', label: '重置', color: '', action: 'onReset' },
            { type: 'button', icon: 'close', label: '关闭', color: 'warn' }
        ]
    },

    UPDATE_FORM_CONFIG: {
        cloumnName: [null, []],
        cloumnOrder: [null, []],
        ifDisplay: ['1', []],
        cloumnDesc: [null, []]
    },

    MESSAGE: {
        update_sucess: '自定义列修改成功'
    }

}