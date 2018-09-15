const _connect = require('./connection');
const assert = require('assert');
const APIError = require('../middle/rest').APIError;
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
    },
    async findAllMain(name) {
        let result;
        await _connect(async db => {
            const collection = db.collection('GitRepo');
            result = await collection.find({});
            result = await result.toArray();
        });
        return result;
    },
    async deleteOne(name) {
        let res;
        await _connect(async db => {
            const collection = db.collection('GitRepo');
            res = await collection.findOneAndDelete({ repoName: name});
        });
        return res;
    }
}
