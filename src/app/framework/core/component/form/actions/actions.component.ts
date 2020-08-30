import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'oms-actions',
    styleUrls: ['./actions.component.scss'],
    templateUrl: './actions.component.html'
})

export class OmsActionsComponent {
    // 是否为弹框
    @Input() layer: boolean = false;

    // 操作数据
    @Input() btns: any = {};

    // 加载状态
    @Input() loading: any = {};

    // 是否显示更多
    @Input() more: boolean = false;

    // 按钮位置
    @Input() align: string = 'left';

    // 回调
    @Output() actionsCb: any = new EventEmitter<any>();

    backFunToForm(e) {
        this.actionsCb.emit(e);
    }

    toggleSearch() {
        this.more = !this.more;
        this.actionsCb.emit(this.more);
    }
}