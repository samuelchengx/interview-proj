let Vue;
function forEach(obj, callback){
    Object.keys(obj).forEach(item => {
        callback(item, obj[item]);
    });
}
class ModuleCollection {
    constructor(options) {
        this.register([], options);
    }
    register(path, rawModule){
        // path是个空数组 rawModule就是个对象
        let newModule = {
            _raw: rawModule, // 当前store对象
            _children: { }, // 表示包含的模块
            state: rawModule.state // 自己的state
        };
        // console.log('newModule', newModule);
        if(path.length == 0) {
            this.root = newModule;
        }else {
            let parent = path.slice(0, -1).reduce((root, current) => {
                return root._children[current];
            }, this.root);
            // this.root._children[path[path.length-1]] = newModule;
            parent._children[path[path.length-1]] = newModule;
        }
        if(rawModule.modules){
            forEach(rawModule.modules, (childName, module) => {
                this.register(path.concat(childName), module);
            });
        }
    }
}

function installModule(store, rootState, path, rootModule) {

}

class Store { // state getters mutations actions
    constructor(options) {
        let state = options.state; // {count:100}
        this.getters = {};
        this.mutations = {};
        this.actions = {};
        // 属性实现双向绑定 有get和set
        // vuex的核心借用了Vue的实例, Vue的实例数据变化会刷新视图
        this._vm = new Vue({
            data: {
                state
            }
        });
        // 整理模块之间的关系
        this.modules = new ModuleCollection(options);
        console.log('-----this.modules-----', this.modules);
        // 无论是子模块 还是孙子 所有的mutation都是根上的
        // this是Store的实例 [] path  this.modules.root 当前的根模块
        installModule(this, state, path, this.modules.root);
        // if(options.getters) {
        //     let getters = options.getters; // {newCount: fn}
        //     forEach(getters, (getterName, getterFns) => {
        //         Object.defineProperty(this.getters, getterName, {
        //             get: () => {
        //                 return getterFns(state)
        //             }
        //         });
        //     });
        // }
        // if(options.mutations) {
        //     let mutations = options.mutations;
        //     forEach(mutations, (mutationName, mutationFn) => {
        //         this.mutations[mutationName] = () => {
        //             mutationFn.call(this, state);
        //         }
        //     });
        // }
        // if(options.actions){
        //     let actions = options.actions;
        //     forEach(actions, (actionName, actionFn) => {
        //         this.actions[actionName] = () => {
        //             actionFn.call(this, this);
        //         }
        //     });
        // }
        let { commit, dispatch } = this;
        this.commit = (type) => {
            commit.call(this, type);
        }
        this.dispatch = (type) => {
            dispatch.call(this, type);
        }
    }
    get state(){ // Object.defineProperty get
        return this._vm.state;
    }
    commit(type){
        this.mutations[type]();
    }
    dispatch(type){
        this.actions[type]();
    }
}
let install = (_Vue) => {
    // console.log(_Vue, 'install');
    Vue = _Vue;
    Vue.mixin({
        beforeCreate() {
            // 需把根组件中 store实例 给每个组件新增$store
            // 判断是否是根组件
            // console.log('this.$options', this.$options);
            if(this.$options && this.$options.store) {
                this.$store = this.$options.store;
            } else { //子组件 深度优先 父 -> 子 -> 孙子
                // console.log('----', this.$options);
                this.$store = this.$parent && this.$parent.$store;
            }
            // console.log('beforeCreate');
        }
    });
}

export default {
    Store,
    install
}