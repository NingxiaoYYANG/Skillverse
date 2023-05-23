// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

// 处理AI返回的结果，并将结果返回给前端
contract SkillContract {
    // 设置Monster的技能initial
    struct Skill{
        uint skillID;
        string skillDescription;
        bool isLearned;
    }

    // 设置Monster的initial
    struct Monster{
        uint monsterID;
        string monsterName;
        Skill[] skills;
    }

    // key为monsterID，value为Monster
    // 创造一个map记录所有monsters
    // 其他合约可以通过指定怪物的 ID 来获取对应的 Monster
    mapping(uint => Monster) public monsters;

    // 添加新Monster
    function addMonster(uint _monsterID, string memory _monsterName) public {
        Monster storage newMonster = monsters[_monsterID];
        newMonster.monsterID = _monsterID;
        newMonster.monsterName = _monsterName;
    }

    // 添加新Skill
    function addSkill(uint _monsterID, uint _skillID, string memory _skillDescription) public {
        Monster storage monster = monsters[_monsterID];
        monster.skills.push(Skill(_skillID, _skillDescription, false));
    }

    // 判定是否学会skill
    // 需要更改
    function learnSkill(uint _monsterID, uint _skillID) public {
        Monster storage monster = monsters[_monsterID];
        for (uint i = 0; i < monster.skills.length; i++) {
            if (monster.skills[i].skillID == _skillID) {
                monster.skills[i].isLearned = true;
                break;
            }
        }
    }

}