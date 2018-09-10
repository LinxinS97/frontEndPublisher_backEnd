const Koa = require('koa');
const WebSocket = require('ws');
const cors = require('koa2-cors');
const bodyParser = require('koa-bodyparser');
const controller = require('./middle/controller');
const rest = require('./middle/rest');
// const WebSocketController = require('./websocket/websocket');

const app = new Koa();
// const WebSocketServer = WebSocket.Server;

app.use(cors());

// log request URL:
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
});

// 解析request body
app.use(bodyParser());

// 添加rest解析中间件
app.use(rest.restify());

// 解析controllers
app.use(controller());

let server = app.listen(8000);
// const wss = new WebSocketServer({
//     server: server
// });
// WebSocketController(wss);
console.log('server is running at http://localhost:8000');