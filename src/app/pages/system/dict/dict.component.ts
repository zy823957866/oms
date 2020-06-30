// 工具包
import { Component, Injector, HostBinding } from '@angular/core';

// 组件
import { BaseComponent } from 'src/app/framework/core/component/base/base.component';
import { DictAddComponent } from './add/add.component';

// 配置
import { DICT_CONFIG } from './dict.config';

// 工具包
import { DictItemsComponent } from './items/items.component';

// 动画
import { routeAnimation } from 'src/app/framework/core/animations/route-animate';


@Component({
    selector: 'oms-dict',
    styleUrls: ['./dict.component.scss'],
    templateUrl: './dict.component.html',
    animations: [ routeAnimation ]
})

export class OmsDictComponent extends BaseComponent {
    // 动画
    @HostBinding('@routeAnimation') routeAnimation = true;

    // 页面基础配置
    searchItems : any = DICT_CONFIG.SEARCH_FROM;         // 查询条件
    formConfig  : any = DICT_CONFIG.FORM_CONFIG;         // 查询配置
    apiPath     : any = DICT_CONFIG.API;                 // api接口
    exportName  : any = DICT_CONFIG.EXPORT_NAME;         // 设置导出文件名
    addComponent: any = DictAddComponent;                // 新增 编辑弹框
    
    constructor( public injector: Injector ) { super(injector);}

    // 设置弹框
    setting(row) {
        this.dialog.open(DictItemsComponent, {
            width: '70%',
            data: { id: row.id, dictName: row.dictName },
            disableClose: true
        }).afterClosed().subscribe(res => {
            
        })
    }
}