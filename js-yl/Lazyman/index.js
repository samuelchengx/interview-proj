function _LazyMan(name) {
    this.name = name;
    this.promises = [];
    var mfunc = () => {
        console.log(`hello this is ${this.name}`);
        var p = Promise.resolve();
        return p
    }
    this.promises.push(mfunc);
    var template = Promise.resolve();
    setTimeout(() => {
        this.promises.forEach(v =>{
            template = template.then(v);
        });
    }, 0)
}
_LazyMan.prototype = {
    sleep: function(time) {
        var pfunc = function() {
            var sp = new Promise(function(resolve, reject) {
                setTimeout(() => {
                    console.log(`暂停${time}s!`);
                    resolve();
                }, time * 1000);
            });
            return sp;
        }
        this.promises.push(pfunc);
        return this;
    },
    eat: function(food) {
        var epfunc = function() {
            console.log(`正在吃 ${food}`);
            var ep = Promise.resolve();
            return ep;
        }
        this.promises.push(epfunc);
        return this;
    }
}

function LazyMan(name) {
    return new _LazyMan(name);
}