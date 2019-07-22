var Timestamping = artifacts.require("./BBB_Usecase_Files_v1.sol");
var StringUtils = artifacts.require("./StringUtils.sol");

module.exports = function(deployer, network, accounts) {
  deployer.deploy(StringUtils);
  deployer.link(StringUtils, Timestamping);

  deployer.deploy(Timestamping, accounts[0], accounts[1], accounts[2], "https://examlp.com/index.rss", true);
};
