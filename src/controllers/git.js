const APIError = require('../middle/rest').APIError;
const gitApi = require('../plugin/git_api');
const command = require('../plugin/command');
const db = require('../db/git_db');

module.exports = {
    // clone项目
    'POST /api/git/clone': async ctx => {
        const body = ctx.request.body;
        await gitApi.clone(body.url);
        await db.save({
            repoName: body.url.split('/').pop().split('.')[0],
            url: body.url,
            type: body.type
        });
        ctx.rest({
            status: 'success',
            name: body.url.split('/').pop().split('.')[0]
        });
    },
    // 删除一个项目
    'DELETE /api/git/delete/:repo': async ctx => {

    },
    // 获取所有项目
    'GET /api/git/getAll': async ctx => {

    },
    // 获取当前项目所有提交
    'GET /api/git/commits/:repo': async ctx => {
        // TODO: 获取所有提交
        ctx.rest({
            status: 'success'
        });
    },
    // 发布一个项目
    'POST /api/git/publish': async ctx => {
        const body = ctx.request.body;
        await gitApi.pull(body.name);
        // TODO:发布
        
        command('cd ./repos/' + body.name + ' && npm install && npm run build');
        ctx.rest({
            status: 'success',
            name: body.name
        });
    }
}
