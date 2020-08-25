// const  EventEmitter = require('events');
function EventEmitter () {
    this.event = {};
    this._maxListeners = 10;
}

// 给指定函数绑定事件处理函数
EventEmitter.prototype.on = EventEmitter.prototype.addEventListener = function (type, listener) {
    if(this.event[type]) {
        if(this.event[type].length > this._maxListeners) {
            console.error('listener more than 10...');
            return ;
        }
        this.event[type].push(listener);
    }else {
        this.event[type] = [listener];
    }
}

EventEmitter.prototype.emit = function (type, ...rest) {
    if(this.event[type]){
        this.event[type].forEach(listener => {
            listener.apply(this, rest);
        });
    }
}

EventEmitter.prototype.removeListener = function (type, listener) {
    if(this.event[type]){
        this.event[type] = this.event[type].filter(l => l != listener);
    }
}
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();

let fn = () => {
    console.log('an samuel event done!');
}

myEmitter.on('samuel', fn);
myEmitter.emit('samuel');
myEmitter.removeListener('samuel', fn);
myEmitter.emit('samuel');
