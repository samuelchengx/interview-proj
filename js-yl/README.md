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

`done`

## eventEmitter

## http2

`http2新特性 https://www.jianshu.com/p/67c541a421f9`

## 浏览器多线程

## common.js es6

`commonjs规范 https://www.jianshu.com/p/dd08f4095a49`
`阮一峰 https://javascript.ruanyifeng.com/nodejs/module.html`

## bind函数的实现

