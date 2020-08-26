import React, {Component} from 'react'; // 核心库
import ReactDOM from 'react-dom'; // dom渲染库
import PropTypes from 'prop-types';
/**
 * 如何对属性类型进行校验
 * prop-types
 *
 * 为什么类型检查是静态属性 new不new，静态属性只有一份
 * 什么时候用动态，什么时候用静态
 */
class Person extends Component {
    static defaultProps = {
        name: 'DefaultName'
    }
    static propTypes = {
        name: PropTypes.string.isRequired, //  name是一个字符串类型的必填属性
        gender: PropTypes.oneOf(['male', 'female']), // 枚举值
        hobby: PropTypes.arrayOf(PropTypes.string), // 字符串数组
        position: PropTypes.shape({
            x: PropTypes.number,
            y: PropTypes.number
        }),
        // 属性对象 属性名称 组件名称 age设置了一个函数，这是一个自定义的校验器
        age(props, propName, componentName) {
            let age = props[propName];
            if(age < 0 || age > 120){
                throw new Error(`age: ${age} error at ${componentName}`);
            }
        }
    }
    render() {
        let {
            name,
            age,
            gender,
            hobby,
            position
        } = this.props;
        return <table>
            <thead>
            <tr>
                <td>姓名</td>
                <td>年龄</td>
                <td>性别</td>
                <td>爱好</td>
                <td>位置</td>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>{name}</td>
                <td>{age}</td>
                <td>{gender}</td>
                <td>{hobby}</td>
                <td>{`${position.x},${position.y}`}</td>
            </tr>
            </tbody>
        </table>
    }
}
// 创建一个props对象
let props = {
    // name: 'samuelcheng',
    age: 30,
    gender: 'male',
    hobby: ['smoke', 'drink'],
    position: {
        x: 10,
        y: 20
    },
    friends: [
        {name: 'xx', age: 10},
        {name: 'yy', age: 20}
    ]
};
let element = <Person {...props}/>;

ReactDOM.render(
    element,
    document.getElementById('root')
);