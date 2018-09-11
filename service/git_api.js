const Git = require('nodegit');
const path = require('path');
const APIError = require('../middle/rest').APIError;

// const url = 'https://github.com/Stranger469/frontEndPublisher.git';
// const name = url.split('/').pop().split('.')[0];
// Git.Clone(url, path.resolve('../tmp/' + name)).catch(err => console.log(err));

module.exports = {
    clone(url) {
        // TODO: 新建项目，通过url clone项目并保存到对应地址
        const name = url.split('/').pop().split('.')[0];
        Git.Clone(url, path.resolve('../tmp/' + name)).catch(err => {
            throw new APIError('git:clone error', err);
        });
    },
    getCommit() {
        // TODO: 获取所有的提交信息，并通过array返回

    },
    pull(name) {
        // TODO: 拉取项目, repository
        Git.Repository.open(path.resolve('../tmp/' + name)).then(repo => {
            repo.fetchAll({
                credentials: (url, userName) => {
                    return Git.Cred.sshKeyFromAgent(userName);
                }
            }).then(() => {
                repo.mergeBranches('master', 'origin/master');
            });
        }).catch(err => {
            throw new APIError('git:pull error', err);
        });
    }
}
