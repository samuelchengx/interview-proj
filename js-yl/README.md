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

## webpack构建流程 [参考链接: https://segmentfault.com/a/1190000006964335];
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

`
    1、GIF图
        我们可以将上面制作的帧动画导出成GIF图，GIF图会连续播放，无法暂停，它往往用来实现小细节动画，成本较低、使用方便。但其缺点也是很明显的：
        画质上，gif 支持颜色少(最大256色)、Alpha 透明度支持差，图像锯齿毛边比较严重；
        交互上，不能直接控制播放、暂停、播放次数，灵活性差；
        性能上，gif 会引起页面周期性的绘画，性能较差。
    2、CSS3帧动画
        CSS3帧动画是我们今天需要重点介绍的方案，最核心的是利用CSS3中Animation动画，
        确切的说是使用animation-timing-function 的阶梯函数 steps(number_of_steps, direction)
        来实现逐帧动画的连续播放。帧动画的实现原理是不断切换视觉内图片内容，
        利用视觉滞留生理现象来实现连续播放的动画效果，下面我们来介绍制作CSS3帧动画的几种方案。
        （1）连续切换动画图片地址src（不推荐）
        我们将图片放到元素的背景中（background-image），通过更改 background-image 的值实现帧的切换。
        但是这种方式会有以下几个缺点，所以该方案不推荐。
        多张图片会带来多个 HTTP 请求
        每张图片首次加载会造成图片切换时的闪烁
        不利于文件的管理
    （2）连续切换雪碧图位置（推荐）
        我们将所有的帧动画图片合并成一张雪碧图，通过改变 background-position 的值来实现动画帧切换。分两步进行：
        步骤一： 将动画帧合并为雪碧图，雪碧图的要求可以看上面素材准备，比如动画雪碧图，共20帧。
        步骤二： 使用steps阶梯函数切换雪碧图位置
        .sprite {
            width: 300px;
            height: 300px;
            background-repeat: no-repeat;
            background-image: url(frame.png);
            animation: frame 333ms steps(1,end) both infinite;
        }
        @keyframes frame {
            0% {background-position: 0 0;}
            5% {background-position: -300px 0;}
            10% {background-position: -600px 0;}
            15% {background-position: -900px 0;}
            20% {background-position: -1200px 0;}
            25% {background-position: -1500px 0;}
            30% {background-position: -1800px 0;}
            35% {background-position: -2100px 0;}
            40% {background-position: -2400px 0;}
            45% {background-position: -2700px 0;}
            50% {background-position: -3000px 0;}
            55% {background-position: -3300px 0;}
            60% {background-position: -3600px 0;}
            65% {background-position: -3900px 0;}
            70% {background-position: -4200px 0;}
            75% {background-position: -4500px 0;}
            80% {background-position: -4800px 0;}
            85% {background-position: -5100px 0;}
            90% {background-position: -5400px 0;}
            95% {background-position: -5700px 0;}
            100% {background-position: -6000px 0;}
        }
        这里我们先来了解下animation-timing-function属性。
        CSS animation-timing-function属性定义CSS动画在每一动画周期中执行的节奏。
        对于关键帧动画来说，timing function作用于一个关键帧周期而非整个动画周期，即从关键帧开始开始，
        到关键帧结束结束。
        timing-function 作用于每两个关键帧之间，而不是整个动画。
        接着我们来了解下steps() 函数：
        steps 函数指定了一个阶跃函数，它接受两个参数。
        第一个参数接受一个整数值，表示两个关键帧之间分几步完成。
        第二个参数有两个值< start > or < end >。默认值为< end > 。
        step-start 等同于 step(1, start)。step-end 等同于 step(1, end)。
        综上我们可以知道，因为我们详细定义了一个关键帧周期，从开始到结束，每两个关键帧之间分 1 步展示完，
        也就是说0% ~ 5%之间变化一次，5% ~ 10%变化一次，所以我们这样写才能达到想要的效果。
        （3）连续移动雪碧图位置（移动端推荐）
            跟第二种基本一致，只是切换雪碧图的位置过程换成了transform:translate3d()来实现，
            不过要加多一层overflow: hidden;的容器包裹，这里我们以只定义初始和结束帧为例，
            使用transform可以开启GPU加速，提高机器渲染效果，还能有效解决移动端帧动画抖动的问题。
        <div class="sprite-wp">
            <div class="sprite"></div>
        </div>
        .sprite-wp {
            width: 300px;
            height: 300px;
            overflow: hidden;
        }
        .sprite {
            width: 6000px;
            height: 300px;
            will-change: transform;
            background: url(frame.png) no-repeat center;
            animation: frame 333ms steps(20) both infinite;
        }
        @keyframes frame {
            0% {transform: translate3d(0,0,0);}
            100% {transform: translate3d(-6000px,0,0);}
        }
    3、JS帧动画
    （1）通过JS来控制img的src属性切换（不推荐）
    和上面CSS3帧动画里面切换元素background-image属性一样，会存在多个请求等问题，所以该方案我们不推荐，但是这是一种解决思路。
    （2）通过JS来控制Canvas图像绘制
    通过Canvas制作帧动画的原理是用drawImage方法将图片绘制到Canvas上，不断擦除和重绘就能得到我们想要的效果。
    （3）通过JS来控制CSS属性值变化
    这种方式和前面CSS3帧动画一样，有三种方式，
    一种是通过JS切换元素背景图片地址background-image，
    一种是通过JS切换元素背景图片定位background-position，
    最后一种是通过JS移动元素transform:translate3d()，
    第一种不做介绍，因为同样会存在多个请求等问题，不推荐使用，这里实现后面两种。
       
    除了css transform:translate3d() 方案，其他方案的FPS都能达到60FPS的流畅程度，但该方案的FPS也不是很低。
    CPU占用率最低的方案是 css transform:translate3d() 方案。
    GPU占用最低的方案是 JS Canvas 绘制方案。
    CSS 方案没有脚本开销
    Rendering 最少的是 css transform:translate3d() 方案。
    Painting 最少的是 css transform:translate3d() 方案。
    各方案内存占用区别不大。
    结论：我们看到，在7个指标中，css transform:translate3d() 方案将其中的4个指标做到了最低，从这点看，我们完全有理由选择这种方案来实现CSS帧动画。
      
    大量的粒子效果用Canvas绘制方案肯定要比DOM+CSS实现要好的，
    大量的CSS属性值变换，使用 transform 实现性能是要更好的。
    适配：移动端适配最好不用rem，因为rem的计算会造成小数四舍五入，造成一定的抖动效果，建议直接用px作为单位，同时辅助以scale（zoom）媒体查询进行适配。如果使用rem适配，试试使用transform的方案，抖动问题可以得到优化解决。
    
    tips：使用 will-change 可以在元素属性真正发生变化之前提前做好对应准备    
`

## CSS wiki
`
    BFC IFC
    Block Formatting Context 块级格式化上下文。
    BFC布局规则
    内部的Box会在垂直方向，一个接一个的放置
    同一个BFC内，垂直方向的盒子上下margin会重叠
    每个元素的margin box的左边，与包含块border box的左边连接（对于从右往左的布局，则相反）即使存在浮动也是如此
    子BFC的区域不会与float box重叠
    BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素，反之也如此。
    计算BFC的高度时，浮动元素也参与计算（故也可以达到所谓清除浮动的效果，只要将包裹层转变为BFC）
    
    inline Formatting Context 内敛格式化上下文。
    如何将块级元素转换成BFC
    具有除了float:none的其他浮动属性
    定位为absolute或者fixed
    dispaly为block、inline-block、table-cell、table-caption、flex、inline-flex
    overflow不为visible（除非该值已经传播到视口，入html body会将overflow的值传播到视口，故此情况下，该属性不能建立BFC）
    
    IFC
    Inline Formatting Context 内敛格式化上下文。
    ifc是什么
    IFC的line box（线框高度由其包含行内元素中最高的实际高度计算而来（不受到竖直方向的padding/margin影响）
    img font-size: 0;
    适配
    居中
    css动画 js[setTimeout requestFrameAnimation] css[gpu] svg canvas serverWorker  性能最优: css3
    gpu几种方式      
    动画库 animate.css
    视觉差效果是如何实现的?
    给背景图片添加background-attachment:fixed属性,
    将背景固定在窗口,在使用background-position:top center或0% 0%;
    后续可以通过js修改background-position的top值,
    实现背景图片跟随页面上下移动的效果
`
## 跨域解决

`
    域名相同、端口号相同、协议相同 
    接口请求/JSONP
    接口请求/CORS跨域  
    接口请求/使用代理跨域
    跨窗口操作DOM/设置document.domain
`
## HTTP/HTTPS/HTTP1/HTTP2
`

`
## es6 

## promise generator iterator async/await

## ssr 骨架屏

`
SSR的优势
1. 更利于SEO。
2. 更利于首屏渲染

SSR的局限
服务端压力较大
开发条件受限
学习成本相对较高

`

`
    生成骨架屏的方式主要有：
    1、手写HTML、CSS的方式为目标页定制骨架屏 做法可以参考，
    主要思路就是使用 vue-server-renderer 这个本来用于服务端渲染的插件，
    用来把我们写的 .vue文件处理为 HTML，插入到页面模板的挂载点中，完成骨架屏的注入。
    这种方式不甚文明，如果页面样式改变了，还得改一遍骨架屏，增加了维护成本。
    
    2、使用图片作为骨架屏；简单暴力，让UI同学花点功夫吧哈哈；小米商城的移动端
    页面采用的就是这个方法，它是使用了一个Base64的图片来作为骨架屏。
    
    3、自动生成并自动插入静态骨架屏 这种方法跟第一种方法类似，不过是自动生成骨架屏，
    可以关注下饿了么开源的插件 page-skeleton-webpack-plugin ，
    它根据项目中不同的路由页面生成相应的骨架屏页面，并将骨架屏页面通过 webpack 打包到对应的静态路由页面中，
    不过要注意的是这个插件目前只支持history方式的路由，不支持hash方式，且目前只支持首页的骨架屏，
    并没有组件级的局部骨架屏实现，作者说以后会有计划实现。
    
    vue-server-renderer
    vue-skeleton-webpack-plugin
    page-skeleton-webpack-plugin
`

## 移动端h5与app通信 jsToNative NativeToJS
