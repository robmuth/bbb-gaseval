var VotingWithTokenCheckBulk = artifacts.require("./VotingWithTokenCheckBulk.sol");

module.exports = async (deployer) => {
	let voting = await VotingWithTokenCheckBulk.deployed();

	let privateTokens = [];
	let publicTokens = [];

	const salt = "ABCD1234";

	for(let i = 0; i < 50; i++) {
		let privateToken = await voting.generatePrivateToken.call(salt + i);
		let publicToken = await voting.generatePublicToken.call(privateToken);

		privateTokens = [...privateTokens, privateToken];
		publicTokens = [...publicTokens, publicToken];
	}

	let estimatedGasToken = await voting.addTokens.estimateGas(publicTokens);
	await voting.addTokens(publicTokens);


	let estimatedGasVoting = 0;

	for(let i = 0; i < 50; i++) {
		estimatedGasVoting += await voting.vote.estimateGas(i, privateTokens[i]);
	}

	console.log("Gas per vote: " + (estimatedGasToken + estimatedGasVoting) / 50);
};
