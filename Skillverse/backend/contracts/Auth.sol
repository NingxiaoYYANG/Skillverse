// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

//Connect/Disconnect wallet
contract Auth {

    address payable public owner;

    event Withdrawal(uint amount, uint when);

    constructor() payable {
        owner = payable(msg.sender);
    }


    function connect() public {
    
    }

    function disconnect() public {
    
    }
}

