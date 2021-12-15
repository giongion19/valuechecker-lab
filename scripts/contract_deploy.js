// valueChecker deploy() script
(async () => {
  try {
    console.log('deploy...')
    
    const contractName = 'valueChecker' // Change this for other contract
    // Make sure contract is compiled and artifacts are generated
    const artifactsPath = `localhost/valuechecker-lab/artifacts/${contractName}.json` // Change this for different path
    // The script needs the ABI which is generated from the compilation artifact
    const metadata = JSON.parse(await remix.call('fileManager', 'getFile', artifactsPath))
   
    let instance = new web3.eth.Contract(metadata.abi) // creates a contract instance
    
    const accounts = await web3.eth.getAccounts() // copies accounts from the wallet
    const fromAccount = accounts[0] // selects the 1st account as the "from EOA account" which generates TXs
    console.log('EOA address: '+ fromAccount)
  
    const constructorArgs = []    // Put constructor args (if any) here for your contract
    // Await async paradigm
    instance = instance.deploy({ // function to prepare contract deployment onto the blockchain
      data: metadata.data.bytecode.object, // contract's bytecode taken from the JSON artifact
      arguments: constructorArgs
    })
    const valueChecker = await instance.send({ // generates the contract creation TX 
      from: fromAccount,
      gas: 1500000,
      gasPrice: '20000000000'
    })
    console.log('Deployed contract\'s address: ' + valueChecker.options.address)
  } 
  catch (e) {
    console.log(e.message)
  }
})()