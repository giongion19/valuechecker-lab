// valueChecker events script
(async () => {
    try {  
        console.log('... past values of event Deposit(address indexed from, uint amount) in blockchain logs..')
        const contractAddress = '0x33d0757f85ad28E865406B605F226e186e2F61C5' //Goerli
        //const contractAddress = '0xD073C53d1C2706994C9Aa72106232DBe565923d1' //Ropsten
        //const contractAddress = '0xD4Fc541236927E2EAf8F27606bD7309C1Fc2cbee' //JVM
        const contractName = 'valueChecker' // Change this for other contract
        // Make sure contract is compiled and artifacts are generated
        const artifactsPath = `localhost/valuechecker-lab/artifacts/${contractName}.json` // Change this for different path
        // The script needs the ABI which is generated from the compilation artifact
        const metadata = JSON.parse(await remix.call('fileManager', 'getFile', artifactsPath))
        
        var valueChecker = new web3.eth.Contract(metadata.abi, contractAddress)
        const accounts = await web3.eth.getAccounts()
        valueChecker.defaultAccount = accounts[0]
        //console.log('EOA address: ' + valueChecker.defaultAccount)
        
        const events = await valueChecker.getPastEvents('Deposit', {   
                filter: {originator:  valueChecker.defaultAccount}, 
                fromBlock: 'earliest'
        })
        //console.log(events)
        events.forEach(element => console.log('Deposit originator: ' + element.returnValues['originator'] +
        ' --> amount: ' + element.returnValues['amount']))
    }
    catch (e) {
        console.log(e)
    }
})()