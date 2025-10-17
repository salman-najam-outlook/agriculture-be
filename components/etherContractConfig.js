require('dotenv').config();

var contractConfig = {
  contractProvider:
    process.env.CONTRACT_PROVIDER_URL ||
    "https://goerli.infura.io/v3/08796f4bf09842da943f9bdeac18c961",
  contractAddress:
    process.env.CONTRACT_ADDRESS || "0x326b8c460d516cbd96075663c3369d9e25583e84",
  INFURA_API_KEY: process.env.INFURA_API_KEY || "08796f4bf09842da943f9bdeac18c961",
  CONTRACT_NEWTORK: process.env.CONTRACT_NEWTORK || "goerli",
  OWNER_PUBLIC_KEY:
    process.env.OWNER_PUBLIC_KEY || "7ACb422831377775eEE33553367D6593805a5b6F",
  OWNER_PRIVATE_KEY:
    process.env.OWNER_PRIVATE_KEY ||
    "0x0babeabc2f895c03289340c1acdb13a2d35cb451b2131a5cb1ad111e5c83d2fb",
  ETHER_SCAN: process.env.ETHER_SCAN || "https://goerli.etherscan.io/tx",
};

var contractABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'string',
        name: 'serializedReportData',
        type: 'string',
      },
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'hashSerializedReportData',
        type: 'bytes32',
      },
    ],
    name: 'HashEvent',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    inputs: [],
    name: 'count',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'hash',
        type: 'bytes32',
      },
    ],
    name: 'fetchSerializedReportData',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'serializedReportData',
        type: 'string',
      },
    ],
    name: 'mapSerializedReportData',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];

module.exports = {
  contractConfig: contractConfig,
  contractABI: contractABI,
};
