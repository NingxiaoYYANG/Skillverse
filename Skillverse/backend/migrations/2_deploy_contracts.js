const Contacts = artifacts.require("./contracts/SkillContract.sol");

module.exports = function (deployer) {
    deployer.deploy(Contacts);
};