import React from 'react'; // 核心库
import ReactDOM from 'react-dom'; // dom渲染库

// function greeting(name) {
//     if(name){
//         return <h1>hello {name}</h1>
//     } else {
//         return <h1>hello stranger</h1>
//     }
// }
// let element = greeting('samuel');
let name = ['张三', '李四', '王五', '廖六', '陈七'];
let element1 = name.map((n, index) => <li key={'n_'+index}>{n}</li>);
/**
 * key的作用
 * 高效地进行dom diff
 * 新数组通过key值与虚拟dom比较，尽可能复用老的节点，对比后得到补丁包，通过移动和插入等到新的视图
 */

ReactDOM.render(
    <ul>
        {element1}
    </ul>,
    document.getElementById('root')
);

let element2 = name.reverse().map((n, index) => <li key={'n_'+index}>{n}</li>);
/**
 * key的作用
 * 高效地进行dom diff
 *
 */

ReactDOM.render(
    <ul>
        {element2}
    </ul>,
    document.getElementById('root')
);