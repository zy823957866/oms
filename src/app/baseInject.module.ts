/**
 * 此模块中为系统中每个页面均会用到的服务、模块等
*/
// 工具包
import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';

// 服务
import { HttpApiService } from './framework/core/services/http.service';
import { UserService } from './framework/core/services/user.service';
import { StorageService } from './framework/core/services/storage.service';
import { I18nService } from './framework/core/services/i18n.service';
import { MessageService } from './framework/core/services/message.service';

// 模块
import { SnackBarModule } from './framework/core/component/snack-bar/snack-bar.module';

// http拦截器
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpHeaderInterceptor } from './framework/core/interceptor/http-header.interceptor';
import { HttpResponseInterceptor } from './framework/core/interceptor/http-response.interceptor';

// 服务汇总
const SERVICE = [
    UserService,
    I18nService,
    StorageService,
    MessageService,
    HttpApiService,
    DatePipe,
    {
        provide: HTTP_INTERCEPTORS,
        useClass: HttpHeaderInterceptor,
        'multi': true
    }, {
        provide: HTTP_INTERCEPTORS,
        useClass: HttpResponseInterceptor,
        'multi': true
    }
];

// 第三方模块汇总
const THREE_MODULE = [
    MatSnackBarModule,
    MatDialogModule
];

// 用户自定义模块
const USER_DEFINE_MODULE = [
    SnackBarModule
];

@NgModule({
    providers: [...SERVICE],
    imports: [
        ...THREE_MODULE,
        ...USER_DEFINE_MODULE
    ],
    exports: [
        ...THREE_MODULE,
        ...USER_DEFINE_MODULE
    ]
})

export class OmsBaseInjectModule {
    static forRoot(): ModuleWithProviders{
      return <ModuleWithProviders>{
        ngModule: OmsBaseInjectModule,
        providers: []
      };
    }
}