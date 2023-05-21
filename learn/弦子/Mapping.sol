// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

contract Mapping{
    // 通过键（Key）来查询对应的值（Value），比如：通过一个人的id来查询他的钱包地址
    // 声明映射的格式为mapping(_KeyType => _ValueType)，其中_KeyType和_ValueType分别是Key和Value的变量类型
    mapping(uint => address) public idToAddress; // id映射到地址
    mapping(address => address) public swapPair; // 币对的映射，地址到地址

    // 规则1：映射的_KeyType只能选择solidity默认的类型，比如uint，address等，不能用自定义的结构体
    // _ValueType可以使用自定义的类型
        // 我们定义一个结构体 Struct
    struct Student{
        uint256 id;
        uint256 score; 
    }
    mapping(uint => Student) public testVar;

    // 规则2：mapping的存储位置必须是storage，因此可以用于合约的state variable，function中的storage变量，和library函数的参数
    // 不能用于public函数的参数或返回结果中，因为mapping记录的是一种关系 (key - value pair)

    // 规则3：如果mapping声明为public，那么solidity会自动给你创建一个getter函数，可以通过Key来查询对应的Value

    // 规则4：给mapping新增的键值对的语法为_Var[_Key] = _Value，其中_Var是mapping变量名，_Key和_Value对应新增的键值对
    function writeMap (uint _Key, address _Value) public{
        idToAddress[_Key] = _Value;
    }

    // 原理1: mapping不储存任何键（Key）的话，就没有length

    // 原理2: mapping使用keccak256(key)当成offset存取value
    // Solidity会使用keccak256哈希函数将键转换为一个256位的hash。然后，该hash被用作在存储器中存储和访问对应值的偏移量
    // 通过使用hash，mapping可以以高效的方式将键map到存储器中的特定位置

    // 原理3: 因为Ethereum会定义所有未使用的空间为0，所以未赋值（Value）的键（Key）初始值都是0

    // mapping不能存长度信息

}