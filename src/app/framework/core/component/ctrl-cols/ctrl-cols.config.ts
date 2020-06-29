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
            type: 'actions', tt: '操作', name: 'PUBLIC.ACTION', actions: [
                { tt: '修改', name: 'PUBLIC.EDIT', icon: 'edit', actionFun: 'onUpdate', auth: '' }
            ]
        }
    ],

    SEARCH_ITEMS: {
        isLayer: false,
        data: [
            { type: 'input', label: '字段名', prop: 'cloumnName'},
        ],
        actions: [
            // 查询
            { type: 'submit', icon: 'search', label: '查询', color: 'primary', action: 'onSearch' },
            // 重置
            { type: 'reset', icon: 'refresh', label: '充值', color: '', action: 'onReset' },
        ]
    },

    FORM_CONFIG: {
        cloumnName: [null, []]
    },

}