module.exports = ws => {
    ws.on('message', msg => {
        console.log(`[SERVER] Received: ${msg}`);
        ws.send(`ECHO: ${msg}`, err => {
            if(err) console.log(`[SERVER] error: ${err}`);
        });
    });
}