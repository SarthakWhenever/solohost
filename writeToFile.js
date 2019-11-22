const fs = require('fs');

async function writeToFile(filename, body) {
	return await new Promise((res,rej)=>{
		fs.writeFile(filename, body , async function(err) {
			if(!err) return res("DONE");
			res(["Error", err]);
		});
	})
}

module.exports = writeToFile;