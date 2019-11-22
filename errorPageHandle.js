let tools = require('./importer')([
    './errorPage'
]);
let errorPage = tools.errorPage();
async function errorPageHandle(request,response, statusCode,headers, data) {
    response.writeHead(statusCode || 404, {
        'Content-type': 'text/html',
        ...headers
    });
    response.write(data || errorPage);
    response.end();
}

module.exports = errorPageHandle;