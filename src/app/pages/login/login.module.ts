// 工具包
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

// 组件
import { LoginComponent } from './login.component';

// 路由
import { RoutingModule } from './login.routing';

@NgModule({
    declarations: [
        LoginComponent
    ],
    imports: [
        MatIconModule,
        RouterModule,
        RoutingModule
    ],
    providers: [

    ]
})

export class LoginModule { }
