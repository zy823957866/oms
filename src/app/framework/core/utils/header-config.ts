// button提示信息
export const actionTips = {

}

// 按钮二次封装
export const actions = {
    // 设置
    setting: { name: '设置', icon: 'build', actionFun: 'setting' },

    // 修改
    edit: { name: '修改', icon: 'edit', actionFun: 'onUpdate' },

    // 删除
    delete: { name: '删除', icon: 'delete', actionFun: 'onDelete' },

    //角色用户
    user: { name: '用户', icon: 'person', actionFun: 'openUser' },

    //克隆角色
    copyRole: { name: '克隆角色', icon: 'chrome_reader_mode', actionFun: 'copyRole' },
}

export const headerCodeConfig = {
    // 视图管理
    'system_view': { hasCheck: true, code: 'EyViewManagement', actions: [{ btn: 'setting', auth: '' }, { btn: 'edit', auth: '' }, { btn: 'delete', auth: '' }] },

    // 数据字典
    'system_dict': { hasCheck: true, code: 'EyOptionDictionary', actions: [{ btn: 'setting', auth: '' }, { btn: 'edit', auth: '' }, { btn: 'delete', auth: '' }] },
    
    // 数据字典-设置
    'system_dict_setting': { hasCheck: true, code: 'EySettingDictionary', actions: [{ btn: 'edit', auth: '' }, { btn: 'delete', auth: '' }] },

    // 角色管理
    'system_role': { hasCheck: true, code: 'EyAuthRole', actions: [{ btn: 'copyRole', auth: '' }, { btn: 'user', auth: '' }, { btn: 'setting', auth: '' }, { btn: 'edit', auth: '' }, { btn: 'delete', auth: '' }] },

}