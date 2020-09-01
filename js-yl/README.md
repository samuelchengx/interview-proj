## es6类和继承的原理，super继承的是什么？

## Object.defineProperty和Object.defineProperties()

## 何如开启GPU加速？ 开启加速的好处是什么？ 缺点是什么？

## JS的继承方式

## 设计模式 vue中使用了几种设计模式

## 数组去重 
` 
    function unique(arr){
       return Arrar.from(new Set(arr));
    } 
`
`
    function unique(arr) {
        for(var i = 0; i < arr.length; i++) {
            for(var j = i+1; j < arr.length; j++) {
                if(arr[i] == arr[j]) {
                    arr.splice(j, 1);
                    j--;
                }
            }
        }
        return arr;
    }
`

`
 function unique(arr) {
    
 }
`

## promise
  
## Lazyman

`

`

## eventEmitter

## http2

`http2新特性 https://www.jianshu.com/p/67c541a421f9`

## 浏览器多线程

## common.js es6

`commonjs规范 https://www.jianshu.com/p/dd08f4095a49`
`阮一峰 https://javascript.ruanyifeng.com/nodejs/module.html`

## bind函数的实现 var bindFn = fn.bind(context, params);

`
   Function.prototype.bind = function(context) {
        var that = this;
        var bindArgs = Array.prototype.slice.call(arguments, 1);
        return function () {
            var args = Array.prototype.slice.call(arguments, 1);
            return that.apply(context, args.concat(bindArgs));
        };
   }
`

## js基本数据类型 基础类型 

`
Undefined、Null、Boolean、Number和String
`

## js数据类型判断 typeof instanceof constructor

`
    typeof 操作数，具有性就是对象数据类型区分不开。
    instanceof  两个操作数，返回true/false，表示s是否为类的示例，得到具体类型。
    constructor 对象属性，不是运算符，constructor指向对象的构造函数。
`

## js数据类型隐式转化

`
    [1,2] + [3,4] = '1,23,4'  [] == [] => false  {} + [] = [Object object]
`

## js变量提升[预编译期间会将变量声明与函数声明提升至其对应作用域的最顶端] 

`
    var a; // 全局作用域
    console.log(a); // undefined
    a = "a";
    var foo = () => {//函数作用域
        var a; // 全局变量会被局部作用域中的同名变量覆盖
        console.log(a); // undefined
        a = "a1";
    }
    foo();
    console.log(foo1); // [Function: foo1]
    foo1(); // foo1
    console.log(foo2); // undefined
    foo2(); // TypeError: foo2 is not a function
    function foo1 () {
        console.log("foo1");
    };
    var foo2 = function () {
        console.log("foo2");
    };
    
    var a = 1;
    function foo() {
        a = 10;
        console.log(a);
        return;
        function a() {};
    }
    foo();
    console.log(a);
    
    var a = 1; // 定义一个全局变量 a
    function foo() {
        // 首先提升函数声明function a () {}到函数作用域顶端， 然后function a () {}等同于 var a =  function() {};最终形式如下
        var a = function () {}; // 定义局部变量 a 并赋值。
        a = 10; // 修改局部变量 a 的值，并不会影响全局变量 a
        console.log(a); // 打印局部变量 a 的值：10
        return;
    }
    foo();
    console.log(a); // 打印全局变量 a 的值：1
`

## js变量转化[]

`
  转换成String [123, true]
  转换成Number [Number parseInt parseFloat]
  转换成Boolean [Boolean() null和undefined => false Object => true var a = 'ddd' a= !!a => true ] 
`

## js变量和赋值引用

`
 var a = 10;
 var b = a;
 b = 20;
 console.log(b); // 20
 
 var obj1 = {x: 100};
 var obj2 = obj1;
 obj1.x = 200;
 console.log(obj2);
`

## 执行上下文理解

`
    function task(m, n) {
        var a = 1;
        var b = {
            name: 'samuel'
        };
        var c = [1,2,3];
    }
    task(10, 20);
    // task的执行上下文
    let taskExecutionContext = {
        this: window,
        scopeChain: [],
        // Variable Object 变量对象 里面存的是当前函数执行所需的变量
        VO: {
            // arguments: {},
            m: 10,
            n: 20,
            a: 1,
            b: 'XO1',
            c: 'XA1'
        }
    }
`

## 作用域理解 

## 作用链理解

## 闭包 优点 缺点

`

`
## 延迟的理解 setTimeout会立即执行吗？
`
   js执行栈 stack
   异步宏任务进入回调队列
   主线程执行完毕
   轮询回调队列，根据优先级调用
`
## Promise的理解

## 节流是如何处理的

## ES6 7 8

## js进阶

## 0.1 + 0.2 != 0.3

- (0.1*10+0.2*10)/10 ===0.3
- parseFloat((0.1+0.2).toFixed(10)) ===0.3 toFixed返回的是字符串，需要parseFloat转为浮点型

- 原因? 在某个精度点直接舍弃。当然，代价就是，0.1在计算机内部根本就不是精确的0.1，而是一个有舍入误差的0.1。当代码被编译或解释后，0.1已经被四舍五入成一个与之很接近的计算机内部数字，以至于计算还没开始，一个很小的舍入错误就已经产生了。这也就是 0.1 + 0.2 不等于0.3 的原因。

## vue生命周期

## vue双向绑定原理
## vue指令的用法

## React 生命周期
`
    挂载卸载过程
    constructor()
    componentWillMount()
    componentDidMount()
    componentWillUnmount ()
    更新过程
    componentWillReceiveProps (nextProps)
    shouldComponentUpdate(nextProps,nextState)
    componentWillUpdate (nextProps,nextState)
    componentDidUpdate(prevProps,prevState)
    render()
    React新增的生命周期
    getDerivedStateFromProps(nextProps, prevState)
    getSnapshotBeforeUpdate(prevProps, prevState)
`

## React 高阶函数
## React setState同步和异步的区分
## React 新特性
## React fiber的原理
## React 为什么在新版本去掉了一下生命周期
## React hook有哪些
## 新增的生命周期有哪些

## vuex实现原理
## redux实现原理和状态更新流程
## mbox实现原理和状态更新流程
## vuex vs redux vs mbox

## webpack
- webpack宗旨：一切皆模块；
- 热更新原理；
- webpack内部构建流程(读取文件，解析为ast，匹配对应的loader，执行对应的插件，输出结果)；
- 别的构建工具gulp grunt rollup...。

## js-bridge原理

## 前端工程化


