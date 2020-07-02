import { Component, Input, Output, EventEmitter } from '@angular/core';
import {NestedTreeControl} from '@angular/cdk/tree';
import {SelectionModel} from "@angular/cdk/collections";

@Component({
    selector: 'oms-tree',
    styleUrls: ['./tree.component.scss'],
    templateUrl: './tree.component.html'
})

export class OmsTreeComponent {
    @Input() set data(v) { this.data2Tree(v) };             // 所有树数据
    @Input() set checked(v) { this.setChecked(v); };         // 所有选中的数据
    @Input() showCheckBox: boolean;                         // 是否显示多选按钮
    @Input() label: string;                                 // 标签根据哪个属性显示
    @Input() parentId: string = 'root';                     // 根节点id

    //选中的节点，分享给父元素
    @Output() clickNode: EventEmitter<any> = new EventEmitter();

    // 存储树数据的map
    treeMap: Map<string, any> = new Map<string, any>();
    // 解析后的树数据
    treeData: Array<any>;
    // 是否展开节点
    isOpen: boolean=false;
    // 选中的树节点
    checkedNodes: any = [];
    // 当前选中的树节点
    currentChecked: any;
    // 树控制
    treeControl = new NestedTreeControl<any>((node) => node.children);
    // 
    checklistSelection = new SelectionModel<any>(true);


    constructor() { }

    // 将全部树数据与选中的树数据解析成树结构
    data2Tree(tree: Array<any>) {
        // 清空map
        this.treeMap.clear();

        // 获取所有的根数据
        this.treeData = tree.filter(node => (!node.parentId) || node.parentId == this.parentId);

        // 将根数据设置成map
        this.treeMap = this.list2Map([...tree], 'id');

        tree.forEach(node => {
            if(node.parentId && node.parentId != this.parentId) {
                let parentNode = this.treeMap.get(node.parentId);
                if(parentNode) {
                    parentNode.children =  parentNode.children || [];
                    parentNode.children.push(node);
                }
            }
        })
    }

    // 设置选中的数据
    setChecked(v) {
        this.checkedNodes = v || [];

        this.checkedNodes.forEach(item => {
            let node = this.treeMap.get(item.id);
            if(node && !node.children) {
                this.initLeafSelect(node);
                this.expandParentNode(node);
            }
        })
    }

    // 点击checkbox
    checkNode(node) {
        if (node.children) {
            // this.todoItemSelectionToggle(node);
        } else {
            // this.todoLeafItemSelectionToggle(node);
        }

        this.currentChecked = node;

        // 暴露选中的父节点
        this.clickNode.emit(node);
    }

    // 初始化选中数据
    initLeafSelect(node) {
        // 选中当前节点
        this.checklistSelection.toggle(node);
        // 选中父节点
        this.checkAllParentsSelection(node);
    }

    // 展开树结构
    expandParentNode(node) {

    }

    // 
    // buildChecked() {
    //     this._checked = [];
    //     let checkedNodes = this.checklistSelection.selected;

    //     if (checkedNodes) {
    //         let temp = new Map<string, any>();
    //         for (let i = 0; i < checkedNodes.length; i++) {
    //             let node = checkedNodes[i];
    //             if (!temp.get(node.id)) {
    //                 this._checked.push(node);
    //                 temp.set(node.id, node);
    //             }
    //             let parentNode = this._map.get(node.parentId);
    //             while (parentNode) {
    //                 if (!temp.get(parentNode.id)) {
    //                     this._checked.push(parentNode);
    //                     temp.set(parentNode.id, parentNode);
    //                 }
    //                 parentNode = this._map.get(parentNode.parentId);
    //             }
    //         }
    //     }
    // }


    // 通过子节点 选中父节点
    checkAllParentsSelection(node) {
        let parent = this.getParentNode(node);
        while (parent) {
            // 设置父节点为全选、办选状态
            this.setParentNodeType(parent);
            parent = this.getParentNode(parent);
        }
    }

    // 获取父节点
    getParentNode(node) {
        return this.treeMap.get(node.parentId);
    }

    // 设置父节点半选、全选状态
    setParentNodeType(node) {
        const nodeSelected = this.checklistSelection.isSelected(node);
        const descendants = this.treeControl.getDescendants(node);
        const descAllSelected = descendants.every(child =>
            this.checklistSelection.isSelected(child)
        );
        if (nodeSelected && !descAllSelected) {
            this.checklistSelection.deselect(node);
        } else if (!nodeSelected && descAllSelected) {
            this.checklistSelection.select(node);
        }
    }


    // 是否有子节点
    hasChild(_: number, node) {
        return node.children != null && node.children.length > 0;
    }


    // 方法一：数组转map
    list2Map(list, key) {
        let map = new Map;

        list.forEach(item => { map.set(item[key], item); });

        return map;
    }
}