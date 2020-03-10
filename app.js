const fs = require('fs');
const stateData = require('./state.json');

const result = [];
fs.readFile('cds.csv', (err, data) => {
	if (err) throw err;

	const lines = data.toString().split('\r\n');
	lines.forEach((line, rowCount) => {
		if (rowCount > 0) {
			const columns = line.split(',');
			const data = {
				clientcd: columns[0],
				state: stateData[columns[1]],
				planCd: columns[2],
			};
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

