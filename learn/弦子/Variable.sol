// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

contract Variable{
    // 数组（array），结构体（struct）和映射（mapping），这类变量占空间大，赋值时候直接传递地址（类似指针）
    // storage：合约里的状态变量默认都是storage，存储在链上。
    uint[] x = [1,2,3]; // 状态变量：数组 x

    function fStorage() public{
        //声明一个storage的变量 xStorage，指向x。修改xStorage也会影响x
        uint[] storage xStorage = x;
        xStorage[0] = 100;
    }

    // memory：函数里的参数和临时变量一般用memory，存储在内存中，不上链。
    // memory赋值给memory，会创建引用，改变新变量会影响原变量
    function fMemory() public view{
        //声明一个Memory的变量xMemory，复制x。修改xMemory不会影响x
        uint[] memory xMemory = x;
        xMemory[0] = 100;
        xMemory[1] = 200;
        uint[] memory xMemory2 = x;
        xMemory2[0] = 300;
    }

    // calldata：和memory类似，存储在内存中，不上链。与memory的不同点在于calldata变量不能修改（immutable）
    function fCalldata(uint[] calldata _x) public pure returns(uint[] calldata){
        //参数为calldata数组，不能被修改
        // _x[0] = 0 //这样修改会报错
        return(_x);
    }

    // variable的三种作用
    // state variable：状态变量是数据存储在链上的变量，所有合约内函数都可以访问 ，gas消耗高
    uint public x1 = 1;
    uint public y;
    string public z;
    function foo() external{
        // 可以在函数里更改状态变量的值
        x1 = 5;
        y = 2;
        z = "0xAA";
    }

    // local variable：局部变量是仅在函数执行过程中有效的变量，函数退出后，变量无效。局部变量的数据存储在内存里，不上链，gas低
    function bar() external pure returns(uint){
        uint xx = 1;
        uint yy = 3;
        uint zz = xx + yy;
        return(zz);
    }

    // global variable：全局变量是全局范围工作的变量，都是solidity预留关键字，可以在函数内不声明直接使用
    function global() external view returns(address, uint, bytes memory){
        address sender = msg.sender;
        uint blockNum = block.number;
        bytes memory data = msg.data;
        return(sender, blockNum, data);
    }

    // 常用global variable
        // blockhash(uint blockNumber): (bytes32)给定区块的哈希值 – 只适用于256最近区块, 不包含当前区块。
        // block.coinbase: (address payable) 当前区块矿工的地址
        // block.gaslimit: (uint) 当前区块的gaslimit
        // block.number: (uint) 当前区块的number
        // block.timestamp: (uint) 当前区块的时间戳，为unix纪元以来的秒
        // gasleft(): (uint256) 剩余 gas
        // msg.data: (bytes calldata) 完整call data
        // msg.sender: (address payable) 消息发送者 (当前 caller)
        // msg.sig: (bytes4) calldata的前四个字节 (function identifier)
        // msg.value: (uint) 当前交易发送的wei值

}