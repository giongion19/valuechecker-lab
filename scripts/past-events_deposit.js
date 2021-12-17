// valueChecker events script
(async () => {
    try {  
        console.log('... past values of event Deposit(address indexed from, uint amount) in blockchain logs..')
        
        const contractAddress = '0xc3dfbf2624c1CCaAE7218958e4b5D76928503691' //Ropsten
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
        
        valueChecker.getPastEvents('Deposit', {   
                filter: {from:  valueChecker.defaultAccount}, 
                fromBlock: 'earliest'
            },  function(error, events){ 
                    events.forEach(element => console.log('Deposit originator: ' + element.returnValues['from'] +
                    ' --> amount: ' + element.returnValues['amount']))
                }
        )
    }
    catch (e) {
        console.log(e)
    }
})()