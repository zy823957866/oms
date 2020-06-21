/**
 * @desc 权限控制
 * @auth zy
 * @date 2019.04.29
 */
//工具包
import { Directive, Input, ElementRef, Renderer2 } from '@angular/core';
import { StorageService } from '../../services/storage.service';


@Directive({
    selector: '[permission]'
})


export class PermissionDirective{
    private authAll: any;

    @Input() private permission: any;
    
    constructor(
        private el: ElementRef,
        private rend2: Renderer2,
        private _store: StorageService
    ){
        this.authAll = this._store.getObject('auth') || [];
    }

    ngAfterViewInit() {
        if(this.authAll && this.authAll.length > 0 && this.permission !== ''){
            
            if(this.permission instanceof Array) {
                let flag = false;

                this.permission.forEach(item => {
                    if(!flag && (item === '' || this.authAll.indexOf(item) !== -1)) flag = true;
                });

                if(!flag) {
                    this.rend2.setStyle(this.el.nativeElement, 'display', 'none');
                }
            }else {
                let _status = this.authAll.indexOf(this.permission);
                if(_status === -1){
                    this.rend2.setStyle(this.el.nativeElement, 'display', 'none');
                }
            }
        }
    }
}