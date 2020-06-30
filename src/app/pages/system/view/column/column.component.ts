// 工具包
import { Component, Injector, Inject } from '@angular/core';

// 组件
import { BaseComponent } from 'src/app/framework/core/component/base/base.component';
import { ColumnAddComponent } from './add/add.component';

// 配置
import { COLUMN_CONFIG } from './column.config';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
    selector: 'view-column',
    styleUrls: ['./column.component.scss'],
    templateUrl: './column.component.html'
})

export class OmsViewColumnComponent extends BaseComponent {
    searchItems : any = COLUMN_CONFIG.SEARCH_FROM;         // 查询条件
    apiPath     : any = COLUMN_CONFIG.API;                 // api接口
    tableFrame  : any = COLUMN_CONFIG.TABLE_FRAME;         // talbe表头
    code        : string = 'COLUMN';                       // 定义页面code
    addComponent: any = ColumnAddComponent;                // 新增 编辑弹框
    formConfig  : any = Object.assign({},                  // 跟新form配置
                            COLUMN_CONFIG.FORM_CONFIG,
                            { controlTableId: [this.data.id, []] }
                        );


    constructor(
        public injector: Injector,
        public dialogRef: MatDialogRef<any>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        super(injector);
    }

    
    // 切换是否显示
    toggleChange(rows) {
        rows.ifDisplay = rows.ifDisplay == '0' ? '1' : '0';
    }

    // 更新
    updateCloumn() {
        this.loading.updateCloumn = true;
        this.httpApiService.post(this.apiPath.UPDATE_BY_LIST, this.rows, data => {
            if(data === null) return;
            this.loading.updateCloumn = false;

            this.dialogRef.close(true);
        });
    }

    // 往新增页面传输的数据
    data2NewDialog() {
        return { controlTableId: this.data.id };
    }
}