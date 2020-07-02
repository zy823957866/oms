//工具包
import { Directive, Input, ElementRef, Renderer2 } from '@angular/core';

declare let $;

@Directive({
    selector: '[elResize]'
})

export class ElResizeDirective {
    @Input() private elResize: boolean = true;

    // 目标元素
    target: HTMLElement;
    // 宽度是否可以拖拽
    resizeW: boolean = false;
    // 高度是否可以拖拽
    resizeH: boolean = false;
    // 历史偏移X轴位置
    startX: number;
    // 历史偏移Y轴位置
    startY: number;
    // 最大偏移距离
    size: number = 20;
    // 最小偏移距离
    minSize: number = 10;

    constructor(
        private el: ElementRef,
        private rend2: Renderer2
    ){}

    ngAfterViewInit(): void {
        this.target = this.el.nativeElement.parentNode.parentNode.parentNode.parentNode;
        this.dragDivResize(this.target);
    }

    dragDivResize(target: HTMLElement) {
        let self = this;
        $(target).on("mouseover mousemove", function($event) {
            self.overHandler($event)
        });
    }

    overHandler(event) {
        let self = this;

        // 设置拖拽的元素
        let target = this.target;

        // 获取位置
        let scroll = this.getScrollOffsets();
        
        // 记录元素宽高
        let w = $(target).width();
        let h = $(target).height();

        // 记录历史x、y轴偏移
        this.startX = parseInt(event.clientX + scroll.x);
        this.startY = parseInt(event.clientY + scroll.y);

        // 手柄位置
        let endX = target.offsetLeft + w - this.startX;
        let endY = target.offsetTop + h - this.startY;

        if( (0 < endX && endX < this.size) || ( 0 < endY && endY < this.size )) {
            target.style.outline = "2px dashed #333";

            if(( 0 > endX || endX > this.size ) && 0 < endY && endY < this.size ) {
                this.resizeW = false;
                this.resizeH = true;
                document.body.style.cursor = "s-resize";
            }

            if( 0 < endX && endX < this.size && ( 0 > endY || endY > this.size ) ){
                this.resizeW = true;
                this.resizeH = false;
                document.body.style.cursor = "w-resize";
            }

            if( 0 < endX && endX < this.size && 0 < endY && endY < this.size ) {
                this.resizeW = true;
                this.resizeH = true;
                document.body.style.cursor = "se-resize";
            }

            $(target).on('mousedown', function($event) { self.downHandler( $event, target ) });
        } else {
            this.resizeW = false;
            this.resizeH = false;

            $(target).off('mousedown', function($event) { self.downHandler( $event, target ) });
        }
    }

    // 按下手柄
    downHandler(event, target) {
        let self = this;
        console.log('sd--sf-d-sf--d-f-')
        if (document.addEventListener) {
            
            document.addEventListener("mousemove", function($event) { self.moveHandler($event, target ) }, true);
            document.addEventListener("mouseup", function($event) { self.upHandler($event, target ) }, true);
        } else if (document['attachEvent']) {
            target.setCapture();
            target.attachEvent("onlosecapeture", function($event) { self.upHandler($event, target ) });
            target.attachEvent("onmouseup", function($event) { self.upHandler($event, target ) });
            target.attachEvent("onmousemove", function($event) { self.moveHandler($event, target ) });
        }
    }

    
    // 按下鼠标并进行移动手柄
    moveHandler(event, target) {
        if (target == document.body) { return; }

        console.log("s-s-s-s-s-s--s-s-")

        event = event || window.event;

        let deltaX, deltaY;
        let scroll = this.getScrollOffsets();
        
        // 当前手柄所在的X、Y轴左边
        let currentX = parseInt(event.clientX + scroll.x);
        let currentY = parseInt(event.clientY + scroll.y);
        if (this.resizeW) {
            deltaX = currentX - this.startX;
            target.style.width = (($(target).width() + deltaX < this.minSize) ? this.minSize : ($(target).width() + deltaX)) + 'px';
            this.startX = currentX;
        }

        if(this.resizeH) {
            deltaY = currentY - this.startY;
            target.style.height = (($(target).height() + deltaY < this.minSize) ? this.minSize : ($(target).height() + deltaY)) + 'px';
            this.startY = currentY;
        }

        event.stopPropagation ? event.stopPropagation() : event.cancelBubble = true;
    }


    // 停止移动手柄
    upHandler(event, target) {
        event = event || window.event;

        let self = this;

        // 停止拖拽手柄
        this.resizeW = false;
        this.resizeH = false;

        $(target).on("mouseout", function($event){ self.outHandler($event, target) });

        if (document.removeEventListener) {
            document.removeEventListener("mousemove", function($event) { self.moveHandler($event, target ) }, true);
            document.removeEventListener("mouseup", function($event) { self.upHandler($event, target ) }, true);
        } else if (document['detachEvent']) {
            target.detachEvent("onlosecapeture", function($event) { self.upHandler($event, target ) });
            target.detachEvent("onmouseup", function($event) { self.upHandler($event, target ) });
            target.detachEvent("onmousemove", function($event) { self.moveHandler($event, target ) });
            target.releaseCapture();
          }

        event.stopPropagation ? event.stopPropagation() : event.cancelBubble = true;
    }

    // 还原拖拽效果
    outHandler(event, target) {
        target.style.outline = "none";
        document.body.style.cursor = "default";
    }

    // 获取元素的偏移量
    getScrollOffsets(w: any = null) {
        w = w || window;

        if (w.pageXOffset != null) {
            return { x: w.pageXOffset, y: w.pageYOffset };
        }
        var d = w.document;
        if (document.compatMode == "CSS1Compat") {
            return { x: d.documentElement.scrollLeft, y: d.documentElement.scrollTop };
        }

        return { x: d.body.scrollLeft, y: d.body.scrollTop };
    }
}