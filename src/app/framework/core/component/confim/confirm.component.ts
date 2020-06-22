import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'oms-confirm',
    styleUrls: ['./confirm.component.scss'],
    templateUrl: './confirm.component.html'
})

export class OmsConfirmComponent {
    constructor(
        private dialogRef: MatDialogRef<any>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    // 确定
    submit() {
        this.dialogRef.close(true);
    }
}