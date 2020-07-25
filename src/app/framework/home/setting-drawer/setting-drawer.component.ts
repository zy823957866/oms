import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

// 组件
import { GenerateStyleComponent } from './generate-style/generate-style.component';

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
    FORM            : any = DRAWER_CONFIG.FORM;                 // 操作按钮

    constructor(
        public dialog: MatDialog
    ){}


    drawerToggle() {
        this.showDrawer = this.showDrawer === 'inactive' ? 'active' : 'inactive' ;
    }


    // 设置主题色
    primaryColor(color) {
        this.CONFIG.primary = color;

        document.getElementsByTagName('html')[0].style.setProperty('--primary',color);
    }


    // 按钮回调
    actionsCb(e) {
        this.dialog.open(GenerateStyleComponent, {
            width: '50%',
            height: 'auto',
            data: {
                style: this.getStyle()
            }
        })
    }

    // 生成预览
    setView(prop: string, key: string) {
        document.getElementsByTagName('html')[0].style.setProperty(`--${prop}`,key);
    }


    // 生成代码
    getStyle() {
        return '{\n'
            + this.setProp('primary', '推荐主题色')
            + this.generateStyle(this.TXCOLORS, '字体颜色')
            + this.generateStyle(this.SPACE, '内容间距')
            + this.generateStyle(this.FORM, '输入框设置')
            + '    // 按钮\n'
            + this.generateStyle(this.BTNS[0].props, 'primary')
            + this.generateStyle(this.BTNS[1].props, 'rest')
            + this.generateStyle(this.BTNS[2].props, 'close')
            + this.generateStyle(this.MENUS, '菜单')
            + this.generateStyle(this.MENUS, '提示信息')
            + '}'
        ;
    }


    // 根据属性 生成备注及代码
    generateStyle(config: any={}, desc: string): string {
        let style = `   // ${desc}\n`;

        for(let it of config) {
            style += `    --${it.prop}: ${this.CONFIG[it.prop]};\n`;
        }
        return `${style}\n`;
    }


    // 设置属性
    setProp(prop: string, desc: string): string {
        return `    // ${desc}\n    --${prop}: ${this.CONFIG[prop]};\n\n`;
    }
}