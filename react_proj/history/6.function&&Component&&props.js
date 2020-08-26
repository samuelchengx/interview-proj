// import React from 'react'; // 核心库
// import ReactDOM from 'react-dom'; // dom渲染库

import React from './react'; // 核心库
import ReactDOM from './react-dom'; // dom渲染库

// let element = <h1 className='title' style={{color: 'red'}}>
//     hello
//     <span> samuel</span>
// </h1>;

// var element = React.createElement("h1", {
//     className: "title",
//     style: {
//         color: 'red',
//         fontSize: '28px'
//     }
// }, "hello", React.createElement("span", null, " samuel"));


function Welcome (props) {
    return React.createElement("h1", {
        className: "title",
        style: {
            color: 'red',
            fontSize: '28px'
        }
    }, "hello", React.createElement("span", null, " samuel"));
}

// let element = <Welcome />;
// createElement函数的参数可能是一个函数或是一个字符串
// 原生DOM是字符串，类或是函数组件就是function

class Welcome1 extends React.Component {
    render() {
        return React.createElement("h1", {
            className: "title",
            style: {
                color: 'red',
                fontSize: '28px'
            }
        }, "hello", React.createElement("span", null, " Gina"));
    }
}

let element = React.createElement(Welcome, {});

let element1 = React.createElement(Welcome1, {});

console.log('element', element);
ReactDOM.render(
    element1,
    document.getElementById('root')
);