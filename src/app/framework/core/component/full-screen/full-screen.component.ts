import { Component, ViewChild, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'at-full-screen',
    styleUrls: ['./full-screen.component.scss'],
    templateUrl: './full-screen.component.html'
})

export class OmsFullScreenComponent {
    //全屏按钮
    @ViewChild("fullScreen") fullScreen: any;

    //需要全屏的dom节点ID
    @Input() fullScreeenID: string='';
    
    //获取字典
	@Output() backFun: any = new EventEmitter<any>();


    //是否为全屏
    isFullscreen: boolean = false;

    //展示全屏
    showFull() {
        let full;
        if(!this.fullScreeenID) {
            //获取外层弹框
            full = this.fullScreen._elementRef.nativeElement.parentNode.parentNode.parentNode.parentNode
        }else {
            //通过id获取元素
            full = document.getElementById(this.fullScreeenID)
        }
        
        this.launchIntoFullscreen(full);
        this.isFullscreen = true;
    }

    //取消全屏
    delFull() {
        this.exitFullscreen();
        this.isFullscreen = false;
    }

    launchIntoFullscreen(element) {
        if (element.requestFullscreen) {
            element.requestFullscreen();
        }
        else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        }
        else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
        }
        else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        }
        this.backFun.emit(this.isFullscreen)
    }
    exitFullscreen() {
        const docWithBrowsersExitFunctions = document as Document & {
            mozCancelFullScreen(): Promise<void>;
            webkitExitFullscreen(): Promise<void>;
            msExitFullscreen(): Promise<void>;
        }
        if (docWithBrowsersExitFunctions.exitFullscreen) {
            docWithBrowsersExitFunctions.exitFullscreen();
        } else if (docWithBrowsersExitFunctions.mozCancelFullScreen) {
            docWithBrowsersExitFunctions.mozCancelFullScreen();
        } else if (docWithBrowsersExitFunctions.webkitExitFullscreen) {
            docWithBrowsersExitFunctions.webkitExitFullscreen();
        } else if (docWithBrowsersExitFunctions.msExitFullscreen) {
            docWithBrowsersExitFunctions.msExitFullscreen();
        }

        this.backFun.emit(this.isFullscreen)
    }
}