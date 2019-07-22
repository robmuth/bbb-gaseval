var Verifier = artifacts.require("Verifier");
var Voting = artifacts.require("Voting");

module.exports = async function(deployer) {
  let verifier = await Verifier.deployed();

  return deployer.deploy(
  	Voting,
  	verifier.address,
  	8
  )
};
