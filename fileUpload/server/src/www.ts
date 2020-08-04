import app from './app';
import http from 'http';
const port = process.env.PORT || 8000;
const server = http.createServer(app);

server.listen(port);
server.on('error', OnError);
server.on('listening', onListening);
function OnError(error: any) {
    console.log('error', error);
}
function onListening() {
    console.log('Listening on port:' + port);
}
