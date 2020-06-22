// 工具包
import { Component, OnInit, OnDestroy } from '@angular/core';

//models
import { MenuTree } from '../../core/models/menu-tree.model';

//服务
import { ResourceService } from '../../core/services/resource.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'oms-navigation',
    styleUrls: ['./navigation.component.scss'],
    templateUrl: './navigation.component.html'
})

export class NavigationComponent implements OnInit, OnDestroy {
    navigationModel: Array<MenuTree>;
    treeChangeSub: Subscription;

    constructor(
        private resourceSer: ResourceService
    ) {}

    ngOnInit(){
        // 获取菜单
        this.getMenus();
    }

    getMenus(){
        // this.treeChangeSub = this.resourceSer.onNavigationModelChange.subscribe(
		// 	navigation => {
		// 		this.navigationModel = navigation;
		// 	}
        // );
        
        this.resourceSer.setNavigationModelMock();

        this.treeChangeSub = this.resourceSer.menuTreeChange.subscribe(res => {
            this.navigationModel = res;
        })
    }

    ngOnDestroy() {
		this.treeChangeSub.unsubscribe();
	}
}
