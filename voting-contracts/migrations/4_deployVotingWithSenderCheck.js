var VotingWithSenderCheck = artifacts.require("./VotingWithSenderCheck.sol");

module.exports = function(deployer) {
  deployer.deploy(VotingWithSenderCheck, 50);
};
