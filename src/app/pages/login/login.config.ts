import { Validators } from '@angular/forms';

export const LOGIN_CONFIG = {
    API: {
        SUBMIT: '/api-base/v1/auth/login.do'
    },

    FORM_CONFIG: {
        userName: [ '', [Validators.required, Validators.pattern('^([u4e00-u9fa5]|[ufe30-uffa0]|[a-za-z0-9_@.])*$') ]],
        userPass: [ '', [ Validators.required, Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'), Validators.minLength(6), Validators.maxLength(25) ] ]
    },

    FORM_ERROR: {
        userName: '',
        userPass: ''
    },

    VALID_MESSAGE: {
        userName: {
            required: '请输入您的账号',
            pattern: '请输入正确的账号'
        },
        userPass: {
            required: '请输入您的密码',
            pattern: '密码中必须包含数字和字母',
            minlength: '请输入大于6个字符',
            maxlength: '请输入小于25个字符'
        }
    }
}