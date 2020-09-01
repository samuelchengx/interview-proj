/**
 *
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

/*************************************  实现apply/call/bind START ***********************************/
function fn1(){
    console.log(this, arguments);
}

Function.prototype.call = function (context) {
    context = context ? Object(context) : window;
    context.fn = this;
    var args = [];
    for(var i = 1; i < arguments.length; i++) {
        args.push(arguments[i]);
    }
    var r = eval(`context.fn(${args})`);
    delete context.fn;
    return r;
}
// fn1.call('hello1', 1, 2, 3);
Function.prototype.apply = function (context) {
    context = context ? Object(context) : window;
    context.fn = this;
    var r = eval(`context.fn(${arguments[1]})`);
    delete context.fn;
    return r;
}
// fn1.apply('hello2', [1, 2, 3]);
function fn2(name, age) {
    console.log(this.name, name, age);
}

let obj = {
    name: 'gina'
};

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
/***************************************** 实现apply/call/bind END *********************************/

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
obj2.a = 10;
obj2.c.d = 30;
console.log('obj1.a', obj1.a);
console.log('obj2.a', obj2.a);
console.log('obj1.c.d', obj1.c.d);
console.log('obj2.c.d', obj2.c.d);
// Object.assign方法
// 直接用=赋值

// 递归实现深拷贝
function deepClone(obj) {
    let objClone = Array.isArray(obj) ? [] : {};
    if(obj && typeof obj === 'object') {
        for (key in obj) {
            if(obj.hasOwnProperty(key)){
                if(typeof obj[key] === 'object'){
                    objClone[key] = deepClone(obj[key]);
                } else {
                    objClone[key] = obj[key];
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
console.log('--obj11.c.d---', obj11.c.d);
console.log('--obj22.c.d---', obj22.c.d);

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
    return Array.from(new Set(arr));
}

function unique2(arr) {

}

/***************************************** 实现数组去重   END      *********************************/








