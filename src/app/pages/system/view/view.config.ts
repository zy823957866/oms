export const SYSTEM_VIEW_CONFIG = {
    API: {
        QUERY_PAGE: '/api-option/v1/viewTable/queryPage.do'
    },

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

    TABLE_FRAME: [
        { type: 'checkbox' },
        { name: '数据表编码', prop: 'tableCode' },
        { name: '表名', prop: 'tableName' },
        { name: '是否启用', prop: 'isEnable' },
        { name: '描述', prop: 'tableDesc' },
        { name: '用户名称', prop: 'userId' }
    ],
}