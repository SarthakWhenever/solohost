
function importer (modules) {
	const tools = {};
	let modAlias;
	for(let mod of modules) {
		if(typeof mod == 'string') {
			modeAlias = mod.split("/").pop().split(".").shift();
			modeAlias = modeAlias.split(".");
			tools[modeAlias] = require(mod);
		}else if(mod.constructor.name == "Array") {
			tools[mod[1]+""] = require(mod[0]);
		}
	}
	return tools;
}

module.exports = importer;