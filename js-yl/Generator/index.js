
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
likeArray[Symbol.iterator] = function () {
    // 迭代器是一个对象 对象中有next方法 每次调用next都需返回一个对象(value/done);
    let index = 0;
    return {
        next: () => { // 会自动调用这个方法
            return {
                value: this[index],
                done: index++ === this.length
            }
        }
    }
}

console.log([...likeArray]); // 报错 需要迭代器
// console.log(Array.from(likeArray)); // es6 ok 不需要迭代器
// 没有迭代器的数组不能被迭代

