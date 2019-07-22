var VotingWithTokenCheckBulk = artifacts.require("./VotingWithTokenCheckBulk.sol");

module.exports = function(deployer) {
  deployer.deploy(VotingWithTokenCheckBulk, 50);
};
