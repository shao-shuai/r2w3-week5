const ethers = require("ethers")
const fs = require("fs-extra")
require("dotenv").config()

const API_KEY = process.env.API_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY
const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
const GOERLI_CONTRACT_ADDRESS = "0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e"
const VRF_CONTRACT_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"

const contract = require("../artifacts/@chainlink/contracts/src/v0.6/tests/MockV3Aggregator.sol/MockV3Aggregator.json")
const vrf_contract = require("../artifacts/@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol/VRFConsumerBaseV2.json")
// Provider
const localProvider = new ethers.providers.JsonRpcProvider("http://localhost:8545")
const alchemyProvider = new ethers.providers.AlchemyProvider((network = "goerli"), API_KEY)

// Signer
const signer = new ethers.Wallet(PRIVATE_KEY, localProvider)
const goerli_signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider)

// Contract
const vrf = new ethers.Contract(VRF_CONTRACT_ADDRESS, vrf_contract.abi, signer)
const simpleStorege = new ethers.Contract(CONTRACT_ADDRESS, contract.abi, signer)
const priceFeed = new ethers.Contract(GOERLI_CONTRACT_ADDRESS, contract.abi, goerli_signer)

async function main() {
    console.log(vrf)
    // console.log(`Price is ${price}`)
    // console.log(`Latest timestamp is ${simpleStorege.latestTimestamp()}`)

    // const message = await simpleStorege.retrieve()
    // console.log("The original value is: " + message)

    // const message2 = await daiContract.name()
    // console.log("The message from mainnet is: " + message2)

    // const bal = await daiContract.balanceOf("tangping.eth")
    // console.log(ethers.utils.formatUnits(bal, 18))

    // const newStore = await simpleStorege.store(2560);
    // await newStore.wait();

    // const newMessage = await simpleStorege.retrieve();
    // console.log("The new value is: " + newMessage);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
