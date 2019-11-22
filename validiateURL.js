let tools = require('./importer')([
    ['is-url', 'isURL']
])

function validiateURL (mainurl) {
    let isValidURL = tools.isURL(mainurl);
    return isValidURL && (mainurl.startsWith('https://code.sololearn.com/') || mainurl.startsWith('http://code.sololearn.com/')) &&
    (/https:\/\/code\.sololearn\.com\/./.test(mainurl) || /http:\/\/code\.sololearn\.com\/./.test(mainurl));
}

module.exports = validiateURL;