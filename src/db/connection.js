const MongoClient = require('mongodb').MongoClient;
const APIError = require('../middle/rest').APIError;

const url = 'mongodb://publisher:123456@120.77.210.122/publish';

module.exports = async (callback) => {
    let client;
    try {
        client = await MongoClient.connect(url);
    } catch (e) {
        console.error(e);
        throw new APIError('mongodb:connection failed', e);
    }
    console.log('database connected');
    const db = client.db();
    await callback(db);
    client.close();
}
