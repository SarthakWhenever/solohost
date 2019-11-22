let tools = require('./importer')([
  './getSoloWinVal', './errorPageHandle'
])

async function singlePaged(codePages, soloCodePage, reqrep) {
  let lang = (await tools.getSoloWinVal('language', soloCodePage));
  if (lang != "web") {
    if (lang != undefined) {
      return [codePages[0], "text/plain"];
    } else {
      tools.errorPageHandle(...reqrep);
      return;
    }
  }
  let htmlCode = codePages[0];
  let cssCode = codePages[1];
  let jsCode = codePages[2];
  let headClose, htmlOpen, totalCode;
  headClose = htmlCode.indexOf("</head>");
  htmlOpen = headClose;
  totalCode = htmlCode;
  if (headClose == -1) {
    headClose = htmlCode.indexOf("<html>");
    htmlOpen = headClose;
    if (headClose == -1) {
      totalCode = "<html>" + htmlCode + "</html>";
      htmlOpen = 0;
    }
    htmlOpen += 6;
    totalCode = totalCode.substring(0, htmlOpen) + "<head></head>" + totalCode.substring(htmlOpen);
    htmlOpen += 6;
  }
  totalCode =
    `${totalCode.substring(0, htmlOpen)}<meta name="viewport" content="width=device-width, initial-scale=1">
<style id="style-from-editor">${cssCode}</style>
<script id="script-from-editor"> ${jsCode}</script>${totalCode.substring(htmlOpen)}`;
  return totalCode;
}

module.exports = singlePaged;