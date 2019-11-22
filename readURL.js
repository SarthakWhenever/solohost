let tools = require('./importer')([
	['node-fetch','fetch']
]);

async function readURL (url) {
	let dat = await tools.fetch(url);
	return await dat.text();
}

module.exports = readURL;