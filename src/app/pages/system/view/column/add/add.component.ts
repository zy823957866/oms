// 工具包
import { Component } from '@angular/core';

// 组件
import { DialogComponent } from 'src/app/framework/core/component/dialog/dialog.component';

// 配置
import { COLUMN_CONFIG } from '../column.config';

@Component({
    selector: 'column-add',
    styleUrls: ['./add.component.scss'],
    templateUrl: './add.component.html'    
})

export class ColumnAddComponent extends DialogComponent{
    apiPath     : any = COLUMN_CONFIG.API;                     // api接口
    formItems   : any = COLUMN_CONFIG.UPDATE_ITEMS;            // 跟新内容
    message     : any = COLUMN_CONFIG.MESSAGE;                 // 跟新内容
    formConfig  : any = Object.assign({},                      // 跟新form配置
                            COLUMN_CONFIG.UPDATE_FORM_CONFIG,
                            { controlTableId: [this.data.controlTableId, []] }
                        );      
}