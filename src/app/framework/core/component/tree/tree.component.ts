import { Component, Input, Output, EventEmitter } from '@angular/core';
import {NestedTreeControl} from '@angular/cdk/tree';
import {SelectionModel} from "@angular/cdk/collections";

@Component({
    selector: 'oms-tree',
    styleUrls: ['./tree.component.scss'],
    templateUrl: './tree.component.html'
})

export class OmsTreeComponent {
    @Input() set data(v) {                                  // 所有树数据
        this.tree2Map(v);
        this.data2Tree(v); 
        this.treeOriginData = v; 
    };             
    @Input() set checked(v) { this.setChecked(v, false); }; // 所有选中的数据
    @Input() showCheckBox: boolean;                         // 是否显示多选按钮
    @Input() label: string;                                 // 标签根据哪个属性显示
    @Input() parentId: string = 'root';                     // 根节点id
    @Input() currentChecked: any;                           // 默认选中节点
    @Input() itemIcon: string='';                           // item 图标
    @Input() isOpen: boolean=false;                         // 是否展开节点
    @Input() highSelect: boolean=false;                     // 是否高亮选中节点
    @Input() showBottomLine: boolean=false;                 // 是否显示边线
    @Input() showSearch: boolean=true;                     // 是否显示查询条件

    //选中的节点，分享给父元素
    @Output() clickNode: EventEmitter<any> = new EventEmitter();
    //选择内容，回调给父节点
    @Output() checkedChange: EventEmitter<any> = new EventEmitter<any>();
    //选中的节点，分享给父元素
    @Output() selectNode: EventEmitter<any> = new EventEmitter();

    // 存储树数据的map
    treeMap: Map<string, any> = new Map<string, any>();
    // 解析后的树数据
    treeData: Array<any>;
    // 是否展开节点
    isOpen: boolean=false;
    // 选中的树节点
    checkedNodes: any = [];
    // 过滤条件
    filter: string = '';
    // 树的原始数据
    treeOriginData: any;
    // 树控制
    treeControl = new NestedTreeControl<any>((node) => node.children);
    // 
    checklistSelection = new SelectionModel<any>(true);


    constructor() { }

    // 将全部树数据与选中的树数据解析成树结构
    data2Tree(tree: Array<any>) {
        // 获取所有的根数据
        this.treeData = tree.filter(node => (!node.parentId) || node.parentId == this.parentId);

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
    setChecked(v, flag: boolean = true) {
        this.checkedNodes = v || [];

        this.checkedNodes.forEach(item => {
            let node = this.treeMap.get(item.id);
            if(node && !node.children) {
                this.initLeafSelect(node);
                this.expandParentNode(node);
            }else{ 
                this.todoItemSelectionToggle(node, flag);
            }
        })
    }

    // 点击checkbox
    checkNode(node) {
        if (node.children) {
            this.todoItemSelectionToggle(node);
        }

        this.currentChecked = node;

        // 暴露选中的父节点
        this.clickNode.emit(node);
    }

    todoLeafItemSelectionToggle(node) {
        this.checklistSelection.toggle(node);
        this.checkAllParentsSelection(node);
        this.buildChecked();
        this.selectNode.emit(node);
        this.checkedChange.emit(this.checkedNodes);
    }

    /**
     * 
     * @param node 节点
     * @param flag 是否向父节点分享数据
     */
    todoItemSelectionToggle(node, flag: boolean = true) {
        this.checklistSelection.toggle(node);
        const descendants = this.treeControl.getDescendants(node);

        if (this.checklistSelection.isSelected(node)) {
            this.checklistSelection.select(...descendants);
        } else {
            this.checklistSelection.deselect(...descendants);
        }

        descendants.every(child =>
            this.checklistSelection.isSelected(child)
        );

        this.checkAllParentsSelection(node);

        
        this.buildChecked();

        if(flag) {
            this.checkedChange.emit(this.checkedNodes);
            this.selectNode.emit(node);
        }
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
        let parentNode = this.treeMap.get(node.parentId);
        while (parentNode) {
            this.treeControl.expand(parentNode);
            parentNode = this.treeMap.get(parentNode.parentId);
        }
    }

    // 
    buildChecked() {
        this.checkedNodes = [];
        let checkedNodes = this.checklistSelection.selected;

        if (checkedNodes) {
            let temp = new Map<string, any>();
            for (let i = 0; i < checkedNodes.length; i++) {
                let node = checkedNodes[i];
                if (!temp.get(node.id)) {
                    this.checkedNodes.push(node);
                    temp.set(node.id, node);
                }
                let parentNode = this.treeMap.get(node.parentId);
                while (parentNode) {
                    if (!temp.get(parentNode.id)) {
                        this.checkedNodes.push(parentNode);
                        temp.set(parentNode.id, parentNode);
                    }
                    parentNode = this.treeMap.get(parentNode.parentId);
                }
            }
        }
    }


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

    descendantsPartiallySelected(node): boolean {
        const descendants = this.treeControl.getDescendants(node);
        const result = descendants.some(child => this.checklistSelection.isSelected(child));
        return result && !this.descendantsAllSelected(node);
    }

    descendantsAllSelected(node): boolean {
        const descendants = this.treeControl.getDescendants(node);
        const descAllSelected = descendants.every(child =>
            this.checklistSelection.isSelected(child)
        );
        return descAllSelected;
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

    // 通过子节点获取父节点
    getParentByChild(node, filterTree) {
        if(node && node.parentId && node.parentId != this.parentId) {
            if(!filterTree.filter(item => item.id === node.id).length){
                delete node.children;
                filterTree.push(node);
            }
            this.getParentByChild(this.getParentNode(node), filterTree);
        }

        return filterTree;
    }

    filterItems() {
        let filterTree = [];
        let allTree = [...this.treeOriginData];

        // 转换map
        this.tree2Map(allTree);

        allTree.forEach(item => {
            if(item[this.label].indexOf(this.filter) !== -1) {
                filterTree = this.getParentByChild(item, filterTree);
            }

            if(item.parentId == this.parentId) {
                filterTree.push(item);
            }
        });

        this.treeData = [];

        setTimeout(() => {
            this.data2Tree(filterTree);
        });
    }

    // 树转为map
    tree2Map(tree) {
        // 清空map
        this.treeMap.clear();

        // 将根数据设置成map
        this.treeMap = this.list2Map([...tree], 'id');
    }


    // 方法一：数组转map
    list2Map(list, key) {
        let map = new Map;

        list.forEach(item => { 
            delete item.children;
            map.set(item[key], item); 
        });

        return map;
    }
}