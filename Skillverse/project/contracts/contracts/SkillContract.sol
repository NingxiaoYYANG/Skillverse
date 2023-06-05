// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./ownable.sol";

// 处理AI返回的结果，并将结果返回给前端
contract SkillContract is Ownable{

    // 监听事件给前端
    event NewMonster(uint id, string name);

    // 设置Monster的技能initial
    struct Skill{
        uint skillID;
        uint32 skillPoint;
        uint32 skillLevel;
        uint32 skillDependent;
        string skillDescription;
        bool isLearned;
    }

    // 设置Monster的initial
    struct Monster{
        uint monsterID;
        string monsterName;
        Skill[] skills;
    }

    // 创造一个array记录所有monsters
    Monster[] public monsters;

    // 记录怪物ID拥有者的地址
    mapping(uint => address) public monsterToOwner;

    // 记录某地址拥有怪物的数量
    mapping(address => uint) ownerMonsterCount;

    // 测试，查看skills里的所有技能
    function getMonsterSkills(uint _monsterID) private view returns (Skill[] memory) {
        return monsters[_monsterID].skills;
    }

    // 添加新Monster
    function addMonster(uint _monsterID, string storage _monsterName) internal {
        Monster memory newMonster = Monster(_monsterID, _monsterName, new Skill[](0));
        uint id = monsters.length;
        monsters.push(newMonster);

        // 把生成的monster加进用户地址
        monsterToOwner[id] = msg.sender;
        ownerMonsterCount[msg.sender]++;

        // 检查用户有无重复生成相同的monster(待更新)
        // 检查所有的此用户的monster，是否有重复名字
        for (uint id = 0; monsterToOwner[id] == msg.sender; id++) {
            require( keccak256(abi.encodePacked(_monsterName)) != keccak256(abi.encodePacked(monsters[id].monsterName)),
                 "Monster with the same name already exists under the same owner.");
        }
        // 用户最多生成5个monsters
        require(ownerMonsterCount[msg.sender] <= 5);
        

        
        emit NewMonster(_monsterID, _monsterName);
    }

    // 添加新Skill
    function addSkill(uint _monsterID, uint32 _skillLevel, uint _skillID, uint32 _skillPoint, uint32 _skillDependent, string storage _skillDescription) internal {
        Monster storage monster = monsters[_monsterID];
        monster.skills.push(Skill(_skillID, _skillLevel,  _skillPoint,  _skillDependent, _skillDescription, false));
    }

    // 学会skill
    function learnSkill(uint _monsterID, uint _skillID) private {
        // 找到该技能所属的Monster先
        // skillID不在Monster的skills范围内，失效
        Monster storage monster = monsters[_monsterID];
        require(_skillID < monster.skills.length, "Invalid skill id");
        
        // 再找到Monster里的具体skill，判定为true
        Skill storage skill = monster.skills[_skillID];
        skill.isLearned = true;
    }

    // 查看用户全部monsters
    function getMonstersByOwner(address _owner) external view returns (uint[] memory) {
        uint[] memory result = new uint[](ownerMonsterCount[_owner]);
        uint counter = 0;
        for (uint i = 0; i < monsters.length; i++) {
            if (monsterToOwner[i] == _owner) {
                result[counter] = i;
                counter++;
            }
        }
        return result;
    }

}