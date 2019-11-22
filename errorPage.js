let tools = require('./importer')([
    'fs'
])
function errorPage() {
    let errorP = tools.fs.readFileSync('error.html');
    return errorP.toString();
}

module.exports = errorPage;