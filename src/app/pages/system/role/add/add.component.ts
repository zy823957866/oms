// 工具包
import { Component } from '@angular/core';

// 组件
import { DialogComponent } from 'src/app/framework/core/component/dialog/dialog.component';

// 配置
import { ROLE_CONFIG } from '../role.config';

@Component({
    selector: 'role-add',
    styleUrls: ['./add.component.scss'],
    templateUrl: './add.component.html'
})

export class RoleAddComponent extends DialogComponent{
    apiPath     : any = ROLE_CONFIG.API;                     // api接口
    formConfig  : any = ROLE_CONFIG.UPDATE_FORM_CONFIG;      // 跟新form配置
    formItems   : any = ROLE_CONFIG.UPDATE_ITEMS;            // 跟新内容
    message     : any = ROLE_CONFIG.MESSAGE;                 // 跟新内容
    formErrors  : any = ROLE_CONFIG.FORM_ERRORS;             // 错误信息
    validMes    : any = ROLE_CONFIG.VALID_MES;               // 错误提示信息
}