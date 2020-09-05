/**
 * 实现一个LazyMan流程控制
 * @param name
 * @returns {_LazyMan}
 * @constructor
 */
function LazyMan(name) {
    return new _LazyMan(name)
}
function _LazyMan(name) {
    this.name = name;
    this.promises = [];
    var fn = () => {
        console.log(`name is ${name}`);
        var p = Promise.resolve();
        return p;
    }
    this.promises.push(fn);
    let template = Promise.resolve();
    setTimeout( () => {
        this.promises.forEach(fn => {
            template = template.then(fn);
        });
    }, 0);
}
_LazyMan.prototype.sleep = function (time) {
    var fn = () => {
        var sp = new Promise(function (resolve, reject) {
            console.log(`暂停${time}s!`);
            setTimeout(function () {
                resolve();
            }, time * 1000);
        });
        return sp;
    }
    this.promises.push(fn);
    return this;
}
_LazyMan.prototype.eat = function (name) {
    var fn = () => {
        var ep = Promise.resolve();
        console.log(`吃的东西是${name}！`);
        return ep;
    }
    this.promises.push(fn);
    return this;
}
_LazyMan.prototype.FirstSleep = function (time) {
    var fn = () => {
        var fp = new Promise( (resolve, reject) => {
            console.log(`开始暂停${time}s！`);
            setTimeout(() => {
                resolve();
            }, time * 1000);
        });
        return fp;
    }
    this.promises.unshift(fn);
    return this;
}
// LazyMan('samuel').FirstSleep(4).sleep(3).eat('noodles');
/*****************************************  实现一个LazyMan END   *************************************/

/*************************************  实现apply/call/bind/instanceof START ***********************************/
function fn1() {
    console.log(this, arguments);
}

// Function.prototype.call = function (context) {
//     context = context ? Object(context) : window;
//     context.fn = this;
//     var args = [];
//     for(var i = 1; i < arguments.length; i++) {
//         args.push(arguments[i]);
//     }
//     var r = eval(`context.fn(${args})`);
//     delete context.fn;
//     return r;
// }
// fn1.call('hello1', 1, 2, 3);
// Function.prototype.apply = function (context) {
//     context = context ? Object(context) : window;
//     context.fn = this;
//     var r = eval(`context.fn(${arguments[1]})`);
//     delete context.fn;
//     return r;
// }
// fn1.apply('hello2', [1, 2, 3]);
function fn2(name, age) {
    console.log(this.name, name, age);
}

let obj = {
    name: 'gina'
};

// to do
Function.prototype.bind = function (context) {
    let that = this;
    var bindArgs = Array.prototype.slice.call(arguments, 1);
    function BindFn () {
        var args = Array.prototype.slice.call(arguments, 1);
        return that.apply(context, bindArgs.concat(args));
    }
    BindFn.prototype = this.prototype;
    return BindFn;
}

// let bindFn = fn2.bind(obj, 'xxx');
// bindFn(30);

function instance_of(L, R) {
    var O = R.prototype;
    var L = L.__proto__;
    while (true) {
        if(L === null){
            break;
            return false;
        }
        if(L === O){
            break;
            return true;
        }
        L = L.__proto__;
    }
}

/***************************************** 实现apply/call/bind/instanceof END *********************************/

/***************************************** 实现深拷贝和浅拷贝 START   ********************************/
// 只赋值第一层的浅拷贝
function simpleCopy(obj) {
    let objTemp = Array.isArray(obj) ? [] : {};
    for (let i in obj) {
        objTemp[i] = obj[i];
    }
    return objTemp;
}
let obj1 = {
    a: 1,
    b: 2,
    c: {
        d: 3
    }
};
let obj2 = simpleCopy(obj1);
// obj2.a = 10;
// obj2.c.d = 30;
// console.log('obj1.a', obj1.a);
// console.log('obj2.a', obj2.a);
// console.log('obj1.c.d', obj1.c.d);
// console.log('obj2.c.d', obj2.c.d);
// Object.assign方法
// 直接用=赋值

// 递归实现深拷贝
function deepClone(obj) {
    let objClone = Array.isArray(obj) ? [] : {};
    if(obj && typeof obj === 'object') {
        for(let k in obj) {
            if(obj.hasOwnProperty(k)){
                if(obj[k] && typeof obj[k] === 'object'){
                    objClone[k] = deepClone(obj[k]);
                } else {
                    objClone[k] = obj[k];
                }
            }
        }
    }
    return objClone;
}

let obj11 = {
    a: 100,
    b: 200,
    c: {
        d: 300
    }
};

let obj22 = deepClone(obj11);
obj22.c.d = 3000;
// console.log('--obj11.c.d---', obj11.c.d);
// console.log('--obj22.c.d---', obj22.c.d);

// JSON.parse(JSON.stringify(obj)); 缺点: 属性值为function, 拷贝后为undefined
// lodash函数库实现深拷贝 let result = _.cloneDeep(test)
// Object.assign来实现深拷贝，但是要把它赋值给一个空对象
// 直接使用var newObj = Object.create(oldObj)，可以达到深拷贝的效果
// 使用扩展运算符实现深拷贝
// var car = {brand: "BMW", price: "380000", length: "5米"}
// var car1 = { ...car, price: "500000" }

/***************************************** 实现深拷贝和浅拷贝 END   ********************************/

/***************************************** 实现eventEmitter START ********************************/
let EventEmitter = function () {
    this.events = {};
    this._maxListeners = 10;
}
EventEmitter.prototype.on = EventEmitter.prototype.addEventListener = function (type, listener) {
    if(this.events[type]){
        this.event[type].push(listener);
    } else {
        this.event[type] = [listener];
    }
}
EventEmitter.prototype.emit = function (type, ...data) {
    if(this.events[type]){
        this.events[type].forEach(listener=> {
            listener.apply(this, data)
        });
    }
}
/***************************************** 实现eventEmitter END   ********************************/

/***************************************** 实现数组去重 START     **********************************/
// es6
function unique1(arr) {
    return [...new Set(arr)];
    // return Array.from(new Set(arr));
}
// console.log('---unique1---', unique1([1,1,1,2,3,3,3,4,5,6,6,7,7,7,7,7]));
// 利用es5 for 数组splice去重
function unique2(arr) {
    for(var i = 0; i < arr.length; i++) {
        for(var j = i+1; j< arr.length; j++){
            if(arr[i] === arr[j]){
                arr.splice(j,1);
                j--;
            }
        }
    }
    return arr;
}
// console.log('---unique2---', unique2([1,1,1,2,3,3,3,4,5,6,6,7,7,7,7,7]));

// 利用indexOf去重
function unique3(arr) {
    var temp = [];
    for(var i = 0; i < arr.length; i++) {
        if(temp.indexOf(arr[i]) === -1){
            temp.push(arr[i]);
        }
    }
    return temp;
}
// console.log('---unique3---', unique3([1,1,1,2,3,3,3,4,5,6,6,7,7,7,7,7]));
/***************************************** 实现数组去重 END *********************************/

/**************************** 防抖和节流 START ***********************/
// 函数防抖（debounce）、函数节流（throttle）
// debounce: 事件被触发，等待n秒后再执行回调，如果在这n秒内又被触发，则重新计数
// throttle: 规定在一个单位时间内，只能有一次触发事件的回调函数执行，如果在同一个单位时间内某某被触发多次，则只有一次能生效
// 参考链接: https://www.jianshu.com/p/64f6183a8163

// 使用场景: input用户输入 滚动计算
function debounce(fn, wait) {
    var timer = null;
    return function () {
        var context = this;
        var args = arguments;
        if(timer) {
            clearTimeout(timer);
            timer = null;
        }
        // 重新设定定时任务
        timer = setTimeout(() => {
            fn.apply(context, args);
        }, wait);
    }
}

function fn(){
    console.log('debounce function doing...');
}

// setInterval(debounce(fn, 500), 1000);
// setInterval(debounce(fn, 2000), 1000);

function throttle(fn, gapTime) {
    var _lastTime;
    var timer = null;
    return function () {
        var _nowTime = new Date().getTime();
        var context = this;
        var args = arguments;

        if(!_lastTime) {
            _lastTime = new Date().getTime();
            fn.apply(context, args);
        } else if( _nowTime - _lastTime < gapTime ) {
            if(timer){
                clearTimeout(timer);
                timer = null;
            }
            timer = setTimeout(()=> {
                _lastTime = new Date().getTime();
                fn.apply(context, args);
            }, gapTime);
        } else {
            _lastTime = new Date().getTime();
            fn.apply(context, args);
        }
    }
}

function throttleHandle(){
    console.log('throttle function doing...');
}

// setInterval(throttle(fn, 2000), 10)

/**************************** 防抖和节流 END ***********************/

/**************************** 继承 START ***********************/

// 参考链接地址：https://www.jianshu.com/p/85899e287694
// 1、原型链继承
// 缺点: 1、引用类型的属性被所有实例共享； 2、创建Child 的实例时， 不能向Person传参。
function Person() {
    this.name = 'samuel';
    this.colors = ['red', 'blue', 'green'];
}
Person.prototype.getName = function () {
    console.log(this.name);
}
function Child() {}
Child.prototype = new Person();
var child = new Child();
// child.getName();
var child1 = new Child();
var child2 = new Child();
// child1.colors.push('yellow');
// console.log(child1.colors);
// console.log(child2.colors);

// 2.借用构造函数（经典继承）
// 优点：1.避免了引用类型的属性被所有实例共享; 2.可以在Child中向Parent传参
// 缺点: 1.只是子类的实例，不是父类的实例; 2.方法都在构造函数中定义，每次创建实例都会创建一遍方法

// function Parent(name) {
//     this.name = name;
// }
// Parent.prototype.sayName = function () {
//     console.log(this.name);
// }
// function Sub(name) {
//     Parent.call(this, name);
// }
// var sub1 = new Sub('samuel');
// var sub2 = new Sub('gina');
// console.log(sub1.name);
// console.log(sub2.name);
// console.log(sub1 instanceof Sub, sub1 instanceof Parent);

// 3.组合继承
// 缺点：调用了两次父类构造函数
// function Parent(name) {
//     this.name = name;
//     this.hobby = ['sing', 'dance'];
// }
// Parent.prototype.sayName = function () {
//     console.log(this.name);
// }
// function Sub(name, age) {
//     Parent.call(this, name); // 第二次调用
//     this.age = age;
// }
//
// Sub.prototype = new Parent(); // 第一次调用
// var sub1 = new Sub('samuel', 30);
// var sub2 = new Sub('gina', 29);
// sub1.sayName();
// sub2.sayName();
// console.log(sub1.name);
// console.log(sub2.name);
// sub1.hobby.push('smoke');
// sub2.hobby.push('game');
// console.log(sub1.hobby);
// console.log(sub2.hobby);

// 4.原型式继承
// 缺点： 包含引用类型的属性值始终都会共享相应的值， 这点跟原型链继承一样
// function CreateObj(o) {
//     function F() {}
//     F.prototype = o;
//     console.log(o.__proto__ === Object.prototype);
//     console.log(F.prototype.constructor === Object);
//     return new F();
// }
// var p1 = {
//     name: 'samuelcheng',
//     friends: ['aa', 'bb']
// };
// var sub1 = CreateObj(p1);
// var sub2 = CreateObj(p1);
// sub1.name = 'gina';
// sub1.friends.push('cc');
// console.log(sub1.name);
// console.log(sub2.name);
// sub1.friends = ['xx'];
// console.log(sub1.friends);
// console.log(sub2.friends);

// 寄生继承
// 寄生组合式继承
/**************************** 继承 END ***********************/

/**************************** 设计模式 START ***********************/
// 单例模式
// 这种设计模式的思想是确保一个类只有唯一实例，一般用于全局缓存，
// 比如全局window，唯一登录浮窗等。
function single(){
    var instance;
    function getInstance(){
        if(instance === undefined){
            instance = new Construct();
        }
        return instance
    }
    function Construct(){
        // 生成单例的代码
    }
    return {
        getInstance: getInstance
    }
}

// 工厂模式
let UserFactory = function (role) {
    if(this instanceof UserFactory){
        var s = new this[role]();
        return s;
    } else {
        return new UserFactory(role);
    }
}
UserFactory.prototype = {
    SuperAdmin: function () {
        this.name = 'super admin';
        this.viewPage = ['a1', 'b1', 'c1'];
    },
    Admin: function () {
        this.name = 'admin';
        this.viewPage = ['a2', 'b2', 'c3'];
    },
    User: function () {
        this.name = 'user';
        this.viewPage = ['a3', 'b3', 'c3'];
    }
};
var SuperAdmin = UserFactory('SuperAdmin');
// console.log('SuperAdmin', SuperAdmin);

// 策略模式
function vip() {
    this.discount = .5;
}
vip.prototype.getPrice = function (price){
    return price * this.discount
}
function oldPrice() {
    this.discount = .3;
}
oldPrice.prototype.getPrice = function (price){
    return price * this.discount
}
function Price() {
    this.discount = 1;
}
Price.prototype.getPrice = function (price){
    return price * this.discount
}
function Waste(){
    this.name = '';
    this.strategy = null;
    this.price = 0;
}
Waste.prototype.set = function (name, strategy, price) {
    this.name = name;
    this.strategy = strategy;
    this.price = price;
}
Waste.prototype.getResult = function () {
    console.log(this.name + '的结账金额是: ' + this.strategy.getPrice(this.price));
}
var waste = new Waste();
var vip = new vip();
waste.set ('vip客户', vip, 200);
// vip客户的结账价为: 100
// waste.getResult();

// 观察者模式
class Observe{
    constructor(fn) {
        this.update = fn;
    }
}
class Sub{
    constructor() {
        this.observerList = [];
    }
    submit(observer) {
        this.observerList.push(observer);
    }
    unSubmit(observe) {
        this.observerList.filter(ob => ob != observe);
    }
    notify() {
        this.observerList.forEach(ob => ob.update());
    }
    onChange(){
        setTimeout(() => {
            this.notify();
        }, 1000)
    }
}
let ob1 = new Observe(() => { console.log('fn1') });
let ob2 = new Observe(() => { console.log('fn2') });
let sub = new Sub();
sub.submit(ob1);
sub.submit(ob2);
// sub.onChange();

// 发布订阅模式
class Event {
    constructor() {
        this.observe = {};
    }
    on(type, listener) {
        if(listener.__once__){
            this.observe[type].forEach(handler=>{
                if(handler===listener){
                    return;
                }
            });
        }
        if(this.observe[type]){
            this.observe[type].push(listener);
        } else {
            this.observe[type] = [listener];
        }
    }
    emit(type, ...args) {
        let onceHandler = [];
        if(this.observe[type]){
            this.observe.map(listener => {
                listener(...args);
                if(listener.__once__) {
                    onceHandler.push(listener);
                }
            });
        }
        onceHandler.forEach(handler => {
            this.off(type, handler);
        });
    }
    off(type, handler) {
        if(type && !handler){
            delete this.observe[type];
        }
        if(type && handler &&this.observe[type]){
            this.observe[type].filter(cb => {
                return cb !== handler;
            });
        }
    }
    once(type, listener) {
        listener.__once__ = true;
        this.on(type, listener);
    }
}


/******* 单例模式/工厂模式/策略模式/发布订阅[观察者]模式/ ******/

/**************************** 设计模式 END ***********************/

/**************************** 前端经典算法 START ***********************/
// 参考链接地址1: https://www.cnblogs.com/libin-1/p/5998870.html
// 参考链接地址2: https://zhuanlan.zhihu.com/p/101522204
// 判断是否是一个回文
function checkPalindrom(str) {
    return str.split('').reverse().join(',') === str;
}
// 字符串中出现次数最多的字符和次数
var longStr = 'afjghdfraaaasdenas';
function getMostCharAndCount(str) {
    if(str.length == 1) {
        return {
            char: str,
            count: 1
        };
    }
    var tempObj = {};
    for(var i = 0; i < str.length; i++) {
        if(!tempObj[str[i]]){
            tempObj[str[i]] = 1;
        } else {
            tempObj[str[i]] += 1;
        }
    }
    var mostChar = '';
    var mostCount = 0;
    for(var k in tempObj){
        if(tempObj[k]>mostCount){
            mostCount = tempObj[k];
            mostChar = k;
        }
    }
    return {
        char: mostChar,
        count: mostCount
    }
}
// console.log('-----getMostCharAndCount-----', getMostCharAndCount(longStr));
// 页面中出现最多次数的标签和次数
function getTagNameAndCount() {
    var nodeArr = document.getElementsByTagName('*');
    var targetName = 0;
    var count = 0;
    var map = new Map();
    for(var i = 0; i<nodeArr.length; i++){
        var ele = nodeArr[i]; // dom元素
        var tagName = ele.tagName; // 标签名
        if(map.get(tagName)){
            if(count < map.get(tagName) +1) {
                count = map.get(tagName) +1;
                targetName = tagName;
            }
            map.set(tagName, map.get(tagName)+1);
        } else {
            map.set(tagName, 1);
        }
    }
    return {targetName: targetName, count: count}
}

/**************************** 前端经典算法 END ***********************/

/**************************** 前端常见算法 START ***********************/
let arr = [8, 12, 6, 17, 1];
function swap(arr, i, j) {
    var temp;
    temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
    return arr;
}
// 冒泡排序 + 优化
Array.prototype.bubble = function () {
    var arr = this;
    var len = arr.length;
    var flag = true; // 设置标识优化排序
    for(var i = 0; i < len; i++) {
        for(var j = 0; j < len - i -1; j++){
            // 相邻两数，两两交换
            if(arr[j+1] < arr[j]){
                swap(arr, j, j+1);
                flag = false;
            }
        }
        if(flag) {
            return arr;
        }
    }
    return arr;
}
// console.log('-----冒泡排序-----',arr.bubble());
// 插入排序
Array.prototype.insert = function () {
    var arr = this;
    var preIndex, current;
    for(var i = 1; i < arr.length; i++) {
        preIndex = i - 1;
        current = arr[i];
        while (preIndex >= 0 && current < arr[preIndex]) {
            arr[preIndex+1] = arr[preIndex];
            preIndex--;
        }
        arr[preIndex+1] = current;
    }
    return arr;
}
// console.log('-----插入排序-----',arr.insert());
// 快速排序
Array.prototype.quick = function () {
   var arr = this;
   if(arr.length < 2){
       return arr;
   }
   var index = Math.floor(arr.length/2);
   var middle = arr.splice(index,1);
   var left = [];
   var right = [];
   arr.forEach(el => {
       if(el > middle[0]) {
           right.push(el);
       } else {
           left.push(el);
       }
   });
   return left.quick().concat(middle, right.quick());
}
// console.log('-----快速排序-----',arr.quick());

/**************************** 前端常见算法 END ***********************/

/**************************** class实现 START ***********************/
// class实现继承的实质是  ===>  Child.__proto__  Parent.prototype;
// 1、super当做函数使用 super();
// 2、super 作为对象使用
    // 2.1、super在普通方法中（即非静态方法）及此时的this关键字指向 ===> super访问父类
    // 2.2、super在静态方法中及此时的this关键字指向   ===> super访问子类，而不是子实例

function _classCallCheck(instance, constructor) {
    if(!(instance instanceof constructor)){
        return new TypeError('instance is not created by constructor');
    }
}
var _createClass = function (){
    function defineProperties(target, props) {
        for(var i = 0; i < props.length; i++){
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if('value' in descriptor){
                descriptor.writable = true;
            }
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }
    return function (Constructor, protoProps, staticProps) {
        if(protoProps){
            defineProperties(Constructor.prototype, protoProps);
        }
        if(staticProps){
            defineProperties(Constructor, staticProps);
        }
    }
}();
var ParentClass = (function(){
    function Parent(name, age) {
        _classCallCheck(this, Parent);
        this.name = name;
        this.age = age;
    }
    _createClass(Parent,[{
        key: 'say',
        value: function() {
            console.log('My name is ' + this.name + ', and I am ' + this.age + ' years old!');
        }
    }]);
    return Parent;
})();
// console.log('ParentClass', ParentClass.prototype);
let person111 = new ParentClass('samuelcheng', 29);
// person111.say();
/**************************** class实现 END ***********************/

/************************** forEach实现 START ********************/

function for_Each(arr, cb, flag) {
    if(!Array.isArray(arr)){
        return new TypeError('params is not array....');
    }
    var queues = [];
    if(flag) {
        for(var i = 0; i < arr.length; i++) {
            var fn = ((o) => {
                var p = Promise.resolve();
                cb(arr[o]);
                return p;
            })(i);
            queues.push(fn);
        }
        var template = Promise.resolve();
        for (var j = 0; j < queues.length; j++){
            template = template.then(queues[j]);
        }
        return ;
    }
    for(var k = 0; k < arr.length; k++) {
        cb(arr[k]);
    }
}

for_Each([1,2,3,4], function (...args) {
    console.log('args', ...args);
}, true)

/************************** forEach实现 END ********************/


/************************* JS数组排列组合 START *********************/
/**
 * 给定任意二维数组，输出所有的排列组合项。
 * 比如 [['A','B', 'C'], ['a','b', 'c'], [1, 2]]
 * 输出 ['Aa1','Aa2','Ab1','Ab2','Ba1','Ba2','Bb1','Bb2']
 */

/********************* JS数组排列组合 END *********************/

/***********************  getValueByPath(obj, 'a.b.c') START *********************/
function getValueByPath(obj, path){
    var props = path.split('.');
    for(var i = 0; i < props.length; i++){
        var p = props[i];
        if(obj && obj.hasOwnProperty(p)){
            obj = obj[p];
        } else {
            return undefined;
        }
    }
    return obj;
}
var objGetProperty = {
    a: {
        b: {
            c: 100
        }
    }
}
console.log(getValueByPath(objGetProperty, 'a.b.c'));
/***********************  getProperty(obj, 'a.b.c') END **********************/

/*********************** 找到值在二维数组中的位置 START ***************************/
// 在从左向右和从上往下皆为升序的二维数组中，查找一个数是否存在，存在的话输出它的位置。
// [1,2, 3, 15],
// [4,5,10,16],
// [7,8,11,17]

/*********************** 找到值在二维数组中的位置 END ***************************/

/*********************** deepEqual&&shallowEqual START **********************/


/*********************** deepEqual&&shallowEqual END **********************/


/********************** 实现数组扁平化 START ************************************/
var arrFlatData = [1, 2, 3, [4, 5], [6, [7, 8, [9], [10, 11, 12, [23]]]]];
function flatArr1(arr) {
    var res = [];
    for(var v of arr) {
        if(Array.isArray(v)){
            res.push(...flatArr1(v));
        } else {
            res.push(v)
        }
    }
    return res;
}
// console.log('-----flatArr1-----', flatArr1(arrFlatData));
function flatArr2(arr) {
    return [].concat(arr.map(v => Array.isArray(v) ? [].concat(flatArr2(v)): v));
}
// console.log('-----flatArr2-----', flatArr2(arrFlatData));
/********************** 实现数组扁平化 END ************************************/

/********************** 合并两个有序数组 START *******************************/


/********************** 合并两个有序数组 END *******************************/







