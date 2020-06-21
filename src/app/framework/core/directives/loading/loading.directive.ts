/**
 * @desc 加载中指令
 * @auth zy
 * @date 2019.04.29
 */
//工具包
import { Directive, Input, ElementRef, Renderer2 } from '@angular/core';

declare let $;

@Directive({
    selector: '[loading]'
})


export class LoadingDirective{
    //原始button class
    originClass: string = '';
    //原始图标class
    originIconClass: string = '';
    // 原始图标
    originIcon: string = '';
    // 白色loading图标位置
    loadingSrc: string='assets/images/btn-loading/button-loading.svg';
    // 黑色loading图标位置
    loadingSrcBlank: string='assets/images/btn-loading/button-loading-blank.svg';

    // 加载状态改变
    @Input() set loading(v) {
        v ? this.addLoadingIcon() : this.removerLoadingIcon();
    }
    
    constructor(
        private el: ElementRef,
        private rend2: Renderer2
    ){}

    /**
     * 加载中设计思路
     * 1.如果按钮有图标，则替换图标
     * 2.如果按钮没有图标，则新增一个图标
     */
    addLoadingIcon() {
        //获取按钮上的图标
        let _originIcon = this.el.nativeElement.children[0].getElementsByTagName('mat-icon')[0];

        //保存按钮初始化class，用于后面还原
        this.originClass = this.el.nativeElement.className;

        //设置按钮状态，让其禁用
        this.el.nativeElement.className = this.originClass + ' loading';
        if(_originIcon) {
            //如果有图标，替换图标
            this.originIconClass = _originIcon.className;
            this.originIcon = this.el.nativeElement.children[0].getElementsByTagName('mat-icon')[0];

            this.el.nativeElement.children[0].removeChild(this.originIcon);
            this.insertIcon();

        }else {
            //如果没有图标，则新增图标
            this.insertIcon();
        }
    }

    //正常
    removerLoadingIcon() {
        //判断按钮是否处于加载中
        if(this.el.nativeElement.className.includes(" loading")) {
            //获取按钮上的图标
            let _originSrc = this.el.nativeElement.children[0].src;

            //还原按钮class
            this.el.nativeElement.className = this.originClass;

            if(_originSrc) {
                 //还原图标
                 this.delIcon();
                 this.el.nativeElement.children[0].innerHTML = this.nodeToString(this.originIcon) + this.el.nativeElement.children[0].innerHTML
                
            } else {
                //删除图标
                this.el.nativeElement.removeChild(this.el.nativeElement.children[0]);
            }
        }
    }

    //插入一个新loading图标
    insertIcon(){
        let _icon = document.createElement("img");

        
        if(this.el.nativeElement.className.indexOf('mat-primary') !== -1) {
            $(_icon).attr('src', this.loadingSrc);
        }else {
            $(_icon).attr('src', this.loadingSrcBlank);
        }
        
        _icon.className = 'mat-icon material-icons loading-icon';

        this.el.nativeElement.insertBefore(_icon, this.el.nativeElement.children[0]);
    }

    //删除图标
    delIcon() {
        this.el.nativeElement.removeChild(this.el.nativeElement.children[0]);
    }

    //node节点转字符串
    nodeToString ( node ) {
        if(node) {
            var tmpNode = document.createElement( "div" );
            tmpNode.appendChild( node.cloneNode( true ) );
            var str = tmpNode.innerHTML;
            tmpNode = node = null;
            return str;
        }
        return '';
     }
     
}