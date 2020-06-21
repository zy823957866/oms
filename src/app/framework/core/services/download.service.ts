/**
 * 下载服务 通过新打开一个窗口下载数据，参数通过url传输
 * CREATE BY ZHOUYONG
 */
import { Injectable } from '@angular/core';

//服务
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';


@Injectable()

export class DownLoadService {

	private _httpOptions: any={
		headers: new HttpHeaders({
			"Content-Type": "application/json"
			}),
			responseType: 'blob'
	} 

	constructor(
		public http: HttpClient
	) { }

	//下载方法
	public downLoad(proxy: any = '/api-report', fileName: string = '', data: any = {}): any {
		let link = document.createElement('a');
		link.href = proxy + fileName;
		link.target = '_blank';
		link.download = fileName;
		if (navigator.userAgent.indexOf("Firefox") > -1) document.body.appendChild(link);
		link.click();
		window.URL.revokeObjectURL(proxy + fileName);
	}
	
	//批量下载
	multiDownLoad(url) {
		let _arr = url.split("/");
		let fieName = _arr[_arr.length - 1];
		var a = document.createElement("a"), //创建a标签
          e = document.createEvent("MouseEvents"); //创建鼠标事件对象
		e.initEvent("click", false, false); //初始化事件对象
		a.href = url; //设置下载地址
		a.download = fieName; //设置下载文件名
		a.dispatchEvent(e); //给指定的元素，执行事件click事件
	}
}