var VotingWithERC20Token = artifacts.require("./VotingWithERC20Token.sol");

module.exports = function(deployer) {
  deployer.deploy(VotingWithERC20Token, 50);
};
