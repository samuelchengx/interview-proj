/**
 * 执行上下文栈
 * 栈是一个数据,里面放着很多执行上下文
 * 每次函数执行都会产生一个执行上下文
 * 全局上下文的VO GO
 * 全局对象上的属性在任何地方可以被访问到
 * 浏览器端GO就是window
 */

var globalExeutionContext = {
    VO: {
        setTimeout,
        Math,
        String
    }
};
function one() {
    var a = 10;

}
one();

// VOd对象无法获取到，保护执行的变量被修改

