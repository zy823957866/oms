// 工具包
import { Component, Injector, Inject } from '@angular/core';

// 组件
import { BaseComponent } from '../../base/base.component';

// 配置
import { CTRL_COLS_CONFIG } from '../ctrl-cols.config';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StorageService } from '../../../services/storage.service';

@Component({
    selector: 'oms-available-cols',
    styleUrls: ['./available-cols.component.scss'],
    templateUrl: './available-cols.component.html'
})

export class OmsAvailableColsComponent extends BaseComponent {
    //API
    public apiPath: any=CTRL_COLS_CONFIG.API;
    //table
    public tableFrame: any=CTRL_COLS_CONFIG.TABLE_FRAME;
    //查询条件
    public searchItems: any=CTRL_COLS_CONFIG.SEARCH_ITEMS;
    //配置
    public formConfig: any=Object.assign({}, CTRL_COLS_CONFIG.FORM_CONFIG, {
        tableCode: [this.data, []],
        userId: [this.storeSer.getObject('userInfo').id, []]
    });
    //加载状态
    public loading: any={
        updateCloumn: false
    };

    constructor(
        public injector: Injector,
        public dialogRef: MatDialogRef<any>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        public storeSer: StorageService
    ){
        super(injector);
    }
}