// 工具包
import { Component, HostBinding, Injector, ViewChild, ElementRef } from '@angular/core';

// 组件
import { BaseComponent } from 'src/app/framework/core/component/base/base.component';
import { RoleAddComponent } from './add/add.component';
import { RoleSettingComponent } from './setting/setting.component';

// 配置
import { ROLE_CONFIG } from './role.config';

// 常用方法
import { compare } from 'src/app/framework/core/utils/shared';

// 服务
import { overlayService } from 'src/app/framework/core/services/overlay.service';

// 动画
import { routeAnimation } from 'src/app/framework/core/animations/route-animate';

import { OverlayComponent } from './overlay/overlay.component';


@Component({
    selector: 'oms-role',
    styleUrls: ['./role.component.scss'],
    templateUrl: './role.component.html',
    animations: [ routeAnimation ]
})

export class OmsRoleComponent extends BaseComponent {
    // 动画
    @HostBinding('@routeAnimation') routeAnimation = true;
    @ViewChild('testx') testx: ElementRef;

    // 页面基础配置
    searchItems : any = ROLE_CONFIG.SEARCH_FROM;         // 查询条件
    formConfig  : any = ROLE_CONFIG.FORM_CONFIG;         // 查询配置
    apiPath     : any = ROLE_CONFIG.API;                 // api接口
    exportName  : any = ROLE_CONFIG.EXPORT_NAME;         // 设置导出文件名
    addComponent: any = RoleAddComponent;                // 新增 编辑弹框

    // 所有资源
    allResources: Array<any>;

    constructor( 
        public injector: Injector,
        public overlaySer: overlayService
    ) { super(injector); }

    ngAfterViewInit() {
        // 页面渲染后获取所有的树数据，防止勾选权限时页面过卡问题
        this.getAllResource();
    }

    // 测试
    test() {
    //    // config: OverlayConfig overlay的配置，配置显示位置，和滑动策略
    //    const config = new OverlayConfig();
    //    config.positionStrategy = this.overlay.position()
    //        .global() // 全局显示
    //        .centerHorizontally() // 水平居中
    //        .centerVertically(); // 垂直居中
    //    config.hasBackdrop = true; // 设置overlay后面有一层背景, 当然你也可以设置backdropClass 来设置这层背景的class
    //    const overlayRef = this.overlay.create(config); // OverlayRef, overlay层
    //    overlayRef.backdropClick().subscribe(() => {
    //        // 点击了backdrop背景
    //        overlayRef.dispose();
    //    });
    //    // OverlayPanelComponent是动态组件
    //    // 创建一个ComponentPortal，attach到OverlayRef，这个时候我们这个overlay层就显示出来了。
    //    overlayRef.attach(new ComponentPortal(OverlayComponent, this.viewContainerRef));
    //    // 监听overlayRef上的键盘按键事件
    //    overlayRef.keydownEvents().subscribe((event: KeyboardEvent) => {
    //        // console.log(overlayRef._keydownEventSubscriptions + ' times');
    //        console.log(event);
    //    });
    }

    

    test1() {
        this.overlaySer.open(OverlayComponent, {
            width: '500px',
            height: '400px',
            hasBackdrop: true,
            panelClass: 'test'
            // positionEl: this.testx
        })

        // const config = new OverlayConfig();
        // config.positionStrategy = this.overlay.position()
        //     .global()
        //     .left(`100px`) // 自己控制位置
        //     .top(`100px`);
        // config.hasBackdrop = true;
        // const overlayRef = this.overlay.create(config);
        // overlayRef.backdropClick().subscribe(() => {
        //     overlayRef.dispose(); // 点击背景关掉弹窗
        // });
        // overlayRef.attach(new ComponentPortal(OverlayComponent, this.viewContainerRef));
    }

    test2() {
        // const strategy = this.overlay.position()
        //     .flexibleConnectedTo(this.testx.nativeElement)
        //     .withPositions([{
        //         originX: 'center',
        //         originY: 'bottom',
        //         overlayX: 'center',
        //         overlayY: 'top',
        //         offsetX: 0,
        //         offsetY: 0
        //     }]); // 这么理解 origin 组件(依附空组件) 的那个点(originX, originY) 和 overlay组件的点(overlayX, overlayY)
        // // 重合，从而确定overlay组件显示的位置
        // strategy.withLockedPosition(true);
        // const config = new OverlayConfig({positionStrategy: strategy});
        // config.scrollStrategy = this.overlay.scrollStrategies.reposition(); // 更随滑动的策略
        // this._overlayConnectRef = this.overlay.create(config);
        // this._overlayConnectRef.attach(new ComponentPortal(OverlayPanelComponent, this.viewContainerRef));
    }

    // 设置弹框
    setting(row) {
        // 通过角色id获取选中的资源
        this.httpApiService.post(this.apiPath.QUERY_RESOURCE_BY_ROLEID, { roleId: row.id }, res => {
            if(res) {
                this.dialog.open(RoleSettingComponent, {
                    width: '40%',
                    data: {
                        roleId: row.id, 
                        treeData: this.allResources, 
                        checked: res || []
                    },
                    disableClose: true
                }).afterClosed().subscribe(res => {
                    
                })
            }
        })
    }

    // 查询所有的资源
    getAllResource() {
        this.httpApiService.post(this.apiPath.QUERY_LIST, {}, res => {
            if(res && res.records) this.allResources = res.records.sort(compare('resourceOrder')) || [];
        })
    }
}