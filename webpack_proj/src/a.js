require('@babel/polyfill');

import me from './me.jpeg';

// webpack打包引入图片
// 1. js创建图片引入
// 2. 在css引入
// 3. img src
// file-loader

console.log('me', me);

let image = new Image();

image.width = 100;
image.src = me;

document.body.appendChild(image);

class B {

}

function * gen(params) {
    yield 1;
}

console.log(gen().next());

'aaa'.includes('a'); // @babel/polyfill

module.exports = 'samuel';