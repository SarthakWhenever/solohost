const tools = require('./importer')([
    'fs', 'request', ['is-url', 'isURL'],
    './errorPageHandle',
    ['hash.js/lib/hash/sha/256', 'sha256'],
    './cachedb','./writeToFile', './validiateURL',
    'os','./defaultConfig', './defaultHeaders'
    
]);
let _port = process.env.PORT || tools.defaultConfig.port;
let defPort = tools.defaultConfig.port;
let cport = (_port == defPort);
cport = (cport?(":"+defPort):"")
const {log} = console;

function getEnc(data) {
    return tools.sha256().update(data).digest('hex');
}

async function cacheIt(request, response) {
    let mainUrl = request.url.slice(1);
    if(!tools.isURL(mainUrl)) {
        return tools.errorPageHandle(request, response);
    }else if(!tools.validiateURL(mainUrl)) {
        return tools.errorPageHandle(request, response);
    }
    mainUrl = 'http://'+(process.env.host||request.hostname)+cport+'/' + mainUrl;
    tools.request(mainUrl, async function(err, res, body) {
        let dataRes = body || res.body;
        dataRes += "";
        let resStatCode = (err?404:undefined)||(res.statusCode || 404);
        let hashName = getEnc(request.url);
        tools.cachedb[hashName] = [resStatCode, {
            "content-type": res.headers["content-type"],
            ...tools.defaultHeaders
        }];
        let writtenJSON = await tools.writeToFile('./cachedb.json', JSON.stringify(tools.cachedb));
        let written = await tools.writeToFile('./caches/' + hashName + ".cache", dataRes);
        if((written!="DONE") && (writtenJSON!="DONE")) {
            statusCode = 403;
            dataRes = "Unable to cache the link";
            log(written[1]);
            log(writtenJSON[1]);
        }else {
    dataRes = `<h1>Successfully cached the link. Your cacheLink is at this link <a href="/caches/${hashName}/">/caches/${hashName}/</a><h1>`;
        }
        response.writeHead(resStatCode, {
            "Content-type": "text/html; charset=utf-8"
        });
        
        response.write(dataRes);
        response.end();
    });
}

module.exports = cacheIt;
