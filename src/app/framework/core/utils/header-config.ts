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
}

export const headerCodeConfig = {
    // 视图管理
    'system_view': { hasCheck: true, code: 'EyViewManagement', actions: [{ btn: 'setting', auth: '' }, { btn: 'edit', auth: '' }, { btn: 'delete', auth: '' }] },

    // 数据字典
    'system_dict': { hasCheck: true, code: 'EyOptionDictionary', actions: [{ btn: 'setting', auth: '' }, { btn: 'edit', auth: '' }, { btn: 'delete', auth: '' }] },
    // 数据字典-设置
    'system_dict_setting': { hasCheck: true, code: 'EySettingDictionary', actions: [{ btn: 'edit', auth: '' }, { btn: 'delete', auth: '' }] }
}