// 工具包
import { Component } from '@angular/core';

// 组件
import { DialogComponent } from 'src/app/framework/core/component/dialog/dialog.component';

// 配置
import { DICT_CONFIG } from '../dict.config';

@Component({
    selector: 'dict-add',
    styleUrls: ['./add.component.scss'],
    templateUrl: './add.component.html'
})

export class DictAddComponent extends DialogComponent {
    apiPath     : any = DICT_CONFIG.API;                     // api接口
    formConfig  : any = DICT_CONFIG.UPDATE_FORM_CONFIG;      // 跟新form配置
    formItems   : any = DICT_CONFIG.UPDATE_ITEMS;            // 跟新内容
    message     : any = DICT_CONFIG.MESSAGE;                 // 跟新内容
    formErrors  : any = DICT_CONFIG.FORM_ERRORS;             // 错误信息
    validMes    : any = DICT_CONFIG.VALID_MES;               // 错误提示信息
}