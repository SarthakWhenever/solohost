let tools = require('./importer')([
    './fexec'
]);

async function getSoloWinVal(prop, soloCodePage) {
	let slp = soloCodePage.split("\n");
	let finalVal;
	for(let line of slp) {
		line = line.trim();
		if(line.startsWith("window."+prop+" = ")) {
			finalVal = line.substr(7+prop.length+3);
			finalVal = tools.fexec(finalVal);
			break;
		}
	}
	return finalVal
}

module.exports = getSoloWinVal;