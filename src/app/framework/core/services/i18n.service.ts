import { Injectable } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";

import { SYSTEM_CONFIG } from '../config/system.config';
import { Subject } from 'rxjs';

@Injectable()

export class I18nService {
	//默认语言
	private _default = SYSTEM_CONFIG.LANGUAGE;
	//语言列表
	private _langs = ['zh_CN', 'en'];
	//监听语言变化
	public lang$: any=new Subject();

	constructor(
		public translate: TranslateService
	) { }


	//设置默认语言
	getLangs() {
		return this._langs;
	}

	//获取当前语言
	get currentLang() {
		return (
			this.translate.currentLang ||
			this.translate.getDefaultLang() ||
			this._default
		);
	}

	//存储语言
	storeLang(lang: string) {
		this.lang$.next(lang);
		localStorage.setItem("language", lang);
	}

	//取存储的语言
	storedLang() {
		return localStorage.getItem("language") || 'zh_CN';
	}

	//监听语言变化
	langChange(){
		return this.lang$;
	}
}

