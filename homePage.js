const tools = require('./importer')([
    'fs'
]);
let page = tools.fs.readFileSync('./home.html');

function homePage(request,response) {
    response.writeHead(200,{
        'Content-type': 'text/html;charset=utf-8'
    });
    response.write(page);
    response.end();
}

module.exports = homePage;