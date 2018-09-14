const _connect = require('./connection');
const assert = require('assert');
const APIError = require('../middle').APIError;

// 将repo数据存入mongodb
module.exports = {
    async save(obj) {
        await _connect(async db => {
            const collection = db.collection('GitRepo');
            let res;
            try {
                res = await collection.insertOne(obj);
            } catch (e) {
                throw new APIError('mongodb:insert error', e);
            }
            assert.equal(1, res.result.n);
            assert.equal(1, res.ops.length);
            console.log('save success');
        });
    },
    async find(name) {
        let isExist = false;
        await _connect(async db => {
            const collection = db.collection('GitRepo');
            isExist = await collection.findOne({ repoName: name }) === null ? false : true;
        });
        return isExist;
    }
}
