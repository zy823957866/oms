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
    
    constructor() {
    }
}
