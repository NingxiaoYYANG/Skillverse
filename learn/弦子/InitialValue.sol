// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

contract InitalValue{
    // Value variable initial
    // 用public变量的getter函数验证上面写的初始值是否正确
    bool public _bool; // false
    string public _string; // ""
    int public _int; // 0
    uint public _uint; // 0
    address public _address; // 0x0000000000000000000000000000000000000000

    enum ActionSet { Buy, Hold, Sell}
    ActionSet public _enum; // 第一个元素 0

    function fi() internal{} // internal空白方程 
    function fe() external{} // external空白方程 

    // Reference variable initial
    // 用public变量的getter函数验证上面写的初始值是否正确
    uint[8] public _staticArray; // 所有members设为其默认值的静态数组[0,0,0,0,0,0,0,0]
    uint[] public _dynamicArray; // `[]`
    mapping(uint => address) public _mapping; // 所有元素都为其默认值的mapping, 这里key为0，value为0x0000...
    // 所有成员设为其默认值的结构体 0, 0
    struct Student{
        uint256 id;
        uint256 score; 
    }
    Student public student;

    // delete
    // delete a会让变量a的值变为初始值
    bool public _bool2 = true; 
    function d() external {
        delete _bool2; // delete 会让_bool2变为默认值，false
    }

}