// 1.实现一个isArray的方法 N种方式
function isArray1(value) {
    return Array.isArray(value);
}
function isArray2(value) {
    return Object.prototype.toString.call(value) === '[object array]';
}
function isArray3(value){
    return value instanceof Array
}
/**
 * 1.提问Object.prototype.toString.call为什么不是Array.prototype.toString.call
 */
// 2.实现一个方法add(1)(2)(3);
/**
 *
 * a、闭包
 * b、函数柯里化
 */
// a
function add1 (m) {
    var temp = function (n) {
        return add1(m + n);
    }
    temp.toString = function () {
        return m;
    }
    return temp;
}
// console.log('----', add1(1)(2)(3));
function add2(...arg) {
  let a = [...arg];
  let _add = function (...innerArg) {
      if (innerArg.length === 0) {
        return a.reduce(function (a, b) { return a + b })
     } else {
        [].push.apply(a, innerArg)
        return _add;
     }
  }
  return _add;
}
console.log(add2(1)(2)(3)());