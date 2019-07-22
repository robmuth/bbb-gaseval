var SimpleVoting = artifacts.require("./SimpleVoting.sol");

module.exports = async (deployer) => {
	let voting = await SimpleVoting.deployed();

	let votings = [];

	let estimatedGas = 0;

	for(let i = 0; i < 50; i++) {
		estimatedGas += await voting.vote.estimateGas(i);
	}

	console.log("Gas per vote: " + estimatedGas / 50);
};
