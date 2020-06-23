// 工具包
import { Component, Injector, HostBinding } from '@angular/core';

// 组件
import { BaseComponent } from 'src/app/framework/core/component/base/base.component';

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
    @HostBinding('@routeAnimation') routeAnimation = true;
    
    searchItems : any = SYSTEM_VIEW_CONFIG.SEARCH_FROM;         // 查询条件
    formConfig  : any = SYSTEM_VIEW_CONFIG.FORM_CONFIG;         // 查询配置
    apiPath     : any = SYSTEM_VIEW_CONFIG.API;                 // api接口
    tableFrame  : any = SYSTEM_VIEW_CONFIG.TABLE_FRAME;         // table头部

    options = this.initDict.isEnables()
    
    constructor( public injector: Injector ) { super(injector);}

}