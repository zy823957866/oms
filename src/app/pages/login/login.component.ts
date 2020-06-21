// 工具包
import { Component, OnInit, HostBinding } from '@angular/core';
import { Router } from '@angular/router';

// 动画
import { routeAnimation } from 'src/app/framework/core/animations/route-animate';

@Component({
	selector: 'app-oms-login',
	templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [ routeAnimation ]
})

export class LoginComponent implements OnInit {
    @HostBinding('@routeAnimation') routeAnimation = true;
    
	constructor(
		private router: Router
	) { }

	ngOnInit(): void { }

	// 登录
	login() {
		this.router.navigateByUrl('/oms/dashboard');
	}
}
