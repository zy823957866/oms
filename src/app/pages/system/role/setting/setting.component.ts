// 工具包
import { Component } from '@angular/core';

// 组件
import { DialogComponent } from 'src/app/framework/core/component/dialog/dialog.component';

@Component({
    selector: 'role-setting',
    styleUrls: ['./setting.component.scss'],
    templateUrl: './setting.component.html'
})

export class RoleSettingComponent extends DialogComponent {
    
    ngOnInit() {}

    clickNode(e){
        console.log('checkNode:', e);
    }

    checkedChange(e){
        console.log('checkedChange:', e);
    }

    selectNode(e){
        console.log('selectNode:', e);
    }
}