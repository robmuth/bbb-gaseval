var Timestamping = artifacts.require("./BBB_Usecase_Files_v1.sol");

module.exports = function(deployer, network, accounts) {
  return Timestamping.deployed().then((contract) => {
  	let gas = contract.newFile.estimateGas("ABC123", "Nobody", "https://example.com/1", "0xFFd929C7d765336277F20eFBfdD223A153424045", {from: accounts[2]});
  	contract.newFile("ABC123", "Nobody", "https://example.com/1", "0xFFd929C7d765336277F20eFBfdD223A153424045", {from: accounts[2]});

  	return gas;
  }).then((gas) => {
  	console.log("Estimated Gas: " + gas);
  });
};
