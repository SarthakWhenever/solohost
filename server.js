let tools = require('./importer')([
    'express',
    './handleServer',
    './defaultConfig'
]);
let {log} = console;
let _port = process.env.PORT || tools.defaultConfig.port;

let server = tools.express();

tools.handleServer(server)

server.listen(_port, function() {
    log("Server at port %s", _port);
});