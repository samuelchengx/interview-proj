let obj = {
    name: 'samuel'
};
function fn(name, age) {
    console.log(this.name, name, age);
}
Function.prototype.bind = function (context) {
    let that = this;
    let bindArgs = Array.prototype.slice.call(arguments, 1);
    function FnBind() { // this FnBind实例
        let args = Array.prototype.slice.call(arguments)
        return that.apply(this instanceof newInstance ? this : context, bindArgs.concat(args));
    }
    FnBind.prototype = this.prototype;
    return FnBind;
}
fn.prototype.flag = 'smile';
let bindFn = fn.bind(obj, 'xxx');
let newInstance = new bindFn(19);

// console.log(newInstance.flag)

// 1、bind改变this
// 2、返回一个新的函数(高阶函数)
// 3、如果绑定的函数new后，返回的this指向当前实例

