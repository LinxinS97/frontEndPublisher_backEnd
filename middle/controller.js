const fs = require('fs');
const path = require('path');

function addMapping(router, mapping) {
    console.log(mapping);
    for(let url in mapping){
        if(url.startsWith('GET ')) {
            let path = url.substring(4);
            router.get(path, mapping[url]);
            console.log(`register URL mapping: GET ${path}`);
        } else if(url.startsWith('POST ')) {
            let path = url.substring(5);
            router.post(path, mapping[url]);
            console.log(`register URL mapping: POST ${path}`);
        } else if(url.startsWith('DELETE ')) {
            let path = url.substring(7);
            router.post(path, mapping[url]);
            console.log(`register URL mapping: DELETE ${path}`);
        } else if(url.startsWith('PUT ')) {
            let path = url.substring(4);
            router.post(path, mapping[url]);
            console.log(`register URL mapping: PUT ${path}`);
        }
        else {
            console.log(`invalid URL: ${url}`);
        }
    }
}

function addControllers(router, dir) {
    let files = fs.readdirSync('./' + dir);
    let js_files = files.filter((f) => {
        return f.endsWith('.js');
    });
    console.log(js_files);
    
    js_files.forEach(f => {
        console.log(`process controller: ${f}...`);
        let mapping = null;
        // require路径
        mapping = require(path.resolve(__dirname, '../' + dir + '/' + f));
        addMapping(router, mapping);
    });
}

module.exports = function (dir) {
    // 如果不传参数默认扫描 controllers
    let controllers_dir = dir || 'controllers',
        router = require('koa-router')();
    addControllers(router, controllers_dir);
    return router.routes();
};
