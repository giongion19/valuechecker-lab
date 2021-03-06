// "SPDX-License-Identifier: UNLICENSED"
pragma solidity ^0.7.2;
contract valueChecker
{
    //state variables
    address payable public owner; 
    uint price = 10; 
    
    //contract events
    event Check(bool booleanValue); //logs the boolean result of the check
    event Deposit(address indexed originator, uint amount);
    
    constructor() {
       owner = msg.sender; //the contract creator becomes the contract owner
    }
  
    //checks if the input value is greater/equal than a baseline value 
    function Matcher (uint8 x) public returns (bool){
        if(x>=price){
            emit Check(true); 
            return true;
        }
        else {
            emit Check(false);
            return false;
        }
    }   
    
    // fallback function accepting any incoming amount
    receive () external payable {
		emit Deposit(msg.sender, msg.value);
	}

    // destoys the contract from the blockchain
    function destroy() external {
        require(msg.sender == owner); //only the owner can destroy the contract
        selfdestruct(owner); // system call: owner must be payable
    }
}