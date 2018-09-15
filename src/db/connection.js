const MongoClient = require('mongodb').MongoClient;
const APIError = require('../middle/rest').APIError;

const url = 'mongodb://publish:123456@120.77.210.122/publisher';

module.exports = (callback) => {
    MongoClient.connect(url, (err, client) => {
        if(err) throw new APIError('mongodb:connection failed', err);
        console.log('database connected');
        const db = client.db();
        callback(db);
    });
}
