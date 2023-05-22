// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

contract Constant{
    // constant 和 immutable
    // state variable声明这个两个关键字之后，不能在合约后更改数值, 并且还可以节省gas, 提升合约的安全性
    // 只有value variable可以声明constant和immutable
        // string和bytes可以声明为constant，但不能为immutable

    // constant: 必须在声明的时候initial，之后再也不能改变。尝试改变的话，编译不通过
    uint256 constant CONSTANT_NUM = 10;
    string constant CONSTANT_STRING = "0xAA";
    bytes constant CONSTANT_BYTES = "WTF";
    address constant CONSTANT_ADDRESS = 0x0000000000000000000000000000000000000000;

    // immutable: 可以在声明时或构造function中initial，因此更加灵活
    // immutable变量可以在constructor里initial，之后不能改变
    uint256 public immutable IMMUTABLE_NUM = 9999999999;
    address public immutable IMMUTABLE_ADDRESS;
    uint256 public immutable IMMUTABLE_BLOCK;
    uint256 public immutable IMMUTABLE_TEST;
    
    constructor(){
        IMMUTABLE_ADDRESS = address(this);
        IMMUTABLE_BLOCK = block.number;
        IMMUTABLE_TEST = test();
    }

    function test() public pure returns(uint256){
        uint256 what = 9;
        return(what);
    }

    // 合约中的ETH数量不适合用constant和immutable

}