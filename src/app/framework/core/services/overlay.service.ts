import { Injectable, ViewContainerRef } from "@angular/core";
import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { MatDialogConfig } from '@angular/material/dialog';
import { isNumber } from 'lodash';


@Injectable()
export class overlayService {
    constructor(
        public overlay: Overlay
    ) {}

    // 打开
    open(componentOrTemplateRef, config) {
        config = Object.assign({}, new MatDialogConfig(), {
            maxWidth: '100vh',
            maxHeight: '100vh'
        },config);

        if(!config.position) {
            // 默认居中打开弹框
            config.positionStrategy = this.showOverlayCenter();
        } else if(Object.getOwnPropertyNames(config.position).length) {
            // 用户自定义
            config.positionStrategy = this.showOverlayUserDefine(config.position);
        }

        let el = config.positionByEl && (config.positionByEl.nativeElement || config.positionByEl['_elementRef'].nativeElement);
        if(el) {
            // 通过元素定位
            config.positionStrategy = this.showOverlayByEl(el);
        }

        // 创建
        this.create(componentOrTemplateRef, config);
    }


    // 创建弹出层
    createOverlay(config) {
        const overlayConfig = this.getOverlayConfig(config);
        return this.overlay.create(overlayConfig);
    }

    // 创建overlay配置
    getOverlayConfig(config) {
        let state = new OverlayConfig({
            positionStrategy: this.overlay.position().global(),
            scrollStrategy: config.scrollStrategy || this.overlay.scrollStrategies.reposition(),
            panelClass: config.panelClass,
            hasBackdrop: config.hasBackdrop,
            direction: config.direction,
            minWidth: config.minWidth,
            minHeight: config.minHeight,
            maxWidth: config.maxWidth,
            maxHeight: config.maxHeight,
            disposeOnNavigation: config.closeOnNavigation
        })

        return state;
    }


    // 居中打开
    showOverlayCenter() {
        return this.overlay.position().global().centerHorizontally().centerVertically();
    }


    // 用户自定义位置打开弹框
    showOverlayUserDefine(pos) {
        const { left, right, top, bottom } = pos;
        let strategy = this.overlay.position().global();

        // 水平方向处理
        if(left === undefined && right === undefined) {
            strategy.centerHorizontally();
        } else if(left !== undefined) {
            strategy.left(this.setPos(left));
        } else if(right !== undefined) {
            strategy.right(this.setPos(right));
        }
        
        // 垂直方向处理
        if(top === undefined && bottom === undefined) {
            strategy.centerVertically();
        } else if(top !== undefined) {
            strategy.top(this.setPos(top));
        } else if(bottom !== undefined) {
            strategy.bottom(this.setPos(bottom));
        }

        return strategy;
    }


    // 通过元素定位
    showOverlayByEl(el) {
        return this.overlay.position()
            .flexibleConnectedTo(el)
            .withPositions([{
                originX: 'center',
                originY: 'bottom',
                overlayX: 'center',
                overlayY: 'top',
                offsetX: 0,
                offsetY: 0
            }])
            .withLockedPosition(true);
    }

    // 创建
    create(componentOrTemplateRef, config) {
        const overlayRef = this.overlay.create(config);

        overlayRef.backdropClick().subscribe(() => {
            overlayRef.dispose(); // 点击背景关掉弹窗
        });
        
        overlayRef.attach(new ComponentPortal(componentOrTemplateRef));
    }


    // 解析位置信息
    setPos(pos) {
        return isNumber(pos) ? pos + 'px' : pos;
    }
    
}