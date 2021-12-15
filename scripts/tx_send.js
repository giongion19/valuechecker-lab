// valueChecker matcher() script
(async () => {
    try {  
        console.log('send ...')

        const contractAddress = '0xc3dfbf2624c1CCaAE7218958e4b5D76928503691' //Ropsten
        //const contractAddress = '0xd9145CCE52D386f254917e481eB44e9943F39138' //JVM
        const contractName = 'valueChecker' // Change this for other contract
        // Make sure contract is compiled and artifacts are generated
        const artifactsPath = `localhost/valuechecker-lab/artifacts/${contractName}.json` // Change this for different path
        // The script needs the ABI which is generated from the compilation artifact
        const metadata = JSON.parse(await remix.call('fileManager', 'getFile', artifactsPath))
        
        let contract = new web3.eth.Contract(metadata.abi, contractAddress)
        const accounts = await web3.eth.getAccounts()
        contract.defaultAccount = accounts[0]
        console.log('EOA "from" address: ' + contract.defaultAccount)
        
        const value = 2
        const estimatedGas = await contract.methods.Matcher(value).estimateGas()
        console.log('estimated gas consumption: ' + estimatedGas)
      
        const receipt = await contract.methods.Matcher(value).send({ 
            from: contract.defaultAccount, 
            gas: estimatedGas })
        //console.log(receipt)
        console.log('event_style_result: ' + receipt.events.Check.returnValues['booleanValue'])
        console.log('log_style_result: ' + receipt.events.Check.raw['data'])
    }
    catch (e) {
        console.log(e)
    }
})()