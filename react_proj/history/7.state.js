// import React from 'react'; // 核心库
// import ReactDOM from 'react-dom'; // dom渲染库
import React from './react'; // 核心库
import ReactDOM from './react-dom'; // dom渲染库
/**
 * 组件的状态
 * 数据源: 属性[父组件，不可修改] 和 state[改变方式setState]
 * 属性和状态都会影响视图，更新视图
 */
class Clock extends React.Component {
    // 两种初始化state的方式
    state = {
        date: new Date()
    }
    constructor(props) {
        super(props); //this.props = props;
        // 只有在构造函数中才能给this.state赋值
        // 其他地方修改state，只能通过setState
        // this.state = {
        //     date: new Date()
        // }
    }
    componentWillMount() { // 组件将要挂载

    }
    componentDidMount() { // 组件挂载完成
        this.timer = setInterval(()=>{
            // 改变状态会引起界面刷新
            this.setState({
                date: new Date()
            });
        }, 1000);
    }
    render() {
        return (<div>
            <h3>Hello Samuel ~</h3>
            <p>当前时间：{this.state.date.toLocaleTimeString()}</p>
        </div>);
    }
}
let element = React.createElement(Clock, {});
ReactDOM.render(
    <div>{element}</div>,
    document.getElementById('root')
);