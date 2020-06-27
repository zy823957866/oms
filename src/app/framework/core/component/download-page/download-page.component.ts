import { Component, Output, Input, EventEmitter } from '@angular/core';

@Component({
    selector: 'oms-download-page',
    styleUrls: ['./download-page.component.scss'],
    templateUrl: './download-page.component.html'
})

export class OmsDownloadPageComponent {
    //是否启用导出所有功能 //默认启用
    @Input() isEnable: boolean = true;
    //加载状态
    @Input() loadingState: boolean = false;
    //点击导出按钮，返回给父元素一个回调函数
    @Output() downLoadFile: EventEmitter<any> = new EventEmitter<any>();
    //下载的格式集合 
    public downLoadTypes: any = [
        // 下载xlsx格式excel文件
        { type: 'oms-xlsx', tips: "XLSX" },
        // 下载xls格式excel文件
        { type: 'oms-xls', tips: "XLS", hide: true },
        // 下载csv格式文件
        { type: 'oms-csv', tips: "CSV" },
        // 下载txt格式文件
        { type: 'oms-txt', tips: "TXT" }
    ];

    constructor() { }

    //下载目标文件
    downLoadTarget(type: string = 'xlsx', arg: string = 'all') {
        this.downLoadFile.emit({ type: type, arg: arg });
    }
}