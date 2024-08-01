require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */

const ALCHEMY_SEPOLIA_URL = process.env.ALCHEMY_SEPOLIA_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
module.exports = {
  solidity: "0.8.24",
  networks: {
    hardhat: {
      chainId: 1337
    },
    sepolia: {
      url: ALCHEMY_SEPOLIA_URL,
      accounts: [PRIVATE_KEY] // it is required to sign transactions
    }
  },
  paths: {
    artifacts: "./client/src/artifacts", // I want the artifacts to be created in the client folder after deployment
  }
};
