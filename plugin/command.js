// 执行命令
const exec = require('child_process').execSync;
// 执行脚本
// const execFile = require('child_process').execFileSync;

module.exports = command => {
    console.log('ok');
    exec(command, (err, stdOut, stdErr) => {
        if(err) {
            console.log(stdErr);
            return stdErr;
        } else {
            console.log(stdOut);
            return out;
        }
    });
}