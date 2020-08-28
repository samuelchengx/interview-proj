
// function fn1(){
//     console.log(this, arguments);
// }
function fn1(){
    console.log(1, this, arguments);
}
function fn2(){
    console.log(2, this, arguments);
}
// call的特点
// 1) 可以改变当前函数的this指向
// 2) 当前函数继续执行

// fn1.call('str', 1, 2, 3);
Function.prototype.call = function (context) {
    context = context ? Object(context) : window;
    context.fn = this;
    let args = [];
    for (let i = 1; i < arguments.length; i++) {
        args.push(`arguments[${i}]`);
    }
    console.log('---', `context.fn(${args})`);
    // 数组的toString的特性
    let r = eval(`context.fn(${args})`);
    delete context.fn;
    return r;
}

Function.prototype.apply = function (context, args) {
    context = context ? Object(context) : window;
    context.fn = this;
    if(!args){
       return context.fn();
    }
    // 数组的toString的特性
    let r = eval(`context.fn(${args})`);
    delete context.fn;
    return r;
}

// fn1.call('hello', 1, 2, 3);
// 如果多个call会让call方法执行 并且把call中的this变成fn2
// fn1.call.call(fn2); // => 2
// fn1.apply('hello', [1,2,3,4]);