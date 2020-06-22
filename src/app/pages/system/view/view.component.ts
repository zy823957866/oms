// 工具包
import { Component, Injector } from '@angular/core';

// 组件
import { BaseComponent } from 'src/app/framework/core/component/base/base.component';

// 配置
import { SYSTEM_VIEW_CONFIG } from './view.config';


@Component({
    selector: 'oms-system-view',
    styleUrls: [ './view.component.scss' ],
    templateUrl: './view.component.html'
})

export class SystemViewComponent extends BaseComponent {

     // 查询条件
     public searchItems: any = SYSTEM_VIEW_CONFIG.SEARCH_FROM;
     // 查询配置
     public formConfig: any = SYSTEM_VIEW_CONFIG.FORM_CONFIG;
 
 
     tableFrame = SYSTEM_VIEW_CONFIG.TABLE_FRAME;
 
     rows = [
         {assetCode: '1', initialAmt: '2', isEnable: '3'}
     ]
    
    constructor( public injector: Injector ) { super(injector); }
}