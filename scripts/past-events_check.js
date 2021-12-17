// valueChecker past events script
(async () => {
    try {  
        console.log('... past values of event Check(bool booleanValue) in blockchain logs...')
        
        const contractAddress = '0xD073C53d1C2706994C9Aa72106232DBe565923d1' //Ropsten
        //const contractAddress = '0xd9145CCE52D386f254917e481eB44e9943F39138' //JVM
        const contractName = 'valueChecker' // Change this for other contract
        // Make sure contract is compiled and artifacts are generated
        const artifactsPath = `localhost/valuechecker-lab/artifacts/${contractName}.json` // Change this for different path
        // The script needs the ABI which is generated from the compilation artifact
        const metadata = JSON.parse(await remix.call('fileManager', 'getFile', artifactsPath))
        
        var valueChecker = new web3.eth.Contract(metadata.abi, contractAddress)
        const accounts = await web3.eth.getAccounts()
        valueChecker.defaultAccount = accounts[0]
        //console.log('EOA address: ' + valueChecker.defaultAccount)
        
        const events = await valueChecker.getPastEvents('Check', {   
                filter: {/*from:  valueChecker.defaultAccount*/}, 
                fromBlock: 'earliest',
                toBlock: 'latest'
            })
        //console.log(events)
        events.forEach(element => console.log('Boolean result -> ' + element.returnValues['booleanValue']))

    }
    catch (e) {
        console.log(e)
    }
})()