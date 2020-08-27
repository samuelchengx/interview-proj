import  { updateComponent } from './react-dom.js';
/**
 * @param type
 * @param config
 * @param children
 * @returns {{$$typeof: symbol, type: *, props: {children: *[]}}}
 */
function createElement(type, config = {}, ...children) {
    let props = {
        ...config, children
    };
    return {
        $$typeof: Symbol.for('react.element'),
        type,
        props
    }
}
/**
 * JS并没有类的概念
 * 编译后也是一个函数，为了区分函数是类组件，增加isReactComponent属性
 */
export class Component {
    // 是一个React组件
    static isReactComponent = true;
    constructor(props) {
        this.props = props;
        this.updateQueue = []; // 存放临时更新队列
        this.isBatchingUpdate = false; // 是否处理批量更新
    }
    setState(partialState){
        this.updateQueue.push(partialState);
        if(!this.isBatchingUpdate) {
            this.forceUpdate();
        }
    }
    forceUpdate() {
        // accumulate累计状态 || current当前状态 || this.state是初始值
        this.state = this.updateQueue.reduce((accumulate, current) => {
            let nextState = typeof current === 'function' ? current(accumulate) : current;
            accumulate = {...accumulate, ...nextState};
            return accumulate;
        }, this.state);
        // 清空更新队列
        this.updateQueue.length = 0;
        updateComponent(this);
    }
}
export default {
    createElement,
    Component
}
