/* 数组 */

const arr = {
    // 取数组最后一个元素（引用）
    lastItem(arr = []) {
        return arr[arr.length - 1]
    },

    // 判断数组是否为空
    isEmpty(arr = []) {
        return !arr.length
    }
}



/* 对象 */

const obj = {
    // 通过规则过滤某个对象，规则回调函数返回true或者没有对应规则的属性组成新的对象
    filter(obj = {}, rules = {}) {
        let rst = {};
        for(let key in obj) {
            if(key in rules) {
                let callback = rules[key];
                if(callback(obj[key])) {
                    rst[key] = obj[key];
                }
            }
            else {
                rst[key] = obj[key];
            }
        }

        return rst
    },

    // 对象深拷贝
    clone(value) {
        if(value === null || typeof value !== 'object') {
            return value
        }

        let obj = {};

        // 遍历可枚举属性
        for(const key in value) {
            const item = value[key];
            if(typeof item === 'function') {
                // 如果是函数，则通过bind拷贝
                obj[key] = item.bind(obj);
            }
            else if(Array.isArray(item)) {
                obj[key] = item.map(i => {
                    return this.clone(i);
                })
            }
            else {
                obj[key] = this.clone(item);
            }
        }

        return obj
    }
}



/* 数学计算 */

const math = {
    /**
     * 计算两个数组的笛卡尔乘积
     * @param {Array} a
     * @param {Array} b
     * @return {Array} 组合值二维数组
     */
    cartesian(a = [], b = []) {
        let rst = []
        a.forEach(item1 => {
            b.forEach(item2 => {
                rst.push([].concat(item1, item2));
            })
        })

        return rst
    }
}

/**
 * 将一个函数防抖化
 * @param {Function} fn 原函数
 * @param {Number} wait 间隔时间
 * @return {Function} 防抖函数(取消平A，重置前摇。最后一次操作有意义)
 */
function debounce(fn, wait) {
    let timer = null;
    return function(...args) {
        if(timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            fn.apply(this, args);
        }, wait)
    }
}

/**
 * 将一个函数节流化
 * @param {Function} fn 原函数
 * @param {Number} wait 间隔时间
 * @return {Function} 节流函数(技能CD。每次操作都有意义)
 */
function throttle(fn, wait) {
    let timer = null;
    return function(...args) {
        if(timer) {
            return
        }
        timer = setTimeout(() => {
            fn.apply(this, args);
            timer = null;
        }, wait)
    }
}


export default {
    arr,
    obj,
    math,
    debounce,
    throttle
}
