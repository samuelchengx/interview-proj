
## 1、谈谈你对MVVM的理解;

- `page视图(view) <===>  路由、控制器(Controller) <===> 数据(Model)`
- `||`
- `||`
- `DOM <===> ViewModel(JS Data Binding) <===> Model(数据)`

## 2、请谈一下响应式数据原理

- `Object.defineProperty`
- `vue初始化时，data里面的所有属性添加新的属性，当页面取值的时候，就会收集依赖(添加到watcher当中)，属性发生变化就会更新操作。`
- `原理:`
` initData() => new Observe() => this.walk() => defineReactive => Object.defineProperty => get dep.depend => set notify`

## 3、vue是如何检测数组变化的

- `使用函数劫持,重写数组方法 push pop shift unshift splice sort reserve`
- `vue将data中的数组，进行了原型链重写，指向了自己定义的方法，
这样当调用数组api时，可以通知搜集依赖，如果数组里还包含引用类型，
可以再次监控`
- `__ob__ 设置属性不可枚举，防止数据属性重复被观察`

- 原理:
` initData => new Observe => protoArgument(value, arrMethods) => ObserveArray`

## 4、为何vue采用异步渲染?

- `理解: vue组件级更新 频繁操作数据，导致性能降低，采用异步渲染`
- `如果不采用异步渲染，每次更新数据都会对当前组件进行渲染，vue在数据更新后，再去更改视图`
- `原理:`
`dep.notify[通知watcher更新] => sub[i].update()[依次调用watcher的update] => queueWatcher[watcher去重] => nextTick(flushScheduleQueue);`

## 5、nextTick原理

- `理解:`
- `nextTick主要使用了宏任务和微任务,定义了一个异步方法，多次调用nextTick会将方法存入队列中，通过这个异步方法清空队列，所以nextTick方法就是异步方法`
- `使用nextTick保证视图渲染完成, callback方法添加到flushQueue队列的最后去`
- `原理: `
- `nextTick(cb) => callbacks.push(cb) => timerFunc调用就是flushCallback[采用promise/MutationObserve/setImmedate/setTimeout][] => 返回promise`

## 6、Vue中computed的特点

- `理解: computed[dirty实现了缓存] watch method之间的区别`
- `默认computed也是一个watcher是具备缓存的，只有依赖的属性发生改变，才会改变视图`

- `原理:`
- `initComputed => new Watcher => defineComputed => createComputedGetter => 用户取值是，false，直接返回上次的值，为true，计算时就会搜集依赖,把dirty置为false`

## 7、Watch中的deep:true是如何实现的

- `理解：当用户指定了watch中的deep:true时，如果监控的值是数组，会对每一项进行求值，此时会将当前的watcher存入对应属性的依赖中，这样数组中对象改变就会通知数据更新`
- `watcher有三种，渲染watcher、计算属性watcher、用户自定义属性`

## 8、Vue组件的生命周期

- `beforeCreate 在实例化之后，数据观测之前被调用`
- `created实例已经创建完后被调用，完成的配置: 数据观测、属性和方法的运算、watch/event事件回掉，这里没有$el`
- `beforeMount 在挂载之前调用，相关的render首次调用`
- `mounted el被创建的vm.$el替换，并挂载到实例上后调用此钩子`
- `beforeUpdate 数据更新时调用，虚拟DOM重新渲染和打补丁之前`
- `update 由于数据更新导致虚拟DOM渲染和打补丁之后调用`
- `beforeDestroy 实例销毁之前调用`
- `destroyed 实例销毁之后调用，所以的东西都会解除绑定，事件监听移除，子实例被销毁，清空计时器`

## 9、ajax请求放在哪个生命周期中

- `created`
- `mounted`
- `服务端不支持mounted`

## 10、何时需要使用beforeDestroy

`解除$on 清楚计时器 解除事件绑定`

## 11、Vue模版编译原理

- `将template编译成render函数`
`将模版转成ast树，静态节点标记优化树，将ast树生成代码，用with执行`

## 12、Vue中v-if和v-show的区别


