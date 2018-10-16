const API = require('./api/git');

module.exports = {
    /**
     * clone一个项目
     * 
     * @param name: 项目名称
     * @param url: 项目git地址
     * @param type: 项目类型（0: 前端/1: 后端)
     */
    'POST /api/git/clone': async ctx => {
        await API.git_clone(ctx);
    },
    /**
     * 删除一个项目
     */
    'DELETE /api/git/delete/:repo': async ctx => {
        await API.git_delete(ctx);
    },
    /**
     * 获取所有项目
     */
    'GET /api/git/getAll': async ctx => {
        await API.git_getAll(ctx);
    },
    /**
     * 获取所有项目下的专题项目（special专用）
     */
    'GET /api/git/getAllSpecial/:name': async ctx => {
        await API.git_getAllSpecial(ctx);
    },
    /**
     * 获取当前项目所有提交
     * 
     * @param repo: 项目名
     */
    'GET /api/git/commits/:repo': async ctx => {
        // TODO: 获取所有提交
        await API.git_commits(ctx);
    },
    /**
     * 发布一个项目
     * 
     * @param repo: 项目名
     * @param dir: 项目打包目录
     * @param username: 拉取用户名
     * @param password: 拉取密码
     * @param packageChange: package是否需要重新安装
     */
    'POST /api/git/publish': async ctx => {
        await API.git_publish(ctx);
    }
}
