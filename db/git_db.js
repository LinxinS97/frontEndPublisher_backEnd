const _connect = require('./connection');
const assert = require('assert');

// 将repo数据存入mongodb
module.exports = {
    async save(obj) {
        await _connect(async db => {
            const collection = db.collection('GitRepo');
            await collection.insertOne(obj, (err, result) => {
                assert.equal(err, null);
                assert.equal(1, result.result.n);
                assert.equal(1, result.ops.length);
                console.log('Insert 3 documents into the collection');
            });
        })
    }
}
