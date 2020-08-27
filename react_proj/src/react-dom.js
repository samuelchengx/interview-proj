export function updateComponent(currentInstance) {
    let element = currentInstance.render();
    let {props, type} = element;
    let newDom = createDOM(type, props, currentInstance);
    // 把老的节点替换成新的dom节点
    currentInstance.dom.parentNode.replaceChild(newDom, currentInstance.dom);
    currentInstance.dom = newDom;
}

function render(element, container, componentInstance) {
    // 文本节点render
    if(typeof element == 'string' || typeof element == 'number' ) {
        return container.appendChild(document.createTextNode(element));
    }
    let props, type;
    type = element.type;
    props = element.props;
    let isReactComponent = type.isReactComponent;
    // let componentInstance;
    if(isReactComponent) { // 如何判断这是一个类组件
        componentInstance = new type(props);
        element = componentInstance.render();
        type = element.type;
        props = element.props;
    } else if(typeof type === 'function') { // 函数组件
        element = type(props); // 函数组件执行后返回一个React元素
        // 重新得到React元素类型和属性
        type = element.type;
        props = element.props;
    }
    let dom = createDOM(type, props, componentInstance);
    if(isReactComponent){
        // 若是类组件，就给类组件实例上挂载dom属性指向真实的dom，这样组件和dom就关联起来了
        componentInstance.dom = dom;
    }
    container.appendChild(dom);
}

/**
 * 合成事件
 * 在事件处理函数前要把批量更新模式设为true，暂时缓存在updateQueue中，事件执行完后进行实际更新
 * 事件委托给document
 * @param type
 * @param props
 * @returns {*}
 */
function addEvent(dom, eventType, listener, componentInstance) {
    eventType = eventType.toLowerCase();
    let eventStore = dom.eventStore || (dom.eventStore = {});
    // eventStore[onclick] = {listener, componentInstance};
    eventStore[eventType] = {listener, componentInstance};
    document.addEventListener(eventType.slice(2), dispatchEvent, false);
}

/**
 * dom原生事件
 * @param event
 */
function dispatchEvent(event) {
    let { type, target } = event; // 取出事件类型click 事件源buttom
    while(target) {
        let { eventStore } = target;
        if(eventStore){
            let { listener, componentInstance } = eventStore['on' + type];
            if(listener) {
                if(componentInstance) componentInstance.isBatchingUpdate = true;
                listener.call(null, event);
                if(componentInstance){
                    componentInstance.isBatchingUpdate = false;
                    componentInstance.forceUpdate();
                }
            }
        }
        target = target.parentNode;
    }
}

function createDOM(type, props, componentInstance) {
    let dom = document.createElement(type);
    for(let propName in props) {
        if(propName === 'children') {
            let children = props.children;
            children.forEach(child=> render (child, dom, componentInstance));
            // className htmlFor Style onClick
        } else if(propName === 'className') {
            dom.setAttribute('class',  props[propName]);
        }else if(propName === 'style'){
            let styleObj = props[propName];
            for(let key in styleObj){
                dom.style[key] = styleObj[key];
            }
        } else if(propName.startsWith('on')){
            // dom[propName.toLowerCase()] = props[propName];
            // dom绑定真实的元素 propName=onClick listener=handlerClick  componentInstance=clock
            addEvent(dom, propName, props[propName], componentInstance);
        }else {
            dom.setAttribute(propName, props[propName]);
        }
    }
    return dom;
}

export default {
    render,
    createDOM,
}