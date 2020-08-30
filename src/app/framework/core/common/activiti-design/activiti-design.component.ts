import { Component, Output, EventEmitter, Input } from '@angular/core';
import 'ey-activiti-designer';

@Component({
    selector: 'activiti-design',
    styleUrls: ['./activiti-design.component.scss'],
    templateUrl: './activiti-design.component.html'
})

export class ActivitiDesignComponent {
    // xml内容
    @Input() set xml(v) {
        if(v) {
            setTimeout(() => {
                // 打开
                this.activiti.open(v);
            })
        }
    }
    // 保存回调
    @Output() save: any = new EventEmitter<any>();

    activiti: any;
    
    ngOnInit() {
        setTimeout(() => {
            this.activiti = window['activiti_design']()
            // 打开
            this.activiti.open();
            // 保存
            this.activiti.save((data) => {
                this.save.emit(data);
            })
        })
        
    }
}