// 工具包
import { Component } from '@angular/core';

// 组件
import { DialogComponent } from '../../../dialog/dialog.component';

// 配置
import { CTRL_COLS_CONFIG } from '../../ctrl-cols.config';

@Component({
    selector: 'available-cols-add',
    styleUrls: ['./add.component.scss'],
    templateUrl: './add.component.html'
})

export class OmsAvailableColsAddComponent extends DialogComponent {
    apiPath     : any = CTRL_COLS_CONFIG.API;                     // api接口
    formConfig  : any = CTRL_COLS_CONFIG.UPDATE_FORM_CONFIG;      // 跟新form配置
    formItems   : any = CTRL_COLS_CONFIG.UPDATE_ITEMS;            // 跟新内容
    message     : any = CTRL_COLS_CONFIG.MESSAGE;                 // 提示消息
}