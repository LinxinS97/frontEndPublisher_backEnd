// 执行命令
const exec = require('child_process').exec;
// 执行脚本
const execFile = require('child_process').execFile;

module.exports = (exec, execFile, command, file) => {
    if(command) {
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
    if(file) {
        execFile(file, {encoding: 'utf-8'}, (err, stdOut, stdErr) => {
            if(err) {
                console.log(stdErr);
                return stdErr;
            } else {
                console.log(stdOut);
                return stdOut;
            }
        });
    }
}