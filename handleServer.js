let tools = require('./importer')([
  './apiHandle','./hanldeHome',
  './isRequestPath', './cacheIt',
  './caches'
]);
let {log} = console;

function handleServer(server) {
  server.use('/', function (request, response) {
    let resolved = false;
    tools.isRequestPath('/api', request.url,  (fpath)=>{
      resolved = true;
      request.url = fpath;
      tools.apiHandle(request, response);
    });
    tools.isRequestPath('/cacheit', request.url,  (fpath)=>{
      resolved = true;
      request.url = fpath;
      tools.cacheIt(request, response);
    });
    tools.isRequestPath('/caches', request.url,  (fpath)=>{
      resolved = true;
      request.url = fpath;
      tools.caches(request, response);
    });
    if(!resolved) {
      tools.hanldeHome(request, response);
    }
  });
}

module.exports = handleServer;