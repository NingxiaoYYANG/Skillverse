// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

contract Value{
    // bool value
    bool public _bool = true;

    // bool operator
    bool public _bool1 = !_bool; //取非
    bool public _bool2 = _bool && _bool1; //与
    bool public _bool3 = _bool || _bool1; //或
    bool public _bool4 = _bool == _bool1; //相等
    bool public _bool5 = _bool != _bool1; //不相等

    // int value
    int public _int = -1; // 整数，包括负数
    uint public _uint = 1; // 正整数
    uint256 public _number = 20220330; // 256位正整数

    // int operator
    uint256 public _number1 = _number + 1; // +，-，*，/
    uint256 public _number2 = 2**2; // 指数 4
    uint256 public _number3 = 7 % 2; // 取余数 1
    bool public _numberbool = _number2 > _number3; // 比大小 

    // address value
    address public _address = 0x7A58c0Be72BE218B41C608b7Fe7C5bB630736C71;
    address payable public _address1 = payable(_address); // payable address，可以转账、查余额
    // 地址类型的成员
    // payable的地址拥有balance和transfer()两个成员，方便查询ETH余额以及转账
    uint256 public balance = _address1.balance; // balance of address

    // long value
    // MiniSolidity变量以字节的方式存储进变量_byte32，转换成16进制为：0x4d696e69536f6c69646974790000000000000000000000000000000000000000
    // _byte变量存储_byte32的第一个字节，为0x4d
    bytes32 public _byte32 = "MiniSolidity"; 
    bytes1 public _byte = _byte32[0]; 
}