import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'oms-alert',
    styleUrls: ['./alert.component.scss'],
    templateUrl: './alert.component.html'
})

export class OmsAlertComponent {
    //标题
    public title: string;
    //提示信息 
    public message: string;
    //提示信息 
    public sureButton: string = '关闭';
    //按钮
    public submitButton: string = "";

    constructor(
        private dialogRef: MatDialogRef<any>,
        private translate: TranslateService,
        @Inject(MAT_DIALOG_DATA) 
        public data: any
    ) {
        this.title = this.data.title;
        this.message = this.data.message;
        
        if(this.data.submitButton) this.submitButton = this.data.submitButton;
    }

    //提交
    submit(): void {
        this.dialogRef.close(true);
    }
}