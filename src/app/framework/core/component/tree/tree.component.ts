import { Component, Input } from '@angular/core';
import {NestedTreeControl} from '@angular/cdk/tree';

@Component({
    selector: 'oms-tree',
    styleUrls: ['./tree.component.scss'],
    templateUrl: './tree.component.html'
})

export class OmsTreeComponent {
    @Input() set data(v) { this.data2Tree(v) };             // 所有树数据
    @Input() checked: Array<any>;                           // 所有选中的数据
    @Input() showCheckBox: boolean;                         // 是否显示多选按钮
    @Input() label: string;                                 // 标签根据哪个属性显示

    // 存储树数据的map
    treeMap: Map<string, any> = new Map<string, any>();
    // 解析后的树数据
    treeData: Array<any>;
    // 是否展开节点
    isOpen: boolean=false;
    // 树控制
    treeControl = new NestedTreeControl<any>((node) => node.children);


    constructor() { }

    // 将全部树数据与选中的树数据解析成树结构
    data2Tree(tree: Array<any>) {
        // 清空map
        this.treeMap.clear();

        this.treeData = tree.filter(node => (!node.parentId) || node.parentId == this.parentId);



        tree.forEach(node => {

        })

    }

    // 是否有子节点
    hasChild(_: number, node) {
        return node.children != null && node.children.length > 0;
    }


    // 方法一：数组转map
    list2Map(list, key) {
        let map = {};

        list.foEach(item => { map[key] = item });

        return map;
    }
}