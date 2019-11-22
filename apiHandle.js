let tools = require('./importer')([
  './readURL', './errorPageHandle',
  './defaultHeaders','./filterOnlyCode','./validiateURL'
]);
let { log } = console;

async function apiHandle(request, response) {
  let mainurl = request.url.slice(1);
  if (tools.validiateURL(mainurl)) {
    await handler(request, response, mainurl);
  }
}
async function handler(request, response, mainurl) {
  let soloPage, mainCode;
  try {
    soloPage = await tools.readURL(mainurl);
    mainCode = await tools.filterOnlyCode(soloPage);
  } catch (err) {
    log(err);
    tools.errorPageHandle(request, response, 404, {});
    return;
  }
  let found = (mainCode[0] != undefined);
  let statusCode = found ? 200 : 404;
  response.writeHead(statusCode, {
    'Content-type': 'application/json; charset=utf-8',
    ...tools.defaultHeaders
  });
  response.write(JSON.stringify({
    found,
    lang: mainCode[3],
    code: mainCode[0],
    cssCode: mainCode[1],
    jsCode: mainCode[2]
  }));
  response.end();
}
module.exports = apiHandle;