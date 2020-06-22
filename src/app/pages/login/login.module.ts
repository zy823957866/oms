// 工具包
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// 组件
import { LoginComponent } from './login.component';

// 模块
import { LoadingModule } from 'src/app/framework/core/directives/loading/loading.module';

// 路由
import { RoutingModule } from './login.routing';



@NgModule({
    declarations: [
        LoginComponent
    ],
    imports: [
        MatIconModule,
        MatFormFieldModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        LoadingModule,
        MatButtonModule,
        RoutingModule
    ],
    providers: [

    ]
})

export class LoginModule { }
