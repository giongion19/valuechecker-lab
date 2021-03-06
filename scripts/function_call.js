(async () => {
    try {  
        console.log('call ...')

        const contractAddress = '0xD073C53d1C2706994C9Aa72106232DBe565923d1' //Ropsten
        //const contractAddress = '0xd9145CCE52D386f254917e481eB44e9943F39138' //JVM
        const contractName = 'valueChecker' // Change this for other contracts
        // Make sure contract is compiled and artifacts are generated
        const artifactsPath = `localhost/valuechecker-lab/artifacts/${contractName}.json` // Change this for different paths
        // The script needs the ABI which is generated from the compilation artifact
        const metadata = JSON.parse(await remix.call('fileManager', 'getFile', artifactsPath))
        
        let contract = new web3.eth.Contract(metadata.abi, contractAddress)
        const accounts = await web3.eth.getAccounts()
        contract.defaultAccount = accounts[0]
        console.log('EOA "from" address: ' + contract.defaultAccount)
        
        const value = 2
        const result = await contract.methods.Matcher(value).call({ 
            from: contract.defaultAccount }) 
        console.log('call_result: ' + result)
    }
    catch (e) {
        console.log(e)
    }
})()