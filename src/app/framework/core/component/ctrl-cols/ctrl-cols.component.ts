// 工具包
import { Component, Input, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

// 组件
import { OmsAvailableColsComponent } from './available-cols/available-cols.component';

@Component({
    selector: 'oms-ctrl-cols',
    styleUrls: ['./ctrl-cols.component.scss'],
    templateUrl: './ctrl-cols.component.html'
})

export class OmsCtrlColsComponent {
    //表头数据
    @Input() tableFrame: any=[];
    @Input() headCode: string = '';

    //回调
    @Output() callBack = new EventEmitter();

    constructor(
        private dialog: MatDialog
    ){}

    //控制弹框
    onConfigCols() {
        this.dialog.open(OmsAvailableColsComponent, {
            disableClose: true,
            width: '60%',
            height: 'auto',
            data: this.headCode
        }).afterClosed().subscribe(res => {
            this.callBack.emit(res);
        })
    }
}