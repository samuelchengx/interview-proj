// generator = redux-saga(generator) 可以暂停

// generator生成器 生成迭代器的 iterator

// 类数组转化为数组 什么是类数组 有索引，有长度，能遍历
// [...arguments]; Array.from(arguments)

// 这样的数组不能被迭代
let likeArray = {
    '0': 1,
    '1': 2,
    '2': 3,
    '3': 4,
    length: 4,
};

// js基础数据类型 number string boolean null undefined  object symbol
// symbol有很多'元编程'的方法，可以更改js本身的功能。
let obj = {
    get [Symbol.toStringTag](){
        return 'abc'
    }
};
// console.log(obj.toString());
// likeArray[Symbol.iterator] = function () {
//     // 迭代器是一个对象 对象中有next方法 每次调用next都需返回一个对象(value/done);
//     let index = 0;
//     return {
//         next: () => { // 会自动调用这个方法
//             return {
//                 value: this[index],
//                 done: index++ === this.length
//             }
//         }
//     }
// }

// console.log([...likeArray]); // 报错 需要迭代器
// console.log(Array.from(likeArray)); // es6 ok 不需要迭代器
// 没有迭代器的数组不能被迭代

// 生成器 es6的api 

// function * read() { // generator函数，碰到yield就会暂停
//     yield 1;
//     yield 2;
//     return 1;
// }

// 生成器函数返回的是迭代器
// var it = read();
// console.log(it.next());
// console.log(it.next());
// console.log(it.next());

// likeArray[Symbol.iterator] = function * () {
//     var index = 0;
//     while (index != this.length) {
//         yield this[index++];
//     }
// }
//
// console.log([...likeArray]);

// 通过generator来优化promise [promise的缺点就是不停链式调用]
const fs = require('fs').promises;
function* read() {
    try {
        var content = yield fs.readFile('./name.txt', 'utf8');
        var age = yield fs.readFile(content, 'utf8');
        return Promise.resolve(age);
    } catch (e) {
        console.log(e);
    }
}

// var it = read();
// var res = it.next();
// var res1 = it.next(res.value);
// console.log(res1);

// var co = require('co');
function co(it) {
    let result = it();
    return new Promise((resolve, reject)=>{
        // 异步迭代
        function next(data) {
            var { value, done} = result.next(data);
            // 递归终止条件
            if(done){
                resolve(value);
            }else {
                Promise.resolve(value).then(res => {
                    next(res);
                }).catch(err => {
                    reject(err);
                });
            }
        }
        next();
    });
}
co(read).then(res => {
    console.log(res);
});