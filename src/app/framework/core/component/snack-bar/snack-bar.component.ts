/**
 * `
 *  传入的内容 data:{
 *     icon?: string;       // 默认 'success', ( check | clear | warning | info )
 *     message: string;     // 必填信息
 *     wrap?: boolean;      // 内容是否自动换行
 *     autoClose? boolean;  // 消息提示是否自动关闭
 *  }
 * `
 */
//工具包
import {Component, Inject} from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBar } from "@angular/material/snack-bar";


@Component({
    selector: 'snack-bar',
    styleUrls: ['./snack-bar.component.scss'],
    templateUrl: './snack-bar.component.html'
})


export class SnackBarComponent {
    //提示信息
    public snackMsg: any={};
    

    constructor(
        private snackBar: MatSnackBar, 
        @Inject(MAT_SNACK_BAR_DATA) public data: any
    ) {
        this.snackMsg = Object.assign({}, data);
    }

    close(){
        this.snackBar.dismiss();
    }
} 
