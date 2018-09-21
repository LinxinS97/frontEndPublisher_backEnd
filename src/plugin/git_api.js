const Git = require('nodegit');
const path = require('path');
const APIError = require('../middle/rest').APIError;

module.exports = {
    async clone(url) {
        // TODO: 新建项目，通过url clone项目并保存到对应地址
        const name = url.split('/').pop().split('.')[0];
        console.log(name);
        try {
            await Git.Clone(url, path.resolve('./repos/' + name));
        } catch (e) {
            throw new APIError('git:clone error', e);
        }
    },
    async getCommit() {
        // TODO: 获取所有的提交信息，并通过array返回
        
    },
    async pull(name) {
        try {
            const repo = await Git.Repository.open(path.resolve('./repos/' + name));
            await repo.fetchAll({
                credentials: (url, userName) => {
                    return Git.Cred.sshKeyFromAgent(userName);
                }
            });
            await repo.mergeBranches('master', 'origin/master');
        } catch (e) {
            throw new APIError('git:pull error', e);
        }
    }
}
