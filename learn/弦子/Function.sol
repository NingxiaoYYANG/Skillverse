// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

contract Function{
    uint256 public number = 5;
    // function <function name> (<parameter types>) {internal|external|public|private} [pure|view|payable] [returns (<return types>)]
    // (<parameter types>)：圆括号里写函数的参数，也就是要输入到函数的变量类型和名字
    // {internal|external|public|private}：没标明函数类型的，默认internal
        // public: 内部外部均可见。(也可用于修饰状态变量，public变量会自动生成 getter函数，用于查询数值)
        // private: 只能从本合约内部访问，继承的合约也不能用（也可用于修饰状态变量）
        // external: 只能从合约外部访问（但是可以用this.f()来调用，f是函数名）
        // internal: 只能从合约内部访问，继承的合约可以用（也可用于修饰状态变量）
    
    // internal
    function minus() internal {
        number = number - 1;
    }
    // 合约内的函数可以调用内部函数 external
    function minusCall() external {
        minus();
    }

    // [pure|view|payable]：决定函数权限/功能的关键字
        // payable（可支付的): 带着它的函数，运行的时候可以给合约转入ETH
        // 合约中非pure/view函数调用它们则会改写链上状态，需要付gas
        // pure: 不能读取也不能写入存储在链上的状态变量
        // view: 能读取但也不能写入状态变量
        
    // default 能读能写
    function add() external{
        number = number + 1;
    }

    // pure
    function addPure(uint256 _number) external pure returns(uint256 new_number){
        new_number = _number+1;
    }

    // view
    function addView() external view returns(uint256 new_number) {
        new_number = number + 1;
    }

    // payable: 递钱，能给合约支付eth的函数
    function minusPayable() external payable returns(uint256 balance) {
        minus();
        balance = address(this).balance;
    }
}