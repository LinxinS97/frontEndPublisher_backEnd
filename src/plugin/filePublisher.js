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
            sftp.fastPut(filedir, remotePath + '/' + filename, (err) => {
                if(err) throw new APIError('file put error:can not put file', err);
            });
            console.log(filedir, newPath);
        }
        if(stats.isDirectory()){
            // 更新目录
            let newPath = remotePath + filedir.split(filePath)[1];
            console.log(filedir, newPath);
            await sftp.mkdir(newPath);
            await getFile(filedir, sftp, newPath);
        }
    }
};
