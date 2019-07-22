const fs = require("fs");

if(process.argv.length != 3) {
	console.log("Missing file ...");
	process.exit(1);
}

let migrationName = null;
let deployCost = 0;
let voteCost = 0;

let filename = process.argv[2];
fs.readFile(filename, "utf8", (err, lines) => {
	if(err) throw err;

	console.log("order,type,deployCost,votingCost,sumCost");

	let order = 0;

	lines.split(/\r?\n/).map((line) => {
		let matchScriptName = line.match(/^[0-9]+_([A-Za-z0-9_]+)[.]js$/);
		
		if(matchScriptName) {
			let matchDeploy = matchScriptName[1].match(/^deploy([A-Za-z0-9_]+)$/);

			if(migrationName && matchDeploy) {
				if(migrationName.match(/^vote_.*/))
					console.log(order++ + "," + migrationName + "," + deployCost + "," + voteCost + "," + (deployCost + voteCost));

				deployCost = null;
				voteCost = null;
			}

			migrationName = matchScriptName[1];
		}

		let matchTotalCost = line.match(/^.*gas used:[^0-9]*([0-9]+)$/);
		if(matchTotalCost) {
			deployCost = matchTotalCost[1];
		}

		let matchVoteCost = line.match(/^Gas per vote: ([0-9.]+)$/);
		if(matchVoteCost) {
			voteCost = matchVoteCost[1];
		}
	});

	if(migrationName && migrationName.match(/^vote_.*/)) {
		console.log(order++ + "," + migrationName + "," + deployCost + "," + voteCost);
	}
});