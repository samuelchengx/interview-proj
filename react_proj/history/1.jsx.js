import React from 'react'; // 核心库
import ReactDOM from 'react-dom'; // dom渲染库

/**
 * 把h1元素渲染到root节点内部
 * 看起来像html，但是它其实是JS，并不是标准的JS语法
 * 在webpack打包时，会把JSX语法转为JS语法
 */

/**
 * 什么叫react元素
 * 是React应用的最小单位，它描述了试图可见的内容
 * React元素本质是一个普通的js对象
 * ReactDOM会保证浏览器中的DOM和你的React元素一致
 */

// jsx更像JS，而不是HTML
// React如何区分是JSX，还是表达式呢？
// 以<> 就是JSX元素， 以{} 就是表达式
// 给JSX赋值时，尽量避免关键字

let name = 'samuelcheng';
let ele = <h1 id="title" className="name">hello {name}</h1>;

/**
 *
 * @param type
 * @param config
 * @param children
 * @returns {{$$typeof: symbol, type: *, props: {children: *[]}}}
 */
// function createElement(type, config = {}, ...children) {
//     return {
//         $$typeof: Symbol.for('react.element'),
//         type,
//         props: {...config, children}
//     }
// }
// let ele = createElement('h2', {id: 'app'}, 'hello', createElement('p', null, 'world'));
console.log('ele', ele);

ReactDOM.render(
    ele,
    document.getElementById('root')
);