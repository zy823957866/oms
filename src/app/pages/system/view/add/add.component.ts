// 工具包
import { Component } from '@angular/core';

// 组件
import { DialogComponent } from 'src/app/framework/core/component/dialog/dialog.component';

// 配置
import { SYSTEM_VIEW_CONFIG } from '../view.config';

@Component({
    selector: 'view-add',
    styleUrls: ['./add.component.scss'],
    templateUrl: './add.component.html'
})

export class ViewAddComponent extends DialogComponent {
    apiPath     : any = SYSTEM_VIEW_CONFIG.API;                     // api接口
    formConfig  : any = SYSTEM_VIEW_CONFIG.UPDATE_FORM_CONFIG;      // 跟新form配置
    formItems   : any = SYSTEM_VIEW_CONFIG.UPDATE_ITEMS;            // 跟新内容
    message     : any = SYSTEM_VIEW_CONFIG.MESSAGE;                 // 跟新内容
}