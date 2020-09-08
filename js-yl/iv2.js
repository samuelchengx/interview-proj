// import React, { Component } from 'react';
// 1.实现一个搜索组件，通过input输入文字，向后端发送请求，后端返回列表
function Ajax(options) {
    let _defaultOpts = {
        method: 'GET',
        baseUrl: '',
        headers: {},
        data: {}
    };
    options = {
        ..._defaultOpts,
        ...options,
        headers:{
            ..._defaultOpts.headers,
            ...options.headers || {}
        }
    }
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open(options.method, options.baseUrl+options.url);
        for(let key in options.headers){
            xhr.setRequestHeader(key, options.headers[key]);
        }
        xhr.responseType = 'json';
        xhr.onreadystatechange = function () {
            if(xhr.readyState == 4) {
                if(xhr.status == 200){
                    resolve(xhr.response);
                } else {
                    resolve(xhr.response);
                }
            }
        }

    });
}
// 防止抖动，操作后500ms执行一次
function debounce(fn, wait) {
    let timer = null;
    return function () {
        let context = this;
        let args = arguments;
        if(timer) {
            clearTimeout(timer);
            timer = null;
        }
        timer = setTimeout(() => {
            fn.apply(context, args);
        }, wait);
    }
}
class Search extends Component {
    state = {
        query: ''
    }
    handleInput(e) {
        let query = e.target.value || '';
        let data = {
            method: 'GET',
            url: '/getList',
            data: {
                query
            }
        };
       Ajax(data).then(res=>{
           return res.data.List;
       }).then(List=>{
           this.setState({
               List
           });
       });
    }
    render() {
        let { List } = this.state;
        return <div>
            <input type="text" onChange={(e) => debounce(this.handleInput(e), 500)}/>
            <ul>
                {
                    Array.isArray(List) && List.map(item => <li key={item}>{item}</li>)
                }
            </ul>
        </div>
    }
}

// 2、实现一个方法,传入rule，str,返回boolean；
// rule为 +**{N} +代表一个字符， *代表3个字符 *{N}代表4个字符
// 例如 +**{4} => "abbbcccc"
function checkStr(rule, str){
    let res = true;
    let numStr = '';
    let index = 0;
    let resArr = [];
    // code here
    while (index < rule.length) {
        let current = rule.substr(index,1);
        let next = rule.substr(index + 1,1);
        if(current=='+') {
            resArr.push(1);
            index++;
            continue;
        }
        if(current=='*'&&next!='{') {
            resArr.push(3);
            index++;
            continue;
        }
        if(current=='*'&&next == '{'){
            index += 2;
            continue;
        }
        if(typeof parseInt(current) == 'number'){
            numStr+=current;
            index++;
        }
        if(current == '}') {
            resArr.push(parseInt(numStr));
            index++;
            continue;
        };
    }
    let flag = 0;
    function getIsSame(str) {
        let arr = str.split('');
        let temp = Array.from(new Set(arr));
        if(temp.length==1){
            return true;
        }else {
            return false;
        }
    }
    resArr.forEach(m => {
        let t = str.substr(flag, m);
        if(!getIsSame(t)) {
            res = false;
            return;
        }
        flag += m;
    });
    return res;
}
let result = checkStr("+**{4}", 'abbbbcccc');
console.log('result', result);

