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