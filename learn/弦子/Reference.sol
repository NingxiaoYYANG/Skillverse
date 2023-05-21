// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

contract Reference{
    // Array: 数组（Array）是solidity常用的一种变量类型，用来存储一组数据（整数，字节，地址等等）
    // 固定长度数组：在声明时指定数组的长度。用T[k]的格式声明，其中T是元素的类型，k是长度
    uint[8] array1;
    bytes1[5] array2;
    address[100] array3;
    
    // 可变长度数组（动态数组）：在声明时不指定数组的长度。用T[]的格式声明，其中T是元素的类型，例如（bytes比较特殊，是数组，但是不用加[]）
    uint[] array4;
    bytes1[] array5;
    address[] array6;
    bytes array7;

    // memory动态数组: 可以用new操作符来创建，但是必须声明长度，并且声明后长度不能改变
    // 需要一个一个元素的赋值
    uint[] array8 = new uint[](5);
    bytes array9 = new bytes(9);
    function foo(uint[] memory array10) public view{}
    // 数组字面常数(Array Literals)是写作表达式形式的数组，用方括号包着来初始化array的一种方式，并且里面每一个元素的type是以第一个元素为准的
    // 例如[1,2,3]里面所有的元素都是uint8类型，
    // 因为在solidity中如果一个值没有指定type的话，默认就是最小单位的该type，这里int的默认最小单位类型就是uint8

    // Array member:
        // length: 数组有一个包含元素数量的length成员，memory数组的长度在创建后是固定的。
        // push(): 动态数组和bytes拥有push()成员，可以在数组最后添加一个0元素。
        // push(x): 动态数组和bytes拥有push(x)成员，可以在数组最后添加一个x元素。
        // pop(): 动态数组和bytes拥有pop()成员，可以移除数组最后一个元素

    // Struct
    struct Student{
        uint256 id;
        uint256 score; 
    }

    Student student; // 初始一个student结构体

    //  struct赋值
    // 方法1:在function中创建一个storage的struct引用
    function initStudent1() external{
        Student storage _student = student; // assign a copy of student
        _student.id = 11;
        _student.score = 100;
    }

    // 方法2:直接引用state variable的struct
    function initStudent2() external{
        student.id = 1;
        student.score = 80;
    }

}