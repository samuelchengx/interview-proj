function Animal(type){
    this.type = type;
    // 如果构造函数返回的是引用类型,需把此对象返回
    return {
        name: 'Samuel',
        type: 'person',
        say: function () {
            console.log('I am Samuel');
        }
    };
}

Animal.prototype.say = function () {
    console.log('say');
}

// let animal = new Animal('xxx');
function mockNew() {
    // Constructor => animal剩余的argument就是其他参数
    let Constructor = [].shift.call(arguments);
    let obj = {}; // 返回的结果
    obj.__proto__ = Constructor.prototype;
    let r = Constructor.apply(obj, arguments);
    return r instanceof Object ? r : obj;
}
let animal = mockNew(Animal, 'xxx');
console.log('-----1-----', animal.type);
animal.say();

