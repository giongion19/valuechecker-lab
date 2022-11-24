// valueChecker matcher() script
(async () => {
    try {  
        console.log('send ...')
        const contractAddress = '0x33d0757f85ad28E865406B605F226e186e2F61C5' //Goerli
        //const contractAddress = '0xD073C53d1C2706994C9Aa72106232DBe565923d1' //Ropsten
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
        
        const value = 20
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