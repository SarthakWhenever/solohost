let tools = require('./importer')([
  './getSoloWinVal'
])

async function filterOnlyCode(soloCodePage) {
  let lang = (await tools.getSoloWinVal('language', soloCodePage));
  let code, cssCode, jsCode;

  try {
    code = await tools.getSoloWinVal('code', soloCodePage);
    cssCode = await tools.getSoloWinVal('cssCode', soloCodePage);
    jsCode = await tools.getSoloWinVal('jsCode', soloCodePage);
  } catch (err) {
    log(err)
  }
  let fCode = [code, cssCode, jsCode, lang];
  return fCode;
}
module.exports = filterOnlyCode;