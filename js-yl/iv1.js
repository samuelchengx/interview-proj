// 1.请写出代码输出内容
// console.log(1);
//
// setTimeout(()=>{
//     console.log(2);
//     Promise.resolve().then(data=>{
//         console.log(3);
//     });
// });
//
// new Promise((resolve) => {
//     resolve();
//     console.log(4);
// }).then(() => {
//     console.log(5);
//     setTimeout(()=>{
//         console.log(7);
//     });
// }).then(() => {
//     console.log(6);
// });
//
// console.log(8);

// 2.请写出代码输出内容
// console.log(fish1, fish2, fish3);
// var fish1 = function () {
//     console.log('this is fish1...');
// };
// function fish2() {
//     console.log('this is fish2...');
// }
// var fish3 = 'this is fish3';
// var fish1, fish2, fish3;
// console.log(fish1, fish2, fish3);

// 3.请写出代码输出内容
var nickname = 'Lilei';
function Person(name) {
    this.nickname = name;
    this.sayHi = function () {
        console.log(this.nickname);
        setTimeout(function () {
            console.log(this.nickname);
        }, 1000);
    };
}
var Male = {
    nickname: 'xiaofang',
    sayHi: () => {
        console.log(this.nickname);
    }
};
// var person = new (Person.bind(Male, 'xiaohong'));
// person.sayHi();

// 4.请写出代码输出内容
let object = {
    a: 0
};
function fun(obj) {
    obj.a = 1;
    obj = {
        a: 2
    };
    obj.b = 2;
}
fun(object);
console.log(object);

/**************************  编程题 START  **********************/
// 1、实现一个流程控制函数,使得若干任务按照顺序执行
// 且每个任务的返回结果都将传给下一个任务。如果中途出错
// 后面的任务则不会被执行，并返回当前执行结果。

/**
 *
 * @param tasks
 * @param callback
 * @returns {undefined}
 */

function waterfall(tasks, callback) {
    return undefined;
}

// 示例
waterfall([
    function (callback) {
        callback(null, 'one', 'two');
    },
    function (arg1, arg2, callback) {
        callback(null, 'three');
    },
    function (arg1, callback) {
        callback(null, 'done');
    }
], function (err, result) {

});


// 2.找出二叉树中某两个节点的d第一个共同祖先，不得将其他的节点存储在
// 另外的数据结构中。

// 例如,给定如下二叉树 root = [3,5,1,6,2,0,8,null,null,7,4]
/**
 *          3
 *       5         1
 *    6     2    0   8
 *        7  4
 */

// 示例 1:
// 输入: root = [3, 5, 1, 6, 2, 0, 8, null, null, 7, 4], p = 5, q =1;
// 输出 3
// 解释: 节点5和节点1的最近公共祖先是节点3

// 示例 2:
// 输入: root = [3, 5, 1, 6, 2, 0, 8, null, null, 7, 4],  p = 5, q = 4;
// 输出 3
// 解释: 节点5和节点1的最近公共祖先是节点3

// 说明:
// 所有节点的值都是唯一的
// p、q为不同节点且均存在于给定的二叉树中。

// 二叉树数据结构:
function TreeNode(val){
    this.val = val;
    this.left = this.right = null;
}
/**************************  编程题 END   **********************/
