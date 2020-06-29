//工具包
import { Directive, ElementRef, Renderer2 } from '@angular/core';


@Directive({
    selector: '[dialogDrag]'
})


export class DialogDragDirective{
    private element:HTMLElement;
    private elementDlalog:HTMLElement;


    constructor(
        private el: ElementRef,
        private rend2: Renderer2,
    ){
    }
    ngAfterViewInit() {
        //获取外层浏览器Dom
        this.element=this.el.nativeElement.parentNode.parentNode.parentNode.parentNode.parentNode;

        this.elementDlalog=this.el.nativeElement.parentNode.parentNode.parentNode;
        // Drag&Drop boundary组件
        if(this.element) this.rend2.addClass(this.element,'example-boundary');
        //修改diolog最外层样式
        this.rend2.setStyle(this.el.nativeElement,'background','white')
        if(this.elementDlalog) {
            this.rend2.setStyle(this.elementDlalog,'background','none')
            this.rend2.setStyle(this.elementDlalog,'box-shadow','none')
        }
    }
}