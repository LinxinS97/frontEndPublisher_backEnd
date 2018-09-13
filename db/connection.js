const MongoClient = require('mongodb').MongoClient;
const APIError = require('../middle/rest').APIError;

const url = 'mongodb://publish:123456@120.77.210.122/publisher';

module.exports = (callback) => {
    MongoClient.connect(url, (err, client) => {
        if(err) throw new APIError('mongodb:connection failed', err);
        console.log('database connected');
        callback(client);
        
        // const db = client.db();
        // const collection = db.collection('GitRepo');
        // collection.insertMany([
        //     { 'repoName': 'netEduFrontEnd', 'url': 'https://github.com/netEdu/netEduFrontEnd.git', type: 0 },
        //     { 'repoName': 'netEdu', 'url':'https://github.com/netEdu/netEdu.git' , type: 1 }
        // ], (err, result) => {
        //     assert.equal(err, null);
        //     assert.equal(3, result.result.n);
        //     assert.equal(3, result.ops.length);
        //     console.log('Insert 3 documents into the collection');
        // });
    });
}
