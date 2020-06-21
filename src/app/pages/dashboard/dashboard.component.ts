// 工具包
import { Component, OnInit, HostBinding, Inject, Injector } from '@angular/core';

// 动画
import { routeAnimation } from 'src/app/framework/core/animations/route-animate';
import { BaseComponent } from 'src/app/framework/core/component/base/base.component';
import { DASHBOAR_CONFIG } from './dashboard.config';
import { OmsAlertComponent } from 'src/app/framework/core/component/alert/alert.component';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    animations: [ routeAnimation ]
})


export class DashboardComponent extends BaseComponent implements OnInit {
    @HostBinding('@routeAnimation') routeAnimation = true;
    
    // 查询条件
    public searchItems: any = DASHBOAR_CONFIG.SEARCH_FROM;
    // 查询配置
    public formConfig: any = DASHBOAR_CONFIG.FORM_CONFIG;


    tableFrame = DASHBOAR_CONFIG.TABLE_FRAME;

    rows = [
        {assetCode: '1', initialAmt: '2', isEnable: '3'}
    ]

    constructor( public injector: Injector) {
        super(injector);

        this.dialog.open(OmsAlertComponent, { 
            disableClose: true, 
            minWidth: '450px',
            minHeight: '250px',
            data: { title: '这是标题', message: '这是一个测试' } });
    }

}
