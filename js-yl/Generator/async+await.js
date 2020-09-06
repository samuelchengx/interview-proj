// async+await 就是co+generator的语法糖
const fs = require('fs').promises;
// function* read() {
//     try {
//         var content = yield fs.readFile('./name.txt', 'utf8');
//         var age = yield fs.readFile(content, 'utf8');
//         return age;
//     } catch (e) {
//         console.log(e);
//     }
// }

async function read() {
    try {
        var content = await fs.readFile('./name.txt', 'utf8');
        var age =  await fs.readFile( content, 'utf8');
        return age;
    } catch (e) {
        console.log(e);
    }
}

// function co(it) {
//     let result = it();
//     return new Promise((resolve, reject)=> {
//         // 异步迭代
//         function next(data) {
//             var { value, done} = result.next(data);
//             // 递归终止条件
//             if(done) {
//                 resolve(value);
//             }else {
//                 Promise.resolve(value).then(res => {
//                     next(res);
//                 }).catch(err => {
//                     reject(err);
//                 });
//             }
//         }
//         next();
//     });
// }
// co(read).then(res => {
//     console.log('async+await',res);
// });

// async 函数就是返回一个promise, 可以直接使用
read().then(res=> console.log('ccc',res));