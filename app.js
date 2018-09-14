const Koa = require('koa');
const WebSocket = require('ws');
const cors = require('koa2-cors');
const bodyParser = require('koa-bodyparser');
const controller = require('./src/middle/controller');
const rest = require('./src/middle/rest');
const webSocketAPI = require('./src/websocket/websocket');

const app = new Koa();
let server = app.listen(80);

// websocket，同一个端口监听不同的协议
const WebSocketServer = WebSocket.Server;
const wss = new WebSocketServer({
    server
});
// 注册websocket
webSocketAPI(wss);

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
console.log('server is running at http://localhost:8000');
