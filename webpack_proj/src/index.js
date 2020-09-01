let str = require('./a.js');
// import $ from 'jquery';
console.log($); // 在每个模块中注入$对象
console.log('---str---', str);
let fn = () => {
    console.log('---p---')
};
fn();

@log
class A {
    static test = 1;
    constructor(name) {
        this.name = name;
    }
    say() {
        console.log('----say----');
    }
}

function log(target) {
    console.log('---log--', target);
}
let aa = new A('samuel');
aa.say();
console.log(aa.name, aa.test);
require('./css/index.css');
require('./css/b.less');
