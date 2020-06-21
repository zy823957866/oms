/**
 * @desc 分页器
 * @date 2019.04.17
 * @auth zy
 */
//工具包
import { Component, Input, Output, EventEmitter } from '@angular/core';



@Component({
	selector: 'app-pagination',
	styleUrls: ['./pagination.component.scss'],
	templateUrl: './pagination.component.html'
})


export class AppPaginationComponent {
	//分页数据
  @Input() 
    get pageDto() { return this.page;}
    set pageDto(v) { 
      if(v) {
        this.page = Object.assign({}, this.page, v);
        this.currentPage = this.page.pageNo + 1;
      }
    }
  //是否显示下拉框
  @Input() showPer: boolean=true;
  
  //分享一个查询事件到父元素
  @Output() searchData: EventEmitter<any> = new EventEmitter<any>();

  //分页
  public page: any={
    currentSize: 0,     //当前页显示的条目
		totalCount: 0,    //数据总条目
		pageCount: 0,      //总共多少页
		pageNo: 0,          //当前页
		pageSize: 10        //分页大小
  };
	//分页选项
  public pageSelectOptions: any[number]=[20, 30, 50, 100, 200, 500];
  //当前页码,默认指向第一页
  public currentPage: number=1;


	constructor() { }
  
  
  setPage(pageData: any={}, flag: string='') {
    //验证页码是否有效
    if(this.testIsValidPage(pageData.offset, flag))
      this.searchData.emit({offset: pageData.offset,pageSize: this.page.pageSize});
  }


  /**
   * 验证页码是否输入正确
   * @page 当前页码
   * @flag 判断是第一个还是最后一个button
   */

  testIsValidPage(page, flag:string='') {
    if((flag === 'first' && this.currentPage === 1)
      || (flag === 'last' && this.currentPage === this.page.pageCount)) {
      return false;
    }

    //小于0
    if(page < 0) {

      this.page.pageNo = 0;
      this.currentPage = 1;

      return false;
    }

    //大于最大页码
    if(page > this.page.pageCount - 1) {
      this.page.pageNo = this.page.pageCount - 1;
      this.currentPage = this.page.pageCount;

      return false;
    }

    return true;
  }
}