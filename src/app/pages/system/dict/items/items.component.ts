// 工具包
import { Component, Injector, Inject } from '@angular/core';

// 组件
import { BaseComponent } from 'src/app/framework/core/component/base/base.component';
import { DictItemsAddComponent } from './add/add.component';

// 配置
import { DICT_ITEMS_CONFIG } from './items.config';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
    selector: 'dict-items',
    styleUrls: ['./items.component.scss'],
    templateUrl: './items.component.html'
})

export class DictItemsComponent extends BaseComponent{
    apiPath     : any = DICT_ITEMS_CONFIG.API;              // api接口
    code        : string = 'setting';                       // 设置页面code 
    exportName  : string = DICT_ITEMS_CONFIG.EXPORT_NAME;   // 导出的文件名
    formConfig  : any = { dictId: this.data.id };           // 查询配置 
    addComponent: any = DictItemsAddComponent;              // 新增 编辑弹框        

    constructor( 
        public injector: Injector,
        @Inject(MAT_DIALOG_DATA) public data: any 
    ) { 
        super(injector);
    }

    // 新增传输数据插槽
    data2NewDialog(){
        return { dictId: this.data.id };
    }
}
