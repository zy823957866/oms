/*
 * @Author: zhouyong
 * @Date: 2020-06-13 11:44:20
 * @Description: Modify here please
 */
// 工具包
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FlexLayoutModule } from '@angular/flex-layout';

// 组件
import { HomeComponent } from './home.component';
import { HeaderComponent } from './header/header.component';
import { BrandComponent } from './brand/brand.component';
import { FooterComponent } from './footer/footer.component';

// 服务
import { ConfigService } from './shared/services/config.services';

//模块
import { NavigationModule } from './navigation/navigation.module';
import { OmsSharedModule } from './shared.module';
import { RoutingModule } from './home.routing';



@NgModule({
    declarations: [ 
        HomeComponent,
        HeaderComponent,
        BrandComponent,
        FooterComponent
    ],
    imports: [
        MatSidenavModule,
        CommonModule,
        FlexLayoutModule,
        RouterModule,
        NavigationModule,
        OmsSharedModule,
        RoutingModule
    ],
    providers: [
        ConfigService
    ],
    exports: [
        HeaderComponent,
        BrandComponent,
        FooterComponent
    ]
})

export class HomeModule { }
