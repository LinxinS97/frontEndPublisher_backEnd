const APIError = require('../middle/rest').APIError;
const gitApi = require('../service/git_api');

module.export = {
    'POST /api/git/clone': async (ctx, next) => {
        // TODO: clone项目，并将项目分类保存到db中
        gitApi.clone(ctx.body.url);
        ctx.rest('success');
    },
    'GET /api/git/commits': async (ctx, next) => {
        // TODO: 获取所有提交
    },
    'GET /api/git/publish': async (ctx, next) => {
        // TODO: pull，npm install，发布
    }
}
