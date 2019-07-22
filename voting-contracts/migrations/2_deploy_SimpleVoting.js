var SimpleVoting = artifacts.require("./SimpleVoting.sol");

module.exports = function(deployer) {
  deployer.deploy(SimpleVoting, 50);
};
