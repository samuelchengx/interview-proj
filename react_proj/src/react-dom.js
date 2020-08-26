function render(element, container) {
    // 文本节点render
    if(typeof element == 'string' || typeof element == 'number' ) {
        return container.appendChild(document.createTextNode(element));
    }
    let props, type;
    type = element.type;
    props = element.props;
    let isReactComponent = type.isReactComponent;
    if(isReactComponent) { // 如何判断这是一个类组件
        let componentInstance = new type(props);
        element = componentInstance.render();
        type = element.type;
        props = element.props;
    } else if(typeof type === 'function') { // 函数组件
        element = type(props); // 函数组件执行后返回一个React元素
        // 重新得到React元素类型和属性
        type = element.type;
        props = element.props;
    }
    let dom = createDOM(type, props);
    container.appendChild(dom);
}

function createDOM(type, props) {
    let dom = document.createElement(type);
    for(let propName in props) {
        if(propName === 'children') {
            let children = props.children;
            children.forEach(child=> render (child, dom));
            // className htmlFor Style onClick
        } else if(propName === 'className') {
            dom.setAttribute('class',  props[propName]);
        }else if(propName === 'style'){
            let styleObj = props[propName];
            for(let key in styleObj){
                dom.style[key] = styleObj[key];
            }
        }else {
            dom.setAttribute(propName, props[propName]);
        }
    }
    return dom;
}

export default {
    render,
    createDOM
}