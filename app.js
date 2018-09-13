const Koa = require('koa');
const WebSocket = require('ws');
const cors = require('koa2-cors');
const bodyParser = require('koa-bodyparser');
const controller = require('./middle/controller');
const rest = require('./middle/rest');

const app = new Koa();
let server = app.listen(8000);

const WebSocketServer = WebSocket.Server;
const wss = new WebSocketServer({
    server: server
});

app.use(cors());

// 注册websocket
app.use(async (ctx, next) => {
    ctx.ws = wss;
    await next();
})

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
