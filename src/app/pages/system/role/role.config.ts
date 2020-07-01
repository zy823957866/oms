import { SYSTEM_CONFIG } from 'src/app/framework/core/config/system.config';
import { Validators } from '@angular/forms';

export const ROLE_CONFIG = {
    API: {
        ADD: SYSTEM_CONFIG.APP.BASE_SERVER + '/' + SYSTEM_CONFIG.API.VERSION.V1 + '/role' + SYSTEM_CONFIG.API.LIST.ADD.VALUE,
        DELETE_BY_ID: SYSTEM_CONFIG.APP.BASE_SERVER + '/' + SYSTEM_CONFIG.API.VERSION.V1 + '/role' + SYSTEM_CONFIG.API.LIST.DELETE_BY_ID.VALUE,
        DELETE_BY_ID_LIST: SYSTEM_CONFIG.APP.BASE_SERVER + '/' + SYSTEM_CONFIG.API.VERSION.V1 + '/role' + SYSTEM_CONFIG.API.LIST.DELETE_BY_ID_LIST.VALUE,
        UPDATE_BY_ID: SYSTEM_CONFIG.APP.BASE_SERVER + '/' + SYSTEM_CONFIG.API.VERSION.V1 + '/role' + SYSTEM_CONFIG.API.LIST.UPDATE_BY_ID.VALUE,
        QUERY_BY_ID: SYSTEM_CONFIG.APP.BASE_SERVER + '/' + SYSTEM_CONFIG.API.VERSION.V1 + '/role' + SYSTEM_CONFIG.API.LIST.QUERY_BY_ID.VALUE,
        QUERY_PAGE: SYSTEM_CONFIG.APP.BASE_SERVER + '/' + SYSTEM_CONFIG.API.VERSION.V1 + '/role' + SYSTEM_CONFIG.API.LIST.QUERY_PAGE.VALUE,
        // 查询所有资源
        QUERY_LIST: SYSTEM_CONFIG.APP.BASE_SERVER + '/' + SYSTEM_CONFIG.API.VERSION.V1 + '/resource' + SYSTEM_CONFIG.API.LIST.QUERY_LIST.VALUE,
        // 查找角色对应得资源
        QUERY_RESOURCE_BY_ROLEID: SYSTEM_CONFIG.APP.BASE_SERVER + '/' + SYSTEM_CONFIG.API.VERSION.V1 + '/roleResource/queryResourceByRoleId.do',
    },

    EXPORT_NAME: '角色管理',

    SEARCH_FROM: {
        layer: false,
        data: [
            { type: 'text', label: '角色编码', prop: 'roleCode' },
            { type: 'text', label: '角色名称', prop: 'roleName' },
            { type: 'select', label: '角色类型', prop: 'roleType', async: true, options: 'roleTypes', filterByPipe: true },
            { type: 'select', label: '是否启用', prop: 'isEnable', async: true, options: 'isEnables', filterByPipe: true }
        ],
        actions: [
            { type: 'submit', icon: 'search', label: '查询', color: 'primary', action: 'onSearch' },
            { type: 'reset', icon: 'refresh', label: '重置', color: '', action: 'onReset' }
        ]
    },

    FORM_CONFIG: {
        roleCode: [null, []],
        roleName: [null, []],
        roleType: [null, []],
        isEnable: [1, []]
    },

    UPDATE_ITEMS: {
        layer: true,
        data: [
            { type: 'text', label: '角色编码', prop: 'roleCode', rules: { maxlength: 20 } },
            { type: 'text', label: '角色名称', prop: 'roleName', rules: { maxlength: 20 } },
            { type: 'select', label: '角色类型', prop: 'roleType', async: true, options: 'roleTypes', filterByPipe: true },
            { type: 'select', label: '是否启用', prop: 'isEnable', async: true, options: 'isEnables', filterByPipe: true },
            { type: 'textarea', label: '角色描述', prop: 'roleDesc', height: '48px', rules: { maxlength: 50 } },
        ],
        actions: [
            { type: 'submit', icon: 'save', label: '提交', color: 'primary', action: 'onSubmit' },
            { type: 'reset', icon: 'refresh', label: '重置', color: '', action: 'onReset' },
            { type: 'button', icon: 'close', label: '关闭', color: 'warn' }
        ]
    },

    UPDATE_FORM_CONFIG: {
        roleDesc: [null, []],
        roleType: [null, []],
        isEnable: [1, [Validators.required]],
        roleName: [null, [Validators.required]],
        roleCode: [null, [Validators.required]],
    },

    FORM_ERRORS: {
        isEnable: '',
        roleName: '',
        roleCode: ''
    },

    VALID_MES: {
        isEnable: {
            required: '是否启用不能为空'
        },
        roleName: {
            required: '角色名称不能为空'
        },
        roleCode: {
            required: '角色编码不能为空'
        }
    },

    MESSAGE: {
        update_sucess: '角色修改成功',
        add_success: '角色添加成功',
        addTitle: '新增角色',
        updateTitle: '修改角色'
    }
}