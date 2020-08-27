// import React from 'react'; // 核心库
// import ReactDOM from 'react-dom'; // dom渲染库
import React from './react'; // 核心库
import ReactDOM from './react-dom'; // dom渲染库
/**
 * 1、不直接修改state，直接修改不刷新页面 setState包含了更新操作 保持真实DOM和虚拟DOM一致
 * 2、setState的更新可能会被合并 说明setState传的对象会与老的对象合并
 * 3、setState可能是异步的
 * 4、在事件处理函数里，setState不会直接修改状态，先把partialState放到一个数组[源码是链表]缓存起来，等事件结束再执行
 *
 */

class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'counter',
            number: 0
        };
    }
    /**
     * updateQueue = [];  updateQueue.push({
            number: this.state.number+1
        }, {
            number: this.state.number+1
        });
    */
    add() {
        // this.setState({
        //     number: this.state.number+1
        // });
        // console.log(this.state.number);
        // this.setState({
        //     number: this.state.number+1
        // });
        // console.log(this.state.number);
        // this.state.number = this.state.number + 1;
        this.setState( prevState=> ({
            number: prevState.number + 1
        }), ()=>{
           // console.log('--1--', this.state.number); // 2
        });
        console.log('--12--', this.state.number); // 0
        this.setState( prevState=> ({
            number: prevState.number + 1
        }), ()=>{
            // console.log('--21--', this.state.number); // 2
        });
        console.log('--22--', this.state.number); // 0
    }
    render() {
        return (<div>
            <p>{this.state.name} {this.state.number}</p>
            <button onClick={()=>this.add()}>+</button>
        </div>);
    }
}
let element = React.createElement(Clock, {});
ReactDOM.render(<Clock />, document.getElementById('root'));

/**
 * 事件绑定的时候，虚拟DOM JSX绑定和原生DOM不一样
 * 属性名 JSX onClick 原生DOM onclick
 * 值 JSX 函数的指针 函数变量名 原生DOM字符串
 **/