// class Parent {
//     constructor(name, age) {
//         this.name = name;
//         this.age = age;
//     }
//     speakSomething() {
//         console.log('I can speak chinese!');
//     }
// }
function _classCallCheck(instance, constructor) {
    if(!(instance instanceof  constructor)) {
        throw new TypeError('Cannot call a class as a function');
    }
}
var _createClass= function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if('value' in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }
    return function(Constructor, protoProps, staticProps) {
        if(protoProps){
            defineProperties(Constructor.prototype, protoProps);
        }
        if(staticProps) {
            defineProperties(Constructor, protoProps);
        }
        return Constructor;
    };
}();

let Parent = function () {
    function Parent(name, age) {
        _classCallCheck(this, Parent);
        this.name = name;
        this.age = age;
    }
    _createClass(Parent, [{
        key: 'speakSomething',
        value: function () {
         console.log('I can speak chinese!')
        }
    }]);
    return Parent;
}();

let parent = new Parent('samuelcheng', 29);
console.log('-----parent-----', parent);
parent.speakSomething();


