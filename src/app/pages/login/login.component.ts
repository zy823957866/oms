// 工具包
import { Component, OnInit, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';

// 配置
import { LOGIN_CONFIG } from './login.config';

// 服务
import { OmsFormService } from 'src/app/framework/core/services/form.service';
import { HttpApiService } from 'src/app/framework/core/services/http.service';
import { StorageService } from 'src/app/framework/core/services/storage.service';
import { ResourceService } from 'src/app/framework/core/services/resource.service';

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

    form: FormGroup;
    loading: boolean = false;

    form_config     = LOGIN_CONFIG.FORM_CONFIG;         // form基础配置
    form_error      = LOGIN_CONFIG.FORM_ERROR;          // 错误信息
    valid_mes       = LOGIN_CONFIG.VALID_MESSAGE;       // 验证描述
    api_path        = LOGIN_CONFIG.API;                 // api接口
    

	constructor(
        public router: Router,
        public formBuilder: FormBuilder,
        public formSer: OmsFormService,
        public httpSer: HttpApiService,
        public storeSer: StorageService,
        public resourceSer: ResourceService
	) { }


	ngOnInit(): void { 
        // 创建form
        this.crecteForm();
    }


    crecteForm() {
        this.form = this.formBuilder.group(this.form_config);

        // 监听错误信息
        this.form.valueChanges.subscribe(data => {
            this.form_error = this.formSer.formValueChange( this.form, this.form_error, this.valid_mes );
        });
    }

	// 登录
	login() {
        if(this.formSer.isValid(this.form, this.form_error)) {
            
            this.loading = true;

            this.httpSer.post(this.api_path.SUBMIT, this.form.value, res => {
                if(res) {
                    // 存储token
                    this.storeSer.set('AuthorizeToken', res.authorizeToken);

                    // 存储菜单资源
                    this.storeSer.setObject('resources', res.authSupport.resources);

                    // 存储用户信息
                    let roles = [];
                    res.authSupport.roles.forEach(item => roles.push(item.roleName))
                    this.storeSer.setObject('userInfo', {
                        userName    : res.authSupport.user.userName,
                        userNo      : res.authSupport.user.userNo,
                        id          : res.authSupport.user.id,
                        staffNumber : res.authSupport.user.staffNumber,     // 工号
                        roles       : roles.join(';')                       // 角色
                    });

                    // 存储权限
                    this.storeSer.setObject('auth', res.authSupport.buttonResource);

                    // 存储组织机构
                    this.storeSer.setObject('orgList', res.authSupport.organizations);

                    // 此时转换菜单为树形结构，方便页面进入后首次渲染
                    this.resourceSer.onNavigationModelChange.next(this.resourceSer.resource2Nav(res.authSupport.resources));

                    // 页面跳转[判断是否有重定向，如果有重定向，则跳转到之前页面]
                    this.router.navigate([this.storeSer.get('redictUrl') || '/oms/dashboard']);
                } else {
                    this.loading = false;
                }
            })
        }
	}
}
