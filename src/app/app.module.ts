/*
 * @Author: zhouyong
 * @Date: 2020-06-13 00:13:05
 */
// 工具包
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// 组件
import { AppComponent } from './app.component';

// 路由
import { AppRoutingModule } from './app.routing';

// 模块
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OmsBaseInjectModule } from './baseInject.module';

//国际化
export function createTranslateHttpLoader(http:HttpClient){
    return new TranslateHttpLoader(http, '/assets/i18n/', '.json');
}


@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        OmsBaseInjectModule,
        TranslateModule.forRoot({
            loader: {
              provide: TranslateLoader,
              useFactory: createTranslateHttpLoader,
              deps: [HttpClient]
            }
        })
    ],
    providers: [],
    bootstrap: [AppComponent]
})

export class AppModule { }
