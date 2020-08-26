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
 * JS并没有类的改变
 * 编译后也是一个函数，为了区分函数是类组件，增加isReactComponent属性
 */
export class Component {
    // 是一个React组件
    static isReactComponent = true;
    constructor(props) {
        this.props = props;
    }
    setState(partialState) {

    }
}
export default {
    createElement,
    Component
}
