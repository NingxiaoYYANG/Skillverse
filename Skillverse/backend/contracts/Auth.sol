// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

//Connect/Disconnect wallet
contract Auth {

    address payable public owner;

    constructor() {
        //set the only owner
        owner = payable(msg.sender);
    }

    modifier isOwner() {
        // Check if it is the owner
        require(msg.sender == owner, "Caller is not owner");
        _;
    }

    receive() external payable {}

    function withdraw(uint amount) public payable isOwner returns (bool) {
        //isOwner
        require(amount < msg.sender.balance);
        owner.transfer(amount);
        return true;
    }

    //from user to provider
    function transfer() public {
    }

    function getBalance()  public view isOwner returns (uint) {
        return address(this).balance;
    }

    //store all the existed users
    function storeAuth() private {
        
    }
}
