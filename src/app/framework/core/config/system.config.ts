export const SYSTEM_CONFIG = {
    //默认语言设置
    LANGUAGE: 'zh_CN',

    MESSAGE: {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
    },

    WINDOW: {
        RESIZE_TIME_OUT: 500
    },

    EVENT: {
        MOUSE: {
            DOUBLE_CLICK: 'dblclick',
            ENTER: 'mouseenter',
            CLICK: 'click'
        }
    },

    PAGE_DTO: {
        pageNo: 0,
        pageSize: 20,
        pageCount: 0,
        totalCount: 0,
        currentSize:1
    },

    APP: {
        BASE_SERVER: '/api-base',
        OPTION_SERVER: '/api-option',
        VAT_SERVER: '/api-vat',
        CIT_SERVER: '/api-cit',
        GATEWAY_SERVER: '/api-gateway',
        REPORT_SERVER:'/api-report',
        ENTER_SERVER:'/api-enter',
        FINANCE_SERVER: '/api-finance',
        DOC_SERVER: '/api-doc',
        RECEIPT_SERVER: '/api-receipt',
        FILE_SERVER: '/api-file',
        ASSET_SERVER: '/api-asset',
        CARRY_SERVER: '/api-carry',
        OUTPUT_SERVER: '/api-output',
        RISK_SERVER: '/api-risk',
        OTHER_SERVER: '/api-other',
        STAT_SERVER: '/api-stat'
    },

    API: {
        VERSION:{V1:'v1',V2:'v2'},
        LIST:{
            ADD: {NAME: 'ADD', VALUE: '/add.do'},
            ADD_LIST: {NAME: 'ADD_LIST', VALUE: '/addList.do'},
            DELETE_BY_ID: {NAME: 'DELETE_BY_ID', VALUE: '/deleteById.do'},
            DELETE_BY_ID_LIST: {NAME: 'DELETE_BY_ID_LIST', VALUE: '/deleteByIdList.do'},
            UPDATE_BY_ID: {NAME: 'UPDATE_BY_ID', VALUE: '/updateById.do'},
            QUERY_BY_ID: {NAME: 'QUERY_BY_ID', VALUE: '/queryById.do'},
            QUERY_LIST: {NAME: 'QUERY_LIST', VALUE: '/queryList.do'},
            QUERY_PAGE: {NAME: 'QUERY_PAGE', VALUE: '/queryPage.do'},
            QUERY_COUNT: {NAME: 'QUERY_COUNT', VALUE: '/queryCount.do'},
            QUERY_LIST_BY_DICT_CODE: {NAME: 'QUERY_LIST_BY_DICT_CODE', VALUE: '/queryListByDictCode.do'},
            EXPORT: {NAME: 'EXPORT', VALUE: '/export.do'},
            IMPORT_SINGLE_SHEET_EXCEL: {NAME: 'IMPORT_SINGLE_SHEET_EXCEL', VALUE: '/importSingleSheetExcel.do'},
            IMPORT_MULTI_SHEET_EXCEL: {NAME: 'IMPORT_MULTI_SHEET_EXCEL', VALUE: '/importMultiSheetExcel.do'},
            MULTIFY_DELETE: {NAME: 'MULTIFY_DELETE', VALUE: '/multifyDelete.do'}
        },
        COLS:{
            UPDATE_BY_ID: {NAME: 'UPDATE_BY_ID', VALUE: '/updateById.do'},
            QUERY_BY_ID: {NAME: 'QUERY_BY_ID', VALUE: '/queryById.do'},
            QUERY_PAGE: {NAME: 'QUERY_PAGE', VALUE: '/userQueryPage.do'},
        }
    },

    DOWN_LOAD: {
        TYPE: {
            XLSX: 'oms-xlsx',
            XLS: 'oms-xls',
            CSV: 'oms-csv',
            TXT: 'oms-txt'
        }
    },
    DATE_LOCAL: 'zh_CN',

}