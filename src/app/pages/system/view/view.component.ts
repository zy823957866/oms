// 工具包
import { Component, Injector, HostBinding } from '@angular/core';

// 组件
import { BaseComponent } from 'src/app/framework/core/component/base/base.component';
import { ViewAddComponent } from './add/add.component';
import { OmsViewColumnComponent } from './column/column.component';

// 配置
import { SYSTEM_VIEW_CONFIG } from './view.config';

// 动画
import { routeAnimation } from 'src/app/framework/core/animations/route-animate';


@Component({
    selector: 'oms-system-view',
    styleUrls: [ './view.component.scss' ],
    templateUrl: './view.component.html',
    animations: [ routeAnimation ]
})

export class SystemViewComponent extends BaseComponent {
    // 动画
    @HostBinding('@routeAnimation') routeAnimation = true;
    
    // 页面基础配置
    searchItems : any = SYSTEM_VIEW_CONFIG.SEARCH_FROM;         // 查询条件
    formConfig  : any = SYSTEM_VIEW_CONFIG.FORM_CONFIG;         // 查询配置
    apiPath     : any = SYSTEM_VIEW_CONFIG.API;                 // api接口
    exportName  : any = SYSTEM_VIEW_CONFIG.EXPORT_NAME;         // 设置导出文件名
    addComponent: any = ViewAddComponent;                       // 新增 编辑弹框

    // 下拉数据
    options = this.initDict.isEnables();
    
    constructor( public injector: Injector ) { super(injector);}


    // 设置弹框
    setting(row) {
        this.dialog.open(OmsViewColumnComponent, {
            width: '70%',
            data: { id: row.id },
            disableClose: true
        }).afterClosed().subscribe(res => {
            
        })
    }
}