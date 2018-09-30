const APIError = require('../../middle/rest').APIError;
const config = require('../../../config').frontEndPublisher;
const Client = require('ssh2').Client;
const gitApi = require('../../plugin/git_api');
const command = require('../../plugin/command');
const db = require('../../db/git_db');
const path = require('path');
const filePublisher = require('../../plugin/filePublisher');

module.exports = {
    async git_clone(ctx) {
        const body = ctx.request.body;
        const name = body.url.split('/').pop().split('.')[0];
        const isExist = await db.find(name);
        console.log(isExist);
        if(isExist) {
            throw new APIError('controller:clone error', 'repository is existed');
        }
        await gitApi.clone(body.url);
        await db.save({
            repoName: name,
            url: body.url,
            type: body.type
        });
        ctx.rest({
            status: 'success',
            name: body.url.split('/').pop().split('.')[0]
        });
    },
    async git_delete(ctx) {
        const conn = new Client();
        await db.deleteOne(ctx.params.repo);
        // TODO: 删除对应的本地仓库
        command(`rm -rf ./repos/${ctx.params.repo}`);
        // command('rmdir /s/q ' + path.resolve('./repos/' + ctx.params.repo));
        // FIXME: 在对端服务器卸载对应的项目
        conn.on('ready', () => {
            console.log('Client :: ready');
            conn.exec('rm -rf ' + ctx.params.repo, function(err, stream) {
                if (err) throw err;
            });
        }).connect({
            host: config.host,
            username: config.username,
            password: config.password,
        });
        ctx.rest({
            status: 'success',
        });
    },
    async git_getAll(ctx) {
        ctx.rest({
            status: 'success',
            data: await db.findAllMain()
        });
    },
    async git_getAllSpecial(ctx) {
        // TODO: 获取所有专题项目
        ctx.rest({
            status: 'success'
        });
    },
    async git_commits(ctx) {
        // TODO: 获取所有提交
        ctx.rest({
            status: 'success'
        });
    },
    async git_publish(ctx) {
        const conn = new Client();
        const body = ctx.request.body;
        const repo = body.repo;
        const packageChange = body.packageChange ? '&& npm install' : '';

        await gitApi.pull(repo, body.username, body.password);
        command('cd ./repos/' + repo + packageChange + ' && npm run build');
        console.log('pull & build down');
        // 初始化连接
        conn.on('ready', () => {
            console.log('Client :: ready');
            new Promise((resolve, reject) => {
                conn.exec('rm -rf ' + repo, function(err, stream) {
                    if (err) reject(new APIError('controller:sftp connection error', err));
                    // 删除原目录
                    stream.end('rm -rf ' + repo);
                    console.log('remove down');
                    resolve();
                });
            }).then(() => {
                conn.sftp(async (err, sftp) => {
                    if (err) reject(new APIError('controller:sftp connection error', err));
                    // 创建新目录
                    await sftp.mkdir(repo);
                    await filePublisher(path.resolve('repos/' + repo + '/' + body.dir), sftp, repo + '/');
                    await sftp.end();
                    console.log('transfer down');
                });
            });
        }).connect({
            host: config.host,
            username: config.username,
            password: config.password,
        });
        ctx.rest({
            status: 'success',
            name: repo
        });
    }
}