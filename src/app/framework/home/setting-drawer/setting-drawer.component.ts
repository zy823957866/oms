import { Component, NgZone } from '@angular/core';
import { trigger, transition, style, animate, state } from '@angular/animations';

@Component({
    selector: 'setting-drawer',
    styleUrls: ['./setting-drawer.component.scss'],
    templateUrl: './setting-drawer.component.html',
    animations: [
        trigger('slideInOut', [
            state('inactive', style({
                right: '-600px'
            })),
            state('active', style({
                right: '0px'
            })),
            transition('inactive => active', animate('200ms ease-out')),
            transition('active => inactive', animate('200ms ease-in'))
        ])
    ]
})

export class SettingDrawerComponent {
    showDrawer = 'inactive';
    // 主题色
    COLOR: Array<string> = ['#0cb495', 'red', 'blue'];

    constructor(
        private zone: NgZone,
    ){}

    drawerToggle() {
        this.showDrawer = this.showDrawer === 'inactive' ? 'active' : 'inactive' ;
    }

    primaryColor(color) {
        // setTimeout(() => {
            this.zone.run(() => {
                document.getElementsByTagName('html')[0].style.setProperty('--primary',color);
                // console.log('enabled time travel');
            });
        //   }, 200);

        
    }
}