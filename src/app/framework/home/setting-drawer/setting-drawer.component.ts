import { Component, NgZone } from '@angular/core';

// 配置
import { DRAWER_CONFIG } from './setting-drawer.config';

// 动画
import { toggleAnimation } from './setting-drawer.animate';

@Component({
    selector: 'setting-drawer',
    styleUrls: ['./setting-drawer.component.scss'],
    templateUrl: './setting-drawer.component.html',
    animations: [ toggleAnimation ]
})

export class SettingDrawerComponent {
    showDrawer = 'inactive';

    
    CONFIG          : any = DRAWER_CONFIG.DEFAULE;              // 默认配置
    COLOR           : Array<string> = DRAWER_CONFIG.COLORS;     // 主题色
    BTNS            : any = DRAWER_CONFIG.BTNS;                 // 按钮设置
    MENUS           : any = DRAWER_CONFIG.MENUS;                // 按钮设置
    TXCOLORS        : any = DRAWER_CONFIG.TXCOLORS;             // 按钮设置
    SPACE           : any = DRAWER_CONFIG.SPACE;                // 空格设置
    ACTIONS         : any = DRAWER_CONFIG.ACTIONS;              // 操作按钮

    constructor(
        private zone: NgZone,
    ){}

    drawerToggle() {
        this.showDrawer = this.showDrawer === 'inactive' ? 'active' : 'inactive' ;
    }

    // 设置主题色
    primaryColor(color) {
        this.CONFIG.primary = color;

        document.getElementsByTagName('html')[0].style.setProperty('--primary',color);
    }

    actionsCb(e) {
        console.log(e)
    }
}