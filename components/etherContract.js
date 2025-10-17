var ethers = require('ethers');
var contractConfig = require('./etherContractConfig');
var contractABI = contractConfig.contractABI;
var contractAddress = contractConfig.contractConfig.contractAddress;
var CONTRACT_NEWTORK = contractConfig.contractConfig.CONTRACT_NEWTORK;
var INFURA_API_KEY = contractConfig.contractConfig.INFURA_API_KEY;
var OWNER_PRIVATE_KEY = contractConfig.contractConfig.OWNER_PRIVATE_KEY;
var OWNER_PUBLIC_KEY = contractConfig.contractConfig.OWNER_PUBLIC_KEY;

var _infuraProvider = null;
var _etherContract = null;
var _walletSigner = null;

function getInfuraProvider () {
  try{
    if (_infuraProvider) return _infuraProvider;
    _infuraProvider = new ethers.providers.InfuraProvider(
      CONTRACT_NEWTORK,
      INFURA_API_KEY
      );
      return _infuraProvider;
    } catch (err) {
      console.log("Error initialing infura provider", err)
    }
};

async function getWallet() {
  if (_walletSigner) return _walletSigner;
  var provider = getInfuraProvider();
  _walletSigner = new ethers.Wallet(OWNER_PRIVATE_KEY, provider);
  return _walletSigner;
};

module.exports = async function initializeEtherContract() {
  try {
    if (_etherContract) return _etherContract;

    var signer = await getWallet();
    _etherContract = new ethers.Contract(contractAddress, contractABI, signer);
    return _etherContract;
  } catch (e) {
    console.log('Error initializing contract', e);
  }
};
