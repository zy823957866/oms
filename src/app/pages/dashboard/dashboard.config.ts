export const DASHBOAR_CONFIG = {
    TABLE_FRAME: [
        { name: '资产代码', prop: 'assetCode' },
        { name: '资产原值', prop: 'initialAmt' },
        { name: '是否启用', prop: 'isEnable' },
    ],

    SEARCH_FROM: {
        layer: false,
        data: [
            { type: 'select', label: '纳税主体列表', prop: 'taxPayerId', options: 'taxPayerList', cb: "taxPayerIdCb" },
            { type: 'select', label: '状态', prop: 'taskStatus', options: 'returnTaskStatusList'},
            { type: 'date', label: '年', prop: ['taskYear'], dateType: 'yyyy-MM-dd', single: true, name: 'daterange' },
            { type: 'text', label: '任务名称', prop: 'taskName' },
            { type: 'text', label: '任务描述', prop: 'taskDesc' },
            { type: 'text', label: '任务编码', prop: 'taskCode' },
        ],

        actions: [
            { type: 'submit', icon: 'search', label: '查询', color: 'primary', action: 'onSearch' },
            { type: 'reset', icon: 'refresh', label: '重置', color: '', action: 'onReset' },
            { type: 'hasMore', searchExpand: true }
        ]
    },

    FORM_CONFIG: {
        taskYear: [null, []],
        taskName: [null, []],
        taskPeriod: [null, []],
        taskStatus: [null, []],
        taskDesc: [null, []],
        taxCategoryId: [null, []],
        taskCode: [null, []],
        taxPayerId: [null, []],
    },
}