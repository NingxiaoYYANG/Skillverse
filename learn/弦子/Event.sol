// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

contract Event{
    // Solidity中的事件（event）是EVM上日志的抽象，它具有两个特点
        // Response: 应用程序（ether.js）可以通过RPC接口订阅和监听这些事件，并在前端做响应
        // 经济：事件是EVM上比较经济的存储数据的方式，每个大概消耗2,000 gas；相比之下，链上存储一个新变量至少需要20,000 gas

    // event: 声明由event关键字开头，然后跟事件名称，括号里面写好事件需要记录的变量类型和变量名
    event Transfer(address indexed from, address indexed to, uint256 value);

    // indexed: 标记的variables可以理解为检索event的索引“键”，在以太坊上单独作为一个topic进行存储和索引
    // 每个event最多有3个带indexed的变量
    // 每个 indexed 变量的大小为固定的256 bits
    // event的哈希以及这三个带indexed的变量在EVM日志中通常被存储为topic
    // topic[0]是此事件的keccak256哈希，topic[1]到topic[3]存储了带indexed变量的keccak256哈希

}