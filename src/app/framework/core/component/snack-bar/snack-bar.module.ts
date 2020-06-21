/**
 * @DESC 错误消息提示 MODULE
 * @AUTH CREATE BY ZHOUYONG
 * @DATE 2019.05.06
 */
//工具包
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';

//组件
import { SnackBarComponent } from './snack-bar.component';


@NgModule({
    declarations: [ 
        SnackBarComponent
    ],
   
    imports: [
        MatSnackBarModule,
        CommonModule,
        MatButtonModule,
        MatIconModule,
        FlexLayoutModule
    ],
    exports: [
        SnackBarComponent
    ],
    entryComponents: [
        SnackBarComponent
    ]
  })
  
  
  export class SnackBarModule{}