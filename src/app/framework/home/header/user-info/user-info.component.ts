// 工具包
import { Component } from '@angular/core';

// 组件
import { StorageService } from 'src/app/framework/core/services/storage.service';

@Component({
    selector: 'oms-user-info',
    styleUrls: ['./user-info.component.scss'],
    templateUrl: './user-info.component.html'
})

export class OmsUserInfoComponent {
    public userInfo: any=this.storeService.getObject('userInfo');

    constructor(
        private storeService: StorageService
    ) {}
}