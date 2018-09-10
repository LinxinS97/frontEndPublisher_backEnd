// 执行命令
const exec = require('child_process').exec;
// 执行脚本
const execFile = require('child_process').execFile;

module.exports = (exec, execFile, command, file) => {
    if(command) {
        exec(command, (err, out, err) => {
            if(err) {
                console.log(err);
                return err;
            } else {
                console.log(out);
                return out;
            }
        });
    }
    if(file) {
        execFile(file, {encoding: 'utf-8'}, (err, out, err) => {
            if(err) {
                console.log(err);
                return err;
            } else {
                console.log(out);
                return out;
            }
        });
    }
}