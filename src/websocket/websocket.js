module.exports = wss => {
    // 广播
    wss.boardcast = data => {
        wss.clients.forEach(client => {
            client.send(data);
        });
    }
    wss.on('connection', ws => {
        // 绑定websocket对象
        ws.wss = wss;
        // TODO: 绑定user
        console.log(`[SERVER] connection`);
        // FIXME: 这里只有广播方法
        ws.on('message', function(msg){
            console.log(`[SERVER] Received: ${msg}`);
            // ws.send(`ECHO: ${msg}`, err => {
            //     if(err) console.log(`[SERVER] error: ${err}`);
            // });
            this.wss.boardcast(`ECHO: ${msg}`);
        });
    });
}