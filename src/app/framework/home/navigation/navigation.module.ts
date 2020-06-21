// 工具包
import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { PerfectScrollbarModule, PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

// 组件
import { NavigationComponent } from './navigation.component';
import { NavCollapseComponent } from './nav-collapse/nav-collapse.component';
import { NavItemComponent } from './nav-item/nav-item.component';

// 服务
import { ResourceService } from '../../core/services/resource.service';



const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true
};

@NgModule({
    declarations: [
        NavigationComponent,
        NavCollapseComponent,
        NavItemComponent
    ],
    imports: [
        CommonModule,
        MatIconModule,
        PerfectScrollbarModule,
        RouterModule
    ],
    providers: [
        ResourceService,
        {
            provide: PERFECT_SCROLLBAR_CONFIG,
            useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
        }
    ],
    exports: [
        NavigationComponent,
        NavCollapseComponent,
        NavItemComponent
    ]
})

export class NavigationModule {}