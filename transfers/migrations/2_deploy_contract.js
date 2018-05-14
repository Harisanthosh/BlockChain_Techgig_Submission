// var Ratings = artifacts.require("./Rating.sol");
// var Transfers = artifacts.require("./SimpleTransfer.sol");

// module.exports = function(deployer) {
//   deployer.deploy(Ratings,['Star Wars', 'Avatar', 'Inception'], {gas: 6700000});
//   deployer.deploy(Transfers,1000, {gas: 6700000});
// };

var Alloy = artifacts.require("./AlphaAlloyCoin.sol");

module.exports = function(deployer) {
  deployer.deploy(Alloy,5700, {gas: 6700000});
};