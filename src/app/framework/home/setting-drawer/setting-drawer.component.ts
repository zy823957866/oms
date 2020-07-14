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
    // 主题色 0cb495
    COLOR: Array<string> = [ '#0cb495', '#f54336', '#e91f63', '#9b27b0', '#683ab7', '#3f51b6', '#3f51b6', 
                             '#2097f3', '#01bcd6', '#009688', '#4cb051', '#8bc349', '#cddc3a', '#ffec3c', 
                             '#face1e', '#ff9800', '#ff5723', '#5f7d8c'];

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