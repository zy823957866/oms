import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpApiService } from 'src/app/framework/core/services/http.service';

import { UserService } from 'src/app/framework/core/services/user.service';
import { OmsAlertComponent } from 'src/app/framework/core/component/alert/alert.component';

@Component({
    selector: 'oms-notification',
    styleUrls: ['./notification.component.scss'],
    templateUrl: './notification.component.html'
})

export class OmsNotificationComponent {
    // 是否显示弹框
    isOpen: boolean = false;
    // 未读消息条数
    unReadCount: number = 10;
    // 消息
    notifications = new Array();

    //构造器
	constructor(
		public httpApiService: HttpApiService,
		public dialog: MatDialog,
		public userService: UserService
	) { }

    ngOnInit() { this.getUnread(); }

    // 切换弹框显示隐藏
    toggleDropdown() { this.isOpen = !this.isOpen; }


	getUnread() {
		this.httpApiService.post("/api-base/v1/message/selectByUserId.do",{ messageStatus: 0 }, data => {
			if(data){
                this.unReadCount = data.unReadCount
                this.notifications = data.datas;
            }
		});
	}


	read(row) {
		this.dialog.open(OmsAlertComponent, { disableClose: true, data: { title: row.messageTitle, message: row.messageContent } });
		
		this.httpApiService.post("/api-base/v1/message/updateStatus.do", [row.id], data => {
			if(data) this.getUnread();
		});

	}

	getAllMessage() {
		window.location.href = "/oms/notice/message";
	}
}