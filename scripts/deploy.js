// const { ethers } = require("hardhat");

// async function main() {
//   // Get the deployer's signer
//   const [deployer] = await ethers.getSigners();

//   console.log("Deploying NFTContract...");

//   // Deploy NFTContract
//   const NFTContract = await ethers.getContractFactory("NFTContract");
//   const nftContract = await NFTContract.deploy(); // Assuming the NFT price is 100 wei
//   // await nftContract.deploy();
//   console.log("NFTContract deployed to:", nftContract.address);

//   console.log("Deploying PoolContract...");

//   // Deploy PoolContract and pass NFTContract address as a constructor parameter
//   const PoolContract = await ethers.getContractFactory("PoolContract");
//   const poolContract = await PoolContract.deploy(
//     nftContract.address,
//   );
//   await poolContract.deployed();
//   console.log("PoolContract deployed to:", poolContract.address);
// }

// main()
//   .then(() => process.exit(0))
//   .catch((error) => {
//     console.error(error);
//     process.exit(1);
//   });



// Import ethers from Hardhat package
const { ethers } = require("hardhat");

async function main() {
  // Retrieve accounts from the local node
  const accounts = await ethers.getSigners();
  const deployer = accounts[0];

  console.log("Deploying contracts with the account:", deployer.address);

  // Deploy NFTContract
  const NFTContract = await ethers.getContractFactory("NFTContract");
  const nftContract = await NFTContract.deploy();
  await nftContract.deployTransaction.wait(); // Wait for the transaction to be mined

  console.log("NFTContract deployed to:", nftContract.address);

  // Deploy PoolContract
  // const PoolContract = await ethers.getContractFactory("PoolContract");
  // const poolContract = await PoolContract.deploy(nftContract.address);
  // await poolContract.deployed();

  // console.log("PoolContract deployed to:", poolContract.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
