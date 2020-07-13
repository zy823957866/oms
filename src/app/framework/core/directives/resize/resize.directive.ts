//工具包
import { Directive, Input, ElementRef, Renderer2 } from '@angular/core';

declare let $;

const config = {
    handleW: 4,         // 可拖拽区域离边界4px
    divMinWith: 500,    // div最小宽度
    divMinHeight: 300,  // div最小高度
}

@Directive({
    selector: '[elResize]'
})

export class ElResizeDirective {
    @Input() private elResize: boolean = true;

    constructor(
        private el: ElementRef,
        private rend2: Renderer2
    ){}

    ngAfterViewInit(): void {
        // 计算box的宽高
        setTimeout(() => {
            // 设置拖拽改变div大小
            this.dragDivResize();

            // 设置拖拽区域的相关尺寸
            this.setDragSize();
        });
    }

    // 计算4个手柄初始宽高位置及外部div的宽高
    setDragSize(){
        let el = this.el.nativeElement;
        let parentEl = this.el.nativeElement.parentNode.parentNode.parentNode;
        let parentW = 2 * config.handleW + $(parentEl).width();
        let parentH = 2 * config.handleW + $(parentEl).height();

        // 外部div尺寸
        $(el).width(parentW);
        $(el).height(parentH);

        // 设置手柄
        $(el).find('#left').height(parentH);
        $(el).find('#top').width(parentW);
        $(el).find('#right').height(parentH);
        $(el).find('#bottom').width(parentW);

        setTimeout(() => {
            $(el).css({
                position: 'absolute',
                left: ($(document).width() - parentW) / 2 + 4 + 'px',
                top: ($(document).height() - parentH) / 2 - 1 + 'px',
            })
        },1000);
    }

    dragDivResize() {
        let u_left = document.getElementById('left');
        let u_top = document.getElementById('top');
        let u_right = document.getElementById('right');
        let u_bottom = document.getElementById('bottom');

        let currentX = 0,               // 用来记录鼠标按下时的横坐标
            currentY = 0,               // 用来记录鼠标按下时的纵坐标
            currentDivWidth = 0,        // 鼠标按下时div的宽度
            currentDivHeight = 0,       // 鼠标按下时div的高度
            currentDivX = 0,            // 鼠标按下时div的横坐标
            currentDivY = 0;            // 鼠标按下时div的纵坐标
        let currentCanvasDiv = null;    // 鼠标按下时存放要改变大小的div
        let currentBorder = null;       // 鼠标按下时存放当前拖动的边

        // 绑定鼠标按下事件
        u_left.onmousedown = mouseDown;
        u_top.onmousedown = mouseDown;
        u_right.onmousedown = mouseDown;
        u_bottom.onmousedown = mouseDown;

        function mouseDown(event) {
            currentX = event.clientX;
            currentY = event.clientY;
            const path = event.path || (event.composedPath && event.composedPath()); // 获取当前点击事件冒泡所经过的路径同时解决火狐的兼容问题
            currentCanvasDiv = path[1];
            currentBorder = path[0].id;

            currentDivWidth = parseInt(currentCanvasDiv.style.width);
            currentDivHeight = parseInt(currentCanvasDiv.style.height);

            console.log(currentCanvasDiv, currentDivWidth, currentDivHeight)

            currentDivX = parseInt(currentCanvasDiv.style.left);
            currentDivY = parseInt(currentCanvasDiv.style.top);

            document.addEventListener("mousemove", eval(currentBorder + 'Move'));
            document.addEventListener("mouseup", mouseUp);
        }

        function mouseUp() {
            document.removeEventListener("mousemove", eval(currentBorder + 'Move'));
            document.removeEventListener("mouseup", mouseUp);
        }

        // 拖动左侧边
        function leftMove(event) {
            let _X = event.clientX;
            let _width = currentDivWidth + currentX - _X; // 拖动后div的宽度
            if (_width <= config.divMinWith) { // 设置可以拖动的最小宽度
                u_bottom.style.width = u_top.style.width = currentCanvasDiv.style.width = config.divMinWith + 'px';
                currentCanvasDiv.style.left = currentDivWidth + currentDivX - config.divMinWith + 'px'; // 使左侧边向左移动，否则改变宽度时div会默认向右增宽
            } else {
                u_bottom.style.width = u_top.style.width = currentCanvasDiv.style.width = _width + 'px';
                currentCanvasDiv.style.left = currentDivX + _X - currentX + 'px';
            }
        }

        function rightMove(event) {
            let _X = event.clientX;
            let _width = currentDivWidth + _X - currentX;
            if (_width <= config.divMinWith) {
                u_bottom.style.width = u_top.style.width = currentCanvasDiv.style.width = config.divMinWith + 'px';
            } else {
                u_bottom.style.width = u_top.style.width = currentCanvasDiv.style.width = _width + 'px';
            }
        }

        function bottomMove(event) {
            let _Y = event.clientY;
            let _height = currentDivHeight + _Y - currentY;
            if (_height <= config.divMinHeight) {
                u_left.style.height = u_right.style.height = currentCanvasDiv.style.height = config.divMinHeight + 'px';
            } else {
                u_left.style.height = u_right.style.height = currentCanvasDiv.style.height = _height + 'px';
            }
        }

        function topMove(event) {
            let _Y = event.clientY;
            let _height = currentDivHeight + currentY - _Y;
            if (_height <= config.divMinHeight) {
                u_left.style.height = u_right.style.height = currentCanvasDiv.style.height = config.divMinHeight + 'px';
                currentCanvasDiv.style.top = currentDivHeight + currentDivY - config.divMinHeight + 'px';
            } else {
                u_left.style.height = u_right.style.height = currentCanvasDiv.style.height = _height + 'px';
                currentCanvasDiv.style.top = currentDivY + _Y - currentY + 'px';
            }
        }
    }
}