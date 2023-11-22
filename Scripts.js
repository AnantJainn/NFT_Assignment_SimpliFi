async function main() {
    require('dotenv').config();
    const { ETH_NODE_URL, PRIVATE_KEY } = process.env;
    const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
    const web3 = createAlchemyWeb3(ETH_NODE_URL);
    const NFTABI = require('./nft.json');
    const POOLABI = require('./pool.json');

    const nftAddress = '0x3D3E15292eD867566C12f7081fC4d9825671Fba0';
    const poolAddress = '0x71AB8C2941C8526a8B08d85049F2f59cC53d09B7';
    const ownerAddress = '0x0A2222B3BC8827573322040a6347aF5aB828Cb4F';
    const nftContract = new web3.eth.Contract(NFTABI, nftAddress);
    const poolContract = new web3.eth.Contract(POOLABI, poolAddress);

    // const token = nftContract.methods.nextTokenId();
    // console.log("Ids is ", token);
    const amounts = "10000000000000000";
    // const id = 

    // const encodedFunctionCall = nftContract.methods.mint(ownerAddress, amounts).encodeABI();
    // console.log('encode', encodedFunctionCall);
    // const encodedFunctionCall1 = nftContract.methods.approve(poolAddress, 1).encodeABI();
    // console.log('encode', encodedFunctionCall1);
    const encodedFunctionCall2 = poolContract.methods.deposit(1).encodeABI();
    console.log('encode', encodedFunctionCall2);


    const gasLimit = 28964576;
    const gasPrice = web3.utils.toWei('110', 'gwei');


    const transaction = {
        from: "0xA3014F25945ae21119cecbea96056E826B6ae19B",
        to: poolAddress,
        data: encodedFunctionCall2,
        value: 0, // or any ETH amount if required
        gas: gasLimit,
        gasPrice: gasPrice
    };

    const signedTx = await web3.eth.accounts.signTransaction(transaction, PRIVATE_KEY);

    web3.eth.sendSignedTransaction(signedTx.rawTransaction, function (error, hash) {
        if (!error) {
            console.log("🎉 The hash of your transaction is: ", hash, "\n Check Alchemy's Mempool to view the status of your transaction!");
        } else {
            console.log("❗Something went wrong while submitting your transaction:", error)
        }
    });
}

main();
//0x7E4e870dFA620cc0ea2986dCe200822838ffbDf6