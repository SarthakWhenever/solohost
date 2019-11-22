let tools = require('./importer')([
    './cachedb', './errorPageHandle',
    './defaultHeaders', 'fs'
])
let {log} = console;


async function caches(request, response) {
    let cacheURL = request.url.substr(1);
    cacheURL = cacheURL.endsWith('/')?cacheURL.substr(0,cacheURL.length):cacheURL;
    let cache = cacheURL.split("/");
    let cacheHex = cache[0];
    if(!(tools.cachedb.hasOwnProperty(cacheHex))) {
        return tools.errorPageHandle(request, response)
    }
    let foundCacheRecord = tools.cachedb[cacheHex];
    let content;
    try {
        content = tools.fs.readFileSync('./caches/' + cacheHex + ".cache");
    }catch(err) {
        log(content);
        log(err);
        return tools.errorPageHandle(request,response);
    }
    response.writeHead(foundCacheRecord[0], {
        'Content-type': 'text/html ?charset=utf-8',
        ...foundCacheRecord[1],
        ...tools.defaultHeaders
    });
    response.write(content);
    response.end();
}

module.exports = caches;