const MongoClient = require('mongodb').MongoClient;
const APIError = require('../middle/rest').APIError;

const url = 'mongodb://publish:123456@120.77.210.122/publisher';

module.exports = async (callback) => {
    let client;
    try {
        client = await MongoClient.connect(url);
    } catch (e) {
        throw new APIError('mongodb:connection failed', e);
    }
    console.log('database connected');
    const db = client.db();
    await callback(db);
    client.close();
}
