/*
 * @Desc: 计算时间
 * @Date: 2019-07-02 20:03:02
 * @Author: JHON
 */

// 工具包
import { Injectable } from "@angular/core";

@Injectable()


export class MomentService {
    //当前时间
    private date: Date = new Date();

    //获取时间戳
    public getTimeStamp(date: any=new Date()): number{

        if(typeof date !== "object"){
            date = this.getInstance(date);
        }

        let _option: number = date.getTime();

        return _option;
    }


    //获取指定时间时间实例化对象
    public getInstance(date: any): object{

        let _option: object = {};

        try{
            _option = new Date(date);
        }catch(err){
            console.error('error massage: getInstance 日期格式错误；');
        }

        return _option;
    }

    /**
     * 格式化当前日期
     * @param type 参数 返回日期格式
     * @param date 参数 指定日期， <date>
     * @param parse 参数 是否返回时间戳
     * @returns string
     */
    public dateFormat(type: string="yyyy-MM-dd", date: any=new Date(), parse: boolean=false): any{
        if(!date) return null;
        if(typeof date !== "object"){
            date = this.getInstance(date);
        }

        if(parse){
            //直接返回时间戳，毫秒计
            return date.getTime();
        }

        if(date) {
            let o = {
                'M+': date.getMonth() + 1, // 月份
                'd+': date.getDate(), // 日
                'h+': date.getHours(), // 小时
                'm+': date.getMinutes(), // 分
                's+': date.getSeconds(), // 秒
                'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
                'S': date.getMilliseconds(), // 毫秒
            };
    
            if (/(y+)/.test(type)) {
                type = type.replace(
                    RegExp.$1,
                    (date.getFullYear() + '').substr(4 - RegExp.$1.length),
                );
            }
    
            for (let k in o) {
                if (new RegExp('(' + k + ')').test(type)) {
                    type = type.replace(
                        RegExp.$1,
                        RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
                    );
                }
            }
            return type;
        }else {
            return null;
        }
    }
}
