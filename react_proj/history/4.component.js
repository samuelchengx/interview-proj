import React, {Component} from 'react'; // 核心库
import ReactDOM from 'react-dom'; // dom渲染库

/**
 * 如何定义组件和组件的属性
 * 函数式组件，就是一个函数 接受属性对象，返回一个react元素
 * 类组件 就是一个类 需要一个render方法，并且只能返回一个顶级react元素
 */

/**
 * 函数组件渲染？
 * 1、封装函数组件的属性对象，{name: 'samuel'}
 * 2、把props传递给Welcome1这个函数，返回一个React元素
 * 3、把React元素，也就是虚拟dom渲染到真是dom上
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
function Welcome1(props) {
    return <h1>hello {props.name}</h1>
}

/**
 * 如何渲染类组件?
 * 1、封装函数组件的属性对象，{name: 'samuel'}
 * 2、new Welcome2(props)，传递props，创建类的实例
 * 3、调用实例的render方法，返回React元素
 * 4、虚拟DOM render 真实DOM
 */
class Welcome2 extends Component {
    render() {
        return <h1>hello {this.props.name}</h1>
    }
}

/**
 * 组件首字母大写，区分自定义组件和原始dom
 * 组件使用时，必须先定义
 * 必须返回顶级元素
 * props
 * props具有只读性 不能修改props
 *
 * @type {JSX.Element}
 */
let element1 = <Welcome1  name={'samuel'}/>
let element2 = <Welcome2  name={'samuelcheng'}/>

ReactDOM.render(
    element2,
    document.getElementById('root')
);