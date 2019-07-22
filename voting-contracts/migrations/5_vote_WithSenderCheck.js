var VotingWithSenderCheck = artifacts.require("./VotingWithSenderCheck.sol");

module.exports = async (deployer) => {
	let voting = await VotingWithSenderCheck.deployed();

	let estimatedGas = 0;

	for(let i = 0; i < 50; i++) {
		estimatedGas += await voting.vote.estimateGas(i);
	}

	console.log("Gas per vote: " + estimatedGas / 50);
};
