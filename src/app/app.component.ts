/*
 * @Author: zhouyong
 * @Date: 2020-06-13 00:13:05
 */
// 工具包
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { DomSanitizer } from "@angular/platform-browser";
import { MatIconRegistry } from "@angular/material/icon";
import { icons, iconBaseSrc } from './framework/core/config/icon-registry.config';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})


export class AppComponent {

    en = true;
	zh_CN = false;
	constructor(
        public translate: TranslateService,
        private matIconRegistry: MatIconRegistry,
        private domSanitizer: DomSanitizer
	) {
        // 注册图标
        this.registryIcon();

		//添加语言支持
		translate.addLangs(["en", "zh_CN"]);

		//设置默认语言，一般在无法匹配的时候使用
		translate.setDefaultLang('zh_CN');

		//获取当前浏览器环境的语言比如en、 zh
		let browserLang = translate.getBrowserLang();
		translate.use(browserLang.match(/en|zh_CN/) ? browserLang : 'zh_CN');
    }

	//切换语言
	changeLan(lan) {
		this.translate.use(lan);
    }
    
    // 注册图标
    registryIcon() {
        icons.forEach(item => {
            this.matIconRegistry.addSvgIcon(
                item.icon, 
                this.domSanitizer.bypassSecurityTrustResourceUrl(iconBaseSrc + item.src)
            )
        });
    }
}
