//转为千分位
export function toThousand(value) {
    if(!value) return value;
  
    if(value.toString().indexOf ('.') !== -1) {
        let _s = value.toString();
        let _d = Number('0.' + _s.split('.')[1]).toFixed(2);
  
        value = ((_d === '1.00' ? (_s.split('.')[0] * 1 + 1) : _s.split('.')[0]) + '.' + ((_d === '0.00' || _d === '1.00') ? '00' : _d.split(".")[1])).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
    }else {
        
        value = value.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
    }
  
    return value;
}
  

//转为百分比
export function toPercent(value){
    if(!value) return value;
    return (value * 100).toFixed(2) + '%';
}


// 通过某数属性进行排序
export function compare(propertyName) {
    return function(object1, object2) {
        var value1 = object1[propertyName]||0;
        var value2 = object2[propertyName]||0;
        if (value2 < value1) {
            return -1;
        } else if (value2 > value1) {
            return 1;
        } else {
            return 0;
        }
    }
}


// 加法函数
export function accAdd(arg1, arg2) {
    var r1, r2, m, c;
    
    try {
        r1 = arg1.toString().split(".")[1].length;
    } catch (e) {
        r1 = 0;
    }
    
    try {
        r2 = arg2.toString().split(".")[1].length;
    } catch (e) {
        r2 = 0;
    }
    
    c = Math.abs(r1 - r2);
    m = Math.pow(10, Math.max(r1, r2));
    
    if (c > 0) {
        var cm = Math.pow(10, c);
        
        if (r1 > r2) {
            arg1 = Number(arg1.toString().replace(".", ""));
            arg2 = Number(arg2.toString().replace(".", ""));
        } else {
            arg1 = Number(arg1.toString().replace(".", ""));
            arg2 = Number(arg2.toString().replace(".", ""));
        }
    } else {
        arg1 = Number(arg1.toString().replace(".", ""));
        arg2 = Number(arg2.toString().replace(".", ""));
    }
    
    return (arg1 + arg2) / m;
}


/**
 ** 减法函数，用来得到精确的减法结果
 ** 说明：javascript的减法结果会有误差，在两个浮点数相减的时候会比较明显。这个函数返回较为精确的减法结果。
 ** 调用：accSub(arg1,arg2)
 ** 返回值：arg1减去arg2的精确结果
 **/
export function accSub(arg1, arg2) {
    var r1, r2, m, n;
    try {
        r1 = arg1.toString().split(".")[1].length;
    } catch (e) {
        r1 = 0;
    }
    
    try {
        r2 = arg2.toString().split(".")[1].length;
    } catch (e) {
        r2 = 0;
    }
    
    m = Math.pow(10, Math.max(r1, r2)); //last modify by deeka
    
    //动态控制精度长度
    n = (r1 >= r2) ? r1 : r2;
    return ((arg1 * m - arg2 * m) / m).toFixed(n);
}

 
/**
 ** 乘法函数，用来得到精确的乘法结果
 ** 说明：javascript的乘法结果会有误差，在两个浮点数相乘的时候会比较明显。这个          函数返回较为精确的乘法结果。
 ** 调用：accMul(arg1,arg2)
 ** 返回值：arg1乘以 arg2的精确结果
 **/
export function accMul(arg1, arg2) {
    var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
    try {
        m += s1.split(".")[1].length;
    } catch (e) {}
    
    try {
        m += s2.split(".")[1].length;
    } catch (e) {}
    
    return Number(s1.replace(".", "")) * Number(s2.replace(".", ""))
            / Math.pow(10, m);
}
 
/** 
 ** 除法函数，用来得到精确的除法结果
 ** 说明：javascript的除法结果会有误差，在两个浮点数相除的时候会比较明显。这个          函数返回较为精确的除法结果。
 ** 调用：accDiv(arg1,arg2)
 ** 返回值：arg1除以arg2的精确结果
 **/
export function accDiv(arg1, arg2, fixed = null) {
    var t1 = 0, t2 = 0, r1, r2;
    try {
        t1 = arg1.toString().split(".")[1].length;
    } catch (e) {}
    
    try {
        t2 = arg2.toString().split(".")[1].length;
    } catch (e) { }
    
    r1 = Number(arg1.toString().replace(".", ""));
    r2 = Number(arg2.toString().replace(".", ""));

    let res = (r1 / r2) * Math.pow(10, t2 - t1)
    return fixed===null ? res : res.toFixed(fixed);
}