const fs = require('fs');
const path = require('path');
const APIError = require('../middle/rest').APIError;
/**
 * 文件遍历方法
 * @param filePath 需要遍历的文件路径
 * @param sftp sftp连接对象
 * @param remotePath 对应目标根文件夹
 */
module.exports = async function getFile(filePath, sftp, remotePath) {
    let files;
    try{
        files = fs.readdirSync(filePath);
    } catch(e) {
        console.error(e);
    }
    for(let filename of files) {
        let filedir = path.join(filePath, filename);
        const stats = fs.statSync(filedir);
        if(stats.isFile()) {
            // await sftp.fastPut(filedir, remotePath + '/' + filename, (err) => {
            //     if(err) throw new APIError('file put error:can not put file', err);
            // });
            await fastPut(sftp, filedir, remotePath + '/' + filename)
            console.log(filedir);
        }
        if(stats.isDirectory()){
            // 更新目录
            let newPath = remotePath + filedir.split(filePath)[1];
            console.log(filedir, newPath);
            await mkdir(newPath);
            await getFile(filedir, sftp, newPath);
        }
    }
};

// 用Promise重写fastPut
function fastPut(sftp, filedir, remotePath) {
    return new Promise((resolve, reject) => {
        sftp.fastPut(filedir, remotePath, function (err) {
            if (err) return reject(err);
            return resolve(`${localPath} was successfully uploaded to ${remotePath}!`);
        });
    });
}

// 用promise重写mkdir
function mkdir(sftp, newPath) {
    return new Promise((resolve, reject) => {
        sftp.mkdir(newPath, err => {
            if(err) return reject(err);
            return resolve(`${newPath} directory has been created`);
        });
    })
}