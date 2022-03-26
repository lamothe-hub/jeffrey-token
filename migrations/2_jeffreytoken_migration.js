const JTOwner = artifacts.require("JeffreyToken");
module.exports = function (deployer) {
  deployer.deploy(JTOwner, "JeffreyToken", "JEFF");
};
