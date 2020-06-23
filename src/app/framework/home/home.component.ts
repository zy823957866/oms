/*
 * @Author: zhouyong
 * @Date: 2020-06-13 11:44:04
 * @Description: 系统首页
 */
// 工具包
import { Component, OnInit } from '@angular/core';

// 服务
import { ConfigService } from './shared/services/config.services';

@Component({
    selector: 'app-oms-home',
    styleUrls: ['./home.component.scss'],
    templateUrl: './home.component.html'
})

export class HomeComponent implements OnInit {
    settings: any;

    //flex布局模式
    layoutMode: boolean = false;
    //是否折叠菜单
    sidenavOpen: boolean = true;
    sidenavMode: string = 'side';
    sidenavAlign: string = 'start';
    customizerSidenavAlign: string = 'end';

    constructor(
        private config: ConfigService,
    ) {}
    
    ngOnInit() {
        // 监听页面布局模式
        this.watchMode();
    }

    watchMode() {
        this.config.onSettingsChanged.subscribe((settings) => {
            this.settings = settings;
            
            this.layoutMode = this.settings.layout.mode === 'boxed' ? true : false;
            this.sidenavAlign = this.settings.layout.navigation === 'right' ? 'end' : 'start';
            this.customizerSidenavAlign = this.settings.layout.navigation === 'right' ? 'start' : 'end';
		});
    }
}
