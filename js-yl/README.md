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

## promise
  
## Lazyman [见test.js源码]

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
## Promise的理解 []

## 节流是如何处理的 [见test.js源码]

## ES6 7 8

## js进阶

## 0.1 + 0.2 != 0.3

- (0.1*10+0.2*10)/10 ===0.3
- parseFloat((0.1+0.2).toFixed(10)) ===0.3 toFixed返回的是字符串，需要parseFloat转为浮点型

- 原因 ? 在某个精度点直接舍弃。当然，代价就是，0.1在计算机内部根本就不是精确的0.1，而是一个有舍入误差的0.1。当代码被编译或解释后，0.1已经被四舍五入成一个与之很接近的计算机内部数字，以至于计算还没开始，一个很小的舍入错误就已经产生了。这也就是 0.1 + 0.2 不等于0.3 的原因。

## vue生命周期 [参考链接: https://segmentfault.com/a/1190000011381906]

## vue双向绑定原理 [参考链接地址: https://www.jianshu.com/p/78b31df97b70]
`
Object.defineProperty 是 ES5 中一个无法 shim 的特性，这也就是 Vue 不支持 IE8 以及更低版本浏览器的原因。
`

## vue指令的用法 [参考链接: https://segmentfault.com/a/1190000020865320]
`

`

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

## React 高阶函数 [参考链接: https://www.jianshu.com/p/68c6ab7c35dc]
`
    // 首字母大写!! 无状态组件
    const HOC = (InnerComponent) => class extends React.Component{
        render(){
            return(
                <InnerComponent/>
            )
        }
    }
    const Button = HOC((props) => <button>{props.children}</button>) //无状态组件
    //传统组件
    class Label extends React.Component{
        render(){
            return(
                <label>{this.props.children}</label>
            )
        }
    }
    const LabelHoc = HOC(Label);
    //根组件
    class App extends React.Component{
        render(){
            return(
                <div>
                    <Button>button</Button>
                    <br/>
                    <LabelHoc>label</LabelHoc>
                </div>
            )
        }
    }
    module.exports = App
`

## React setState同步和异步的区分
## React 新特性
## React fiber的原理
## React 为什么在新版本去掉了一下生命周期
## React hook有哪些
## 新增的生命周期有哪些

## vuex实现原理
## redux实现原理和状态更新流程
## mbox实现原理和状态更新流程 [参考链接: https://www.jianshu.com/p/bea658a8b721]
## vuex vs redux vs mbox

## webpack构建流程
- webpack宗旨：一切皆模块；
- 热更新原理；
- webpack内部构建流程(读取文件，解析为ast，匹配对应的loader，执行对应的插件，输出结果)；
- 别的构建工具gulp grunt rollup...。

## webpack性能优化、提升构建速度

###  慢在哪里??

- 全量构建过慢，即使是很小改动，要等长时间看到更新与编译后（HMR热更新有明显改进）
- 项目复杂度增加，模块体积急剧增大，构建的模块以M为单位计算；
- 多个项目之间共用基础资源存在重复打包，基础库代码复用率不高；
- node的单进程实现在耗cpu计算型loader中表现不佳；
### 何如解决??
- 合理配置CommonsChunkPlugin lib抽到vendors、提取公共代码
- 通过externals配置来提取常用库
- 利用DllPlugin和DllReferencePlugin预编译资源模块

### webpack3和webpack4的区别

- mode webpack4中通过内置的mode使用相应模式的内置优化.dev侧重于构建，prod侧重于体积大小；
- CommonsChunkPlugin webpack4已移除  使用optimization.splitChunks
- mini-css-extract-plugin(CSS文件提取) webpack4删除原插件，新增extract-text-webpack-plugin配置；
- 新版 babel 使用新的命名空间 @babel

## webpack打包hash是怎么生成的

- hash表示的是静态文件的内容hash值

## 移动端适配方案 [参考链接地址: https://zhuanlan.zhihu.com/p/80692165]

- viewport适配
`
<meta name="viewport" content="width=750,initial-scale=0.5">
initial-scale = 屏幕的宽度 / 设计稿的宽度
<script>
    const WIDTH = 750;
    const mobileAdapter = () => {
      let scale = screen.width / WIDTH;
      let content = `width=${WIDTH}, initial-scale=${scale}, maximum-scale=${scale}, minimum-scale=${scale}`
      let meta = document.querySelector('meta[name=viewport]');
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', 'viewport');
        document.head.appendChild(meta);
      }
      meta.setAttribute('content',content);
    };
    mobileAdapter();
    window.onorientationchange = mobileAdapter //屏幕翻转时再次执行
  </script>
  缺点就是边线问题，不同尺寸下，边线的粗细是不一样的（等比缩放后），全部元素都是等比缩放，实际显示效果可能不太好
`

- vw适配（部分等比缩放）
`
    开发者拿到设计稿（假设设计稿尺寸为750px，设计稿的元素标注是基于此宽度标注）
    开始开发，对设计稿的标注进行转换，把px换成vw。比如页面元素字体标注的大小是32px，换成vw为 (100/750)*32 vw
    对于需要等比缩放的元素，CSS使用转换后的单位
    对于不需要缩放的元素，比如边框阴影，使用固定单位px
`

- rem适配
`
    开发者拿到设计稿（假设设计稿尺寸为750px，设计稿的元素标是基于此宽度标注）
    开始开发，对设计稿的标注进行转换
    对于需要等比缩放的元素，CSS使用转换后的单位
    对于不需要缩放的元素，比如边框阴影，使用固定单位px
`
- 弹性盒适配（合理布局）

## Hybird通信方案

- JS/Android/iOS三个台各自的特性进行封装，做到在JS侧差异内化解决。

- Native调用JS
`
    mWebView = new WebView(this); //即当前webview对象			
    mWebView.loadUrl("javascript: 方法名('参数,需要转为字符串')"); 
    
    //异步执行JS代码,并获取返回值	
    mWebView.evaluateJavascript("javascript: 方法名('参数,需要转为字符串')", new ValueCallback() {
            @Override
            public void onReceiveValue(String value) {
        		//这里的value即为对应JS方法的返回值
            }
    });
`

- JS调用Native
## 前端工程化 [参考链接: https://www.jianshu.com/p/88ed70476adb]

`
    使用软件工程的技术和方法来进行前端的开发流程、技术、工具、经验等规范化、标准化，
    其主要目的为了提高效率和降低成本，即提高开发过程中的开发效率，减少不必要的重复工作时间，
    而前端工程本质上是软件工程的一种，因此我们应该从软件工程的角度来研究前端工程。
`
- 模块化 css的模块化/js模块/图片
- 组件化 
- 规范化 命名
- 自动化 

## 动画动画动画

## CSS wiki
`
    img font-size: 0;
    适配
    居中
    css动画 js[setTimeout requestFrameAnimation] css[gpu] svg canvas serverWorker  性能最优: css3
    gpu几种方式      
    动画库 animate.css
`
## 跨域解决
`
   
`
## HTTP/HTTPS/HTTP1/HTTP2 
`

`
## es6 

## promise generator iterator async/await

## ssr 骨架屏

## 移动端h5与app通信 jsToNative NativeToJS