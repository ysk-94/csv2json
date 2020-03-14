const fs = require('fs');
const stateData = require('./state.json');

const result = [];
const filename = 'input.csv';
const lf = '\n';
fs.readFile(filename, (err, data) => {
	if (err) throw err;

	let headers;
	const lines = data.toString().split(lf);
	lines.forEach((line, rowCount) => {
		if (rowCount === 0) {
			headers = line.split(',');
		} else if (rowCount > 0) {
			const data = {};
			const columns = line.split(',');
			columns.forEach((col, index) => {
				data[headers[index]] = col;
			});
			result.push(data);

			if (rowCount+1 === lines.length) {
				fs.writeFile('./result/result.json', JSON.stringify(result), (err) => {
					if (err) throw err;
					console.log('done✨');
				});
			}
		}
	});
});

