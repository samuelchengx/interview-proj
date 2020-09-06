class Server {
    constructor(props) {

    }
}

function createServer(defaultConfig) {
    let {
        port,
        directory,
        address
    } = defaultConfig;
    // 创建http服务
    // 异步功能 async + await 所以的方法更好管理一些
    let server = new Server();
    return server;
}
module.exports = createServer;