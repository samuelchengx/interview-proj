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
        setTimeout(() => {
            console.log(this.nickname);
        }, 1000);
    };
}
