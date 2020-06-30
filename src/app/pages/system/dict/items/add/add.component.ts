// 工具包
import { Component } from '@angular/core';

// 组件
import { DialogComponent } from 'src/app/framework/core/component/dialog/dialog.component';

// 配置
import { DICT_ITEMS_CONFIG } from '../items.config';

@Component({
    selector: 'dict-items-add',
    styleUrls: ['./add.component.scss'],
    templateUrl: './add.component.html'
})

export class DictItemsAddComponent extends DialogComponent {
    apiPath     : any = DICT_ITEMS_CONFIG.API;                     // api接口
    formItems   : any = DICT_ITEMS_CONFIG.UPDATE_ITEMS;            // 跟新内容
    message     : any = DICT_ITEMS_CONFIG.MESSAGE;                 // 跟新内容
    formErrors  : any = DICT_ITEMS_CONFIG.FORM_ERRORS;             // 错误信息
    validMes    : any = DICT_ITEMS_CONFIG.VALID_MES;               // 错误提示信息
    formConfig  : any = Object.assign({},                          // 跟新form配置
                    DICT_ITEMS_CONFIG.UPDATE_FORM_CONFIG,
                    { dictId: [this.data.dictId, []] }
                );     
}