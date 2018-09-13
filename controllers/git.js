const APIError = require('../middle/rest').APIError;
const gitApi = require('../plugin/git_api');
const command = require('../plugin/command');

module.exports = {
    'POST /api/git/clone': async ctx => {
        const body = ctx.request.body;
        await gitApi.clone(body.url);
        // TODO: 将项目分类保存到db中
        ctx.rest({
            status: 'success',
            name: body.url.split('/').pop().split('.')[0]
        });
    },
    'GET /api/git/commits': async ctx => {
        // TODO: 获取所有提交
        ctx.rest({
            status: 'success'
        });
    },
    'POST /api/git/publish': async ctx => {
        // TODO: 发布专题项目
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
