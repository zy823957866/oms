// 工具包
import { Injectable } from '@angular/core';
import { MatSnackBarRef, MatSnackBar } from '@angular/material/snack-bar';

// model
import { MessageConfig } from '../models/message-config.model';

// 配置
import { SYSTEM_CONFIG } from '../config/system.config';

// 组件
import { SnackBarComponent } from '../component/snack-bar/snack-bar.component';


@Injectable()
export class MessageService {
    // 默认设置
    private messageConfig: MessageConfig = SYSTEM_CONFIG.MESSAGE;

    constructor(
        private snackBar: MatSnackBar
    ) {}

    //显示系统顶部消息,默认居中显示,timeout 3秒
    showMessage(
        message :    string  = '',                                   // 消息体
        icon    :    string  = 'clear',                              // 提示的图标
        time    :    number  =  SYSTEM_CONFIG.MESSAGE.duration       // 提示框显示时常 如果为0, 则不关闭
    ): MatSnackBarRef<any> {
        
        this.messageConfig = Object.assign({}, this.messageConfig, {
            duration: time ? time : 86400000
        });

        return this.snackBar.openFromComponent(SnackBarComponent, Object.assign(
            {},
            this.messageConfig,
            { data: {
                icon: icon, 
                message: message,
                autoClose: !Boolean(time)
            } 
        }));
    }
}