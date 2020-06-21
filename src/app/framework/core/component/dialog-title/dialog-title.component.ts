import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'oms-dialog-title',
    styleUrls: ['./dialog-title.component.scss'],
    templateUrl: './dialog-title.component.html'
})

export class OmsDialogTitleComponent {
    //弹框标题
    @Input() title: string='';
    //是否显示全屏
    @Input() showFullScreen: boolean=false;
    //是否显示标题
    @Input() showTitle: boolean=true;
    //是否显示加载中状态
    @Input() set showLoading(v) {
        this._showLoading = v;
    }
    //全屏按钮操作回调
    @Output() backFun: any = new EventEmitter<any>();

    //是否为全屏
    isFullScreen: boolean=false;

    _showLoading: boolean=false;


    setFullScreen(e) {
        this.isFullScreen = !e;
        this.backFun.emit(this.isFullScreen);
    }
}