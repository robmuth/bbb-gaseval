var Verifier = artifacts.require("Verifier.sol");

module.exports = function(deployer) {
  return deployer.deploy(Verifier);
};
