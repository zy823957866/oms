export const DRAWER_CONFIG = {
    // 默认配置
    DEFAULE: {
        // 主题色
        primary: '#0cb495',

        // 文字颜色
        txColor: '#333',
        txAssitColor: '#afafaf',
        requiredColor: 'red',
        successColor: '#5ec82a',
        errorColor: '#f5222d',
        warnColor: '#f99f04',

        // 内容间距
        hSpace: '40px',
        vSpace: '15px',

        // 输入框设置
        formBorderRadius: '3px',
        formH: '34px',

        // 按钮
        primaryBg: '#0cb495',
        primaryFontSize: '14px',
        primaryFontColor: '#fff',
        primaryFontHeight: '34px',
        primaryFontBorder: '1px solid #0cb495',
        primaryFontRadius: '0px',
        primaryHoverColor: '#fff',
        primaryHoverBorder: '1px solid #0cb495',

        restBg: '#f4f4f4',
        restFontSize: '14px',
        restFontColor: 'rgba(0, 0, 0, 0.65)',
        restFontHeight: '34px',
        restFontBorder: '1px solid #d9d9d9',
        restFontRadius: '0px',
        restHoverColor: '#0cb495',
        restHoverBorder: '1px solid #0cb495',

        closeBg: '#fff',
        closeFontSize: '14px',
        closeFontColor: 'rgba(0, 0, 0, 0.65)',
        closeFontHeight: '34px',
        closeFontBorder: '1px solid #d9d9d9',
        closeFontRadius: '0px',
        closeHoverColor: '#0cb495',
        closeHoverBorder: '1px solid #0cb495',

        // 菜单
        menuBg: '#3c4252',
        menuColor: '#fff',
        menuActiveBg: '#0cb495',
        menuActiveBorder: 'none',
        menuActiveColor: '#fff'
    },

    // 推荐主题颜色
    COLORS: [
        '#0cb495', '#f54336', '#e91f63', '#9b27b0', '#683ab7', '#3f51b6', '#3f51b6', 
        '#2097f3', '#01bcd6', '#009688', '#4cb051', '#8bc349', '#cddc3a', '#ffec3c', 
        '#face1e', '#ff9800', '#ff5723', '#5f7d8c'],

    // 按钮设置
    BTNS: [
        { type: 'primary', props: [
            { name: '按钮背景', prop: 'primaryBg' },
            { name: '字体大小', prop: 'primaryFontSize' },
            { name: '字体颜色', prop: 'primaryFontColor' },
            { name: '字体行高', prop: 'primaryFontHeight' },
            { name: '按钮边框', prop: 'primaryFontBorder' },
            { name: '按钮圆角', prop: 'primaryFontRadius' },
            { name: '悬浮颜色', prop: 'primaryHoverColor' },
            { name: '悬浮边框', prop: 'primaryHoverBorder' },
        ] },
        { type: 'rest', props: [
            { name: '按钮背景', prop: 'restBg' },
            { name: '字体大小', prop: 'restFontSize' },
            { name: '字体颜色', prop: 'restFontColor' },
            { name: '字体行高', prop: 'restFontHeight' },
            { name: '按钮边框', prop: 'restFontBorder' },
            { name: '按钮圆角', prop: 'restFontRadius' },
            { name: '悬浮颜色', prop: 'restHoverColor' },
            { name: '悬浮边框', prop: 'restHoverBorder' },
        ] },
        { type: 'close', props: [
            { name: '按钮背景', prop: 'closeBg' },
            { name: '字体大小', prop: 'closeFontSize' },
            { name: '字体颜色', prop: 'closeFontColor' },
            { name: '字体行高', prop: 'closeFontHeight' },
            { name: '按钮边框', prop: 'closeFontBorder' },
            { name: '按钮圆角', prop: 'closeFontRadius' },
            { name: '悬浮颜色', prop: 'closeHoverColor' },
            { name: '悬浮边框', prop: 'closeHoverBorder' },
        ] }
    ],

    MENUS: [
        { name: '菜单背景', prop: 'menuBg' },
        { name: '文字颜色', prop: 'menuColor' },
        { name: '激活背景', prop: 'menuActiveBg' },
        { name: '激活颜色', prop: 'menuActiveColor' },
        { name: '激活边框', prop: 'menuActiveBorder' },
    ],

    TXCOLORS: [
        { name: '文字主色系', prop: 'txColor' },
        { name: '文字辅色系', prop: 'txAssitColor' },
        { name: '必填项颜色', prop: 'requiredColor' },
        { name: '成功颜色', prop: 'successColor' },
        { name: '失败颜色', prop: 'errorColor' },
        { name: '警告颜色', prop: 'warnColor' },
    ],

    SPACE: [
        { name: '水平间距', prop: 'hSpace' },
        { name: '垂直间距', prop: 'vSpace' }
    ],

    FORM: [
        { name: '圆角大小', prop: 'formBorderRadius' },
        { name: '垂直高度', prop: 'formH' }
    ],

    // 操作按钮
    ACTIONS: [
        { type: 'submit', icon: 'wrap_text', label: '生成代码', color: 'primary', action: 'onReset' }
    ]
}