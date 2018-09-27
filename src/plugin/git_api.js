const Git = require('nodegit');
const path = require('path');
const APIError = require('../middle/rest').APIError;
const opts = {
    fetchOpts: {
        callbacks: {
            certificateCheck: function() {
                return 1;
            },
            credentials: function (url, userName) {
                return Git.Cred.sshKeyFromAgent(userName);
            }
        }
    }
};
module.exports = {
    async clone(url) {
        // TODO: 新建项目，通过url clone项目并保存到对应地址
        const name = url.split('/').pop().split('.')[0];
        try {
            await Git.Clone(url, path.resolve('./repos/' + name), opts);
        } catch (e) {
            console.log(e);
            throw new APIError('git:clone error', e);
        }
    },
    async getCommit() {
        // TODO: 获取所有的提交信息，并通过array返回
        
    },
    async pull(name, username, psw) {
        try {
            const repo = await Git.Repository.open(path.resolve('./repos/' + name));
            // await repo.fetchAll({
            //     certificateCheck: () => 1,
            //     credentials: (url, userName) => {
            //         if(username === null && psw === null) {
            //             return Git.Cred.sshKeyFromAgent(userName);
            //         } else {
            //             console.log(username, psw);
            //             return Git.Cred.userpassPlaintextNew(username, psw);
            //         }
            //     },
            // });
            await repo.fetchAll('origin');
            await repo.mergeBranches('master', 'origin/master');
        } catch (e) {
            console.error(e);
            throw new APIError('git:pull error', e);
        }
    }
}
