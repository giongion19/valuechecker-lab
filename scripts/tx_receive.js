(async () => {
    try { 
        console.log('receive...')
        
        const contractAddress = '0xc3dfbf2624c1CCaAE7218958e4b5D76928503691' //Ropsten
        //const contractAddress = '0xD7ACd2a9FD159E69Bb102A1ca21C9a3e3A5F771B' //JVM
        const contractName = 'valueChecker' // Change this for other contract
        // Make sure contract is compiled and artifacts are generated
        const artifactsPath = `localhost/valuechecker-lab/artifacts/${contractName}.json` // Change this for different path
        // The script needs the ABI which is generated from the compilation artifact
        const metadata = JSON.parse(await remix.call('fileManager', 'getFile', artifactsPath))
        
        var valueChecker = new web3.eth.Contract(metadata.abi, contractAddress) // creates a contract instance
        const accounts = await web3.eth.getAccounts() // retrieves accounts from the personal wallet
        valueChecker.defaultAccount = accounts[0] // sets the default "from" account
        console.log('EOA "from" address: ', valueChecker.defaultAccount)
        
        // sends "value" ether to the receive() function of the contract
        const receipt = await web3.eth.sendTransaction({ 
            from: valueChecker.defaultAccount, 
            to: contractAddress, 
            value: '4000' })
        //console.log(receipt) 

        // catches the log from the TX receipt generated by web3.eth.sendTransaction
        console.log('Logs data init ...')
        console.log('from: ' + receipt.logs[0].address)
        console.log('amount: ' + parseInt(receipt.logs[0].data))
        //console.log('topic_0: ', receipt.logs[0].topics[0])
        //console.log('topic_1: ', receipt.logs[0].topics[1])
        console.log('... logs data end') 
        
        web3.eth.getBalance(contractAddress)
        .then(balance => console.log('Contract\'s new balance: ' + balance)) //retrieves and prints the new contract's balance
    }
    catch (e) {
        console.log(e)
    }
})()