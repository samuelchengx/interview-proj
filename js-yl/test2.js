// 如何捕获异常
// 1. 普通函数异常捕获 try catch
// 2. promise/await.catch 捕获
// 3. 异步函数.catch捕获

function func(a, b = 20) {
    console.log(a, b)
}

// func(1, false);
// func(1, null);

