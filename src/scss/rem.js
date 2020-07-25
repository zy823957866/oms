/**==========================================================
* 这里用JS动态控制页面的字体
* 根据页面尺寸和屏幕分辨率
*===========================================================*/

!function(win, lib) {
    var timer,
        doc     = win.document,
        docElem = doc.documentElement,

        vpMeta   = doc.querySelector('meta[name="viewport"]'),
        
        dpr   = 1,
        scale = 0,
 
        flexible = lib.flexible || (lib.flexible = {});

    // 设置了 viewport meta
    if (vpMeta) {
        var initial = vpMeta.getAttribute("content").match(/initial\-scale=([\d\.]+)/);
        var winWidth = docElem.clientWidth;

        if (initial) {
            if(winWidth >= 1440){
                dpr = 2;
            }else{
                dpr = 1;
            }

            scale = 1 / dpr;

            vpMeta.setAttribute('content', 'width=' + dpr * docElem.clientWidth + ',initial-scale=' + scale + ',maximum-scale=' + ',minimum-scale=' + scale + ',user-scalable=no');
        }
    }
 
    docElem.setAttribute("data-dpr", dpr);
 

    // 记录屏幕缩放比例
    function detectZoom() {
        var ratio = 0,
            screen = window.screen,
            ua = navigator.userAgent.toLowerCase();

        if (window.devicePixelRatio !== undefined) {
            ratio = window.devicePixelRatio;
        }
        else if (~ua.indexOf('msie')) {
            if (screen.deviceXDPI && screen.logicalXDPI) {
                ratio = screen.deviceXDPI / screen.logicalXDPI;
            }
        }
        else if (window.outerWidth !== undefined && window.innerWidth !== undefined) {
            ratio = window.outerWidth / window.innerWidth;
        }

        if (ratio) {
            ratio = Math.round(ratio * 100);
        }
        return ratio;
    }

    
    function setFontSize() {
        let baseSize = getBaseSize();
 
        docElem.style.fontSize = baseSize + "px";
        flexible.rem = win.rem = baseSize;
    }

    // 设置rem大小
    function getBaseSize() {
        var winWidth = docElem.clientWidth;
        var baseSize;
        var scale = detectZoom() / 100;

        baseSize = Math.ceil(winWidth * 10 / 1920) * 10;

        if(baseSize < 70) {
            baseSize = 70;
        }else if(baseSize < 80) {
            baseSize = 80;
        } else if (baseSize < 90) {
            baseSize = 90;
        }else if(baseSize < 100) {
            baseSize = 100;
        }

        // console.log(baseSize, scale)
    
        return baseSize;
    }
 
    // 调整窗口时重置
    win.addEventListener("resize", function() {
        clearTimeout(timer);
        timer = setTimeout(setFontSize, 100);
    }, false);
 
    // pageshow
    // keyword: 倒退 缓存相关
    win.addEventListener("pageshow", function(e) {
        if (e.persisted) {
            clearTimeout(timer);
            timer = setTimeout(setFontSize, 100);
        }
    }, false);
  
    setFontSize();
 
    flexible.dpr = win.dpr = dpr;
 
    flexible.refreshRem = setFontSize;

    win.px2px = function(d) {
        return Math.ceil(d * getBaseSize() / 400) * 4;
    }
}(window, window.lib || (window.lib = {}));