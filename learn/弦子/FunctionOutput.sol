// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

contract FunctionOutput{

    // returns加在函数名后面，用于声明返回的变量类型及变量名；
    // return用于函数主体中，返回指定的变量
    
    // 返回多个变量
    function returnMultiple() public pure returns(uint256, bool, uint256[3] memory){
            return(1, true, [uint256(1),2,5]);
        }
    
    // 在returns中标明返回变量的名称，会自动给这些变量初始化，并且自动返回这些函数的值，不需要加return
    function returnNamed() public pure returns(uint256 _number, bool _bool, uint256[3] memory _array){
        _number = 2;
        _bool = false; 
        _array = [uint256(3),2,1];
    }

    // 读取所有返回值：声明变量，并且将要赋值的变量用,隔开，按顺序排列
    function readReturn() public pure{
        uint256 _number;
        bool _bool;
        uint256[3] memory _array;
        (_number, _bool, _array) = returnNamed();
    }

}