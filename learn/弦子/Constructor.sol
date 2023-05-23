// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

contract Constructor{
    // constructor: 是一种特殊的function,每个合约可以定义一个，并在部署合约的时候自动运行一次
    // 用来initial合约的一些参数

    address owner; // 定义owner变量

    constructor() {
      owner = msg.sender; // 在部署合约的时候，将owner设置为部署者的地址
    }

    // 修饰器（modifier）是solidity特有的语法
    // 定义modifier
    modifier onlyOwner {
      require(msg.sender == owner); // 检查调用者是否为owner地址
      _; // 如果是的话，继续运行函数主体；否则报错并revert交易
    }

    // 代有onlyOwner修饰符的函数只能被owner地址调用
    // 定义一个changeOwner函数，运行他可以改变合约的owner，但是由于onlyOwner修饰符的存在，只有原先的owner可以调用，别人调用就会报错
    function changeOwner(address _newOwner) external onlyOwner{
      owner = _newOwner; // 只有owner地址运行这个函数，并改变owner
    }

}