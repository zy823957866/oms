// 工具包
import { Component, Input } from "@angular/core";

@Component({
    selector: 'oms-header',
    styleUrls: ['./header.component.scss'],
    templateUrl: './header.component.html'
})

export class HeaderComponent {
    @Input() customizer;
    @Input() sidenav;
    
    constructor() { }

    // 切换菜单显示隐藏
    autoMenu() {
        this.sidenav.opened = !this.sidenav.opened;
        setTimeout(function () {
            window.dispatchEvent(new Event('resize'));
        }, 500);
    }
}
