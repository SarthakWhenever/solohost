let tools = require('./importer')([
  './readURL', './errorPageHandle',
  './defaultHeaders', './filterOnlyCode',
  './validiateURL', './singlePaged',
  './defaultHeaders', './homePage'
]);
let {log} = console;
async function hanldeHome(request, response) {
  let mainurl = request.url.slice(1);
  if (tools.validiateURL(mainurl)) {
    return await handler(request, response, mainurl);
  }
  tools.homePage(request, response);
}
async function handler(request, response, mainurl) {
  let soloPage, mainCode, singlePage;
  try {
    soloPage = await tools.readURL(mainurl);
    mainCode = await tools.filterOnlyCode(soloPage);
    if(mainCode[0] == undefined) {
      throw new Error('Unfortunate, Regex matched sololearn url but no code found');
    }
    singlePage = await tools.singlePaged(mainCode, soloPage, [request, response]);
  } catch (err) {
    log(err);
    tools.errorPageHandle(request, response, 404, {});
    return;
  }
  let found = (mainCode[0] != undefined);
  let statusCode = found ? 200 : 404;
  let content_type = "text/html";
  if (singlePage instanceof Array) {
    singlePage = singlePage[0];
    content_type = singlePage[1];
  }
  response.writeHead(statusCode, {
    "Content-type": content_type + "; charset=utf-8",
    ...tools.defaultHeaders
  });
  response.write(singlePage);
  response.end();

}
module.exports = hanldeHome;