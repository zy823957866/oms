// 工具包
import { Component, HostBinding, Injector } from '@angular/core';

// 组件
import { BaseComponent } from 'src/app/framework/core/component/base/base.component';
import { RoleAddComponent } from './add/add.component';
import { RoleSettingComponent } from './setting/setting.component';

// 配置
import { ROLE_CONFIG } from './role.config';

// 动画
import { routeAnimation } from 'src/app/framework/core/animations/route-animate';


@Component({
    selector: 'oms-role',
    styleUrls: ['./role.component.scss'],
    templateUrl: './role.component.html',
    animations: [ routeAnimation ]
})

export class OmsRoleComponent extends BaseComponent {
    // 动画
    @HostBinding('@routeAnimation') routeAnimation = true;

    // 页面基础配置
    searchItems : any = ROLE_CONFIG.SEARCH_FROM;         // 查询条件
    formConfig  : any = ROLE_CONFIG.FORM_CONFIG;         // 查询配置
    apiPath     : any = ROLE_CONFIG.API;                 // api接口
    exportName  : any = ROLE_CONFIG.EXPORT_NAME;         // 设置导出文件名
    addComponent: any = RoleAddComponent;                // 新增 编辑弹框

    // 所有资源
    allResources: Array<any> = [];

    constructor( public injector: Injector ) { super(injector); }

    // 设置弹框
    setting(row) {
        this.dialog.open(RoleSettingComponent, {
            width: '40%',
            data: {

            },
            disableClose: true
        }).afterClosed().subscribe(res => {
            
        })
    }

    // 查询所有的资源
    getAllResource() {

    }
}