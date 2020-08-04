interface OPTIONS {
    baseUrl?: string,
    method: string,
    url: string,
    headers?: any,
    data: any
}

export function request(options: OPTIONS): Promise<any> {
    let _defaultOptions = {
        method: 'get',
        baseUrl: 'http://localhost:8000',
        headers: {}, // 请求头
        data: {} // 请求体
    }
    options = {
        ..._defaultOptions,
        ...options,
        headers:{
            ..._defaultOptions.headers,
            ...options.headers || {}
        }
    }
    return new Promise(function (resolve: Function, reject: Function){
        let xhr = new XMLHttpRequest();
        xhr.open(options.method, options.baseUrl + options.url);
        for (let key in options.headers) {
            xhr.setRequestHeader(key, options.headers[key]);
        }
        xhr.responseType = 'json';
        xhr.onreadystatechange = function () {
            if(xhr.readyState === 4) {
                if(xhr.status === 200) {
                    resolve(xhr.response)
                }else {
                   reject(xhr.response);
                }
            }
        }
        xhr.send(options.data);
    });
}


