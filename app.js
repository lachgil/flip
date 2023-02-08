const provider = new ethers.providers.Web3Provider(window.ethereum)
await provider.send("eth_requestAccounts", []);

const signer = provider.getSigner()
const wallet = signer.getAddress()
const balance = await provider.getBalance(wallet)

console.log(ethers.utils.formatEther(balance))

async function submitBet() {
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
        '0xc0a7fdf3d7017ecacdd5c962fe2d6eeaac1f7e30',
        [
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "_betId",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "_betAmount",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint8",
                        "name": "_player1Choice",
                        "type": "uint8"
                    }
                ],
                "name": "addBet",
                "outputs": [],
                "stateMutability": "payable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "_betId",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "_betAmount",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint8",
                        "name": "_player2Choice",
                        "type": "uint8"
                    }
                ],
                "name": "placeBet",
                "outputs": [],
                "stateMutability": "payable",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "betCount",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "name": "bets",
                "outputs": [
                    {
                        "internalType": "address payable",
                        "name": "player1",
                        "type": "address"
                    },
                    {
                        "internalType": "address payable",
                        "name": "player2",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "betAmount",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint8",
                        "name": "player1Choice",
                        "type": "uint8"
                    },
                    {
                        "internalType": "uint8",
                        "name": "player2Choice",
                        "type": "uint8"
                    },
                    {
                        "internalType": "uint8",
                        "name": "coinTossResult",
                        "type": "uint8"
                    },
                    {
                        "internalType": "enum FlyFlip.State",
                        "name": "state",
                        "type": "uint8"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "getAllBets",
                "outputs": [
                    {
                        "components": [
                            {
                                "internalType": "address payable",
                                "name": "player1",
                                "type": "address"
                            },
                            {
                                "internalType": "address payable",
                                "name": "player2",
                                "type": "address"
                            },
                            {
                                "internalType": "uint256",
                                "name": "betAmount",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint8",
                                "name": "player1Choice",
                                "type": "uint8"
                            },
                            {
                                "internalType": "uint8",
                                "name": "player2Choice",
                                "type": "uint8"
                            },
                            {
                                "internalType": "uint8",
                                "name": "coinTossResult",
                                "type": "uint8"
                            },
                            {
                                "internalType": "enum FlyFlip.State",
                                "name": "state",
                                "type": "uint8"
                            }
                        ],
                        "internalType": "struct FlyFlip.Bet[]",
                        "name": "",
                        "type": "tuple[]"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            }
        ],
        signer
    );

    console.log("hi");
    console.log(contract);
    const betAmount = ethers.utils.parseEther(document.querySelector('#betAmount').value);
    const playerChoice = parseInt(document.querySelector('#playerChoice').value);
    const result = document.querySelector('#result');

    try {
        await contract.addBet(1, betAmount, playerChoice,{ value: betAmount });
        result.innerHTML = `Bet submitted with bet id 1.`;
    } catch (error) {
        result.innerHTML = `Error submitting bet: ${error.message}`;
    }
}

document.querySelector('#submitButton').addEventListener('click',function(event){
event.preventDefault()
    submitBet();
});