const JeffreyToken = artifacts.require("JeffreyToken");
module.exports = function (deployer) {
  deployer.deploy(JeffreyToken, "JeffreyToken", "JEFF");
};
