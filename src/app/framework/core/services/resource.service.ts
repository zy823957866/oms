/**
 * @desc 资源服务
 */
// 工具包
import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// model
import { MenuTree } from '../models/menu-tree.model';
import { StorageService } from './storage.service';

@Injectable()

export class ResourceService {
    onNavigationCollapseToggle = new EventEmitter<any>();
    onNavigationCollapseToggled = new EventEmitter<any>();
    onNavigationModelChange: BehaviorSubject<any> = new BehaviorSubject([]);
    navigation: any[];

    //mock
    menuTreeChange: BehaviorSubject<Array<MenuTree>> = new BehaviorSubject([]);

    mockData: Array<MenuTree> = [
        {
            id: '1',
            title: '信息面板',
            type: 'item',
            icon: 'home',
            url: '/oms/dashboard',
            children: []
        },
        {
            id: '1',
            title: '测试菜单',
            type: 'collapse',
            icon: 'home',
            children: [
                {
                    id: '2',
                    title: '子菜单一',
                    type: 'item',
                    icon: 'home',
                    url: '/dashboard1',
                },
                {
                    id: '3',
                    title: '子菜单二',
                    type: 'item',
                    icon: 'home',
                    url: '/dashboard2',
                },
            ]
        },
        {
            id: '1',
            title: '系统配置',
            type: 'collapse',
            icon: 'system',
            children: [
                {
                    id: '2',
                    title: '视图管理',
                    type: 'item',
                    icon: 'home',
                    url: '/oms/system/view',
                }
            ]
        }
    ];

    setNavigationModelMock(){
        this.menuTreeChange.next(this.mockData);
    }

    

    constructor(
        public storageService: StorageService,

    ) {
        let resources = storageService.getObject('resources');
        if(resources && resources.length>0){
            this.onNavigationModelChange.next(this.resource2Nav(resources));
        }
    }

    setNavigationModel(navigation) {
        this.navigation = navigation;
        this.onNavigationModelChange.next(navigation);
    }

    addNavigationItem(location, item) {
        const locationArr = location.split('.');

        if (locationArr.length === 0) {
            return;
        }

        const navItem = this.findNavigationItemById(locationArr);

        switch (navItem.type) {
            case 'item':
                navItem.children = [];
                navItem.children.push(item);
                navItem.type = 'collapse';
                break;
            case 'collapse':
                navItem.children.push(item);
                break;
            case 'group':
                navItem.children.push(item);
                break;
            default:
                break;
        }
    }

    getNavigationItem(location) {
        const locationArr = location.split('.');

        if (locationArr.length === 0) {
            return;
        }

        return this.findNavigationItemById(locationArr);
    }

    findNavigationItemById(location, navigation?) {
        if (!navigation) {
            navigation = this.navigation;
        }

        for (const navItem of navigation) {
            if (navItem.id === location[0]) {
                if (location.length > 1) {
                    location.splice(0, 1);
                    return this.findNavigationItemById(location, navItem.children);
                } else {
                    return navItem;
                }
            }
        }
    }

    // 资源转为树形结构的导航
    resource2Nav (data){
        // 菜单资源转为Map供使用
        let dataMap = this.list2Map(data, 'parentId');
        let nav = this.map2Nav(dataMap);
        if (nav == null || nav.length == 0) {
            return null;
        }
        return nav[0].children;
    }

    // 资源转导航的实现
    map2Nav(dataMap) {
        let nav = [];
        let root = dataMap['root'];
        if (root) {
            nav = [{
                'id': root.resourceCode,
                'title': root.displayName,
                'type': root.displayType === 0 ? 'collapse' : 'item',
                'icon': root.resourceIcon,
                'url': root.resourceUrl,
                'enDisplayName': root.enDisplayName ? root.enDisplayName:root.displayName,
                'children': this.map2NavRec(root.id, dataMap)
            }];
        }

        return nav;
    }

    // 资源转导航递归实现
    map2NavRec(parentId, dataMap) {
        let items = dataMap[parentId];
        if (items && items.length > 0) {
            let nodes = [];
            for (let i = 0; i < items.length; i++) {
                let item = items[i];
                let node = {
                    'id': item.resourceCode,
                    'title': item.displayName,
                    'type': item.displayType === 0 ? 'collapse' : 'item',
                    'icon': item.resourceIcon,
                    'url': item.resourceUrl,
                    'enDisplayName': item.enDisplayName ? item.enDisplayName:item.displayName,
                    'resourceOrder': item.resourceOrder
                };

                let children = this.map2NavRec(item.id, dataMap);
                if (children) {
                    node['children'] = children;
                }
                
                nodes.push(node);
            }
            // 同级导航的排序
            // let sortedNodes = utilSortOrder(nodes, 'resourceOrder');
            return nodes;
        }
        return null;
    }

    // list转为Map
    list2Map(list, keyName) {
        let dataMap = new Object();
        if (list == null) {
            return dataMap;
        }
        for (let i = 0; i < list.length; i++) {
            // 禁用项不加载
            if ((list[i].isEnable != null && list[i].isEnable != 1) || list[i].isDelete == 1) {
                continue;
            }
            if (!list[i][keyName] || list[i][keyName] == 'root') {
                dataMap['root'] = list[i];
            } else {
                let key = list[i][keyName];
                let entity = dataMap[key];
                if (entity == null) {
                    dataMap[key] = [list[i]];
                } else {
                    dataMap[key].push(list[i]);
                }
            }
        }
        return dataMap;
    }
}