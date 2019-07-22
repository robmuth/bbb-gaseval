var VotingWithERC20Token = artifacts.require("./VotingWithERC20Token.sol");

module.exports = (deployer, network, accounts) => {
	let voting;

	let gasPerTransfer = 0, gasVoting = 0;

	return VotingWithERC20Token.deployed().then((contract) => {
		voting = contract;

		return voting.transfer(accounts[1], 50, { from: accounts[0] });
	})
	.then(() => {
		return voting.transfer.estimateGas(accounts[1], 50);
	})
	.then((gas) => {
		gasPerTransfer = gas;
		return voting.vote.estimateGas(0, 1, { from: accounts[1] });
	})
	.then((gas) => {
		gasVoting = gas;
		console.log("Gas per vote: " + (gasPerTransfer + (gasVoting / 1)));
	});
};
