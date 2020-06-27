import { SYSTEM_CONFIG } from './system.config'

const PATH = {}

export const STRUCTURE_CONFIG = {
    SEARCH_DTO: {'isEnable': 1, 'isDelete': 0},

    //纳税主体
    DIC_TAXPAYER: {
        URL: SYSTEM_CONFIG.APP.OPTION_SERVER + '/' + SYSTEM_CONFIG.API.VERSION.V1 + '/taxpayer/queryTaxpayerListForStru.do',
        CODE_COLUMN: 'id',
        VALUE_COLUMN: 'taxpayerName',
    },

    GET_USERS_NAME: {
        URL: SYSTEM_CONFIG.APP.BASE_SERVER+ '/' + SYSTEM_CONFIG.API.VERSION.V1 + '/user/queryUserList.do',
        CODE_COLUMN: 'id',
        VALUE_COLUMN: 'userNo'
    }
}
