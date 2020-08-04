/**
 * 执行上下文
 * 每当函数执行的时候，会产生一个执行上下文，执行上下文是一个对象
 * 执行上下文里面会创建一个变量对象，存放variable object
 * 基本数据类型保存在变量对象中，引用数据类型单独在堆内存开辟空间保存
 * 变量对象里保存堆内存的内存地址，就是一个16进制数
 */

// function task(m, n) {
//     var a = 1;
//     var b = {
//         name: 'samuel'
//     };
//     var c = [1,2,3];
// }
//
// task(10, 20);

// task的执行上下文
// let taskExecutionContext = {
//     this: window,
//     scopeChain: [],
//     // Variable Object 变量对象 里面存的是当前函数执行所需的变量
//     VO: {
//         // arguments: {},
//         m: 10,
//         n: 20,
//         a: 1,
//         b: 'XO1',
//         c: 'XA1'
//     }
// }


// var a = 1;
// var b = a;
// b = 2;
// console.log(a); // a的值为1;

var m = {a: 1, b: 2};
// 如果是引用数据类型 赋值的时候是堆内存引用地址
var n = m;
n.a = 10;
console.log('-----m-----', m);

