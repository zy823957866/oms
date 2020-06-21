// 工具包
import { Component, OnInit, HostBinding } from '@angular/core';
import { Router } from "@angular/router";

// 动画
import { routeAnimation } from 'src/app/framework/core/animations/route-animate';

@Component({
    selector: 'app-not-find',
    templateUrl: './not-find.component.html',
    styleUrls: ['./not-find.component.scss'],
    animations: [ routeAnimation ]
})

export class NotFindComponent {
    @HostBinding('@routeAnimation') routeAnimation = true;

    constructor(
        private router: Router,
    ) { }

    //返回登录页面
	backHome() {
		this.router.navigate(['/login']);
	}
    
	backHistory() {
		window.history.go(-1);
	}

}
