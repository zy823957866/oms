
/**
 * @desc 添加class，校验输入框时的样式
 * @auth fyz
 * @date 2019.06.25
 */
//工具包
import { Directive, Input, ElementRef, Renderer2 } from '@angular/core';


@Directive({
    selector: '[oms-valid-style]'
})


export class ValidStyleDirective{
    @Input('oms-valid-style') formError:any;

    private element:HTMLElement;

    constructor(
        private el: ElementRef,
        private rend2: Renderer2,
    ){}
    
    ngOnChanges(){
        this.element = this.el.nativeElement;
       
        if(this.formError){
            this.rend2.addClass(this.element,'ng-invalid-form');
            this.rend2.removeClass(this.element,'ng-valid-form')
        }else{
            this.rend2.addClass(this.element,'ng-valid-form');
            this.rend2.removeClass(this.element,'ng-invalid-form')
        }
    } 
}