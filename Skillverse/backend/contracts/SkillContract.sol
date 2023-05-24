// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

// 处理AI返回的结果，并将结果返回给前端
contract SkillContract {
    // 设置Monster的技能initial
    struct Skill{
        uint skillID;
        uint skillLevel;
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

    // 测试，查看skills里的所有技能
    function getMonsterSkills(uint _monsterID) public view returns (Skill[] memory) {
        return monsters[_monsterID].skills;
    }


    // 添加新Monster
    function addMonster(uint _monsterID, string memory _monsterName) public {
        Monster storage newMonster = monsters[_monsterID];
        newMonster.monsterID = _monsterID;
        newMonster.monsterName = _monsterName;
    }

    // 添加新Skill
    // 需要根据skillLevel进行sort
    function addSkill(uint _monsterID, uint _skillLevel, uint _skillID, string memory _skillDescription) public {
        Monster storage monster = monsters[_monsterID];
        monster.skills.push(Skill(_skillID, _skillLevel, _skillDescription, false));
    }

    // 学会skill
    function learnSkill(uint _monsterID, uint _skillID) public {
        // 找到该技能所属的Monster先
        // skillID不在Monster的skills范围内，失效
        Monster storage monster = monsters[_monsterID];
        require(_skillID < monster.skills.length, "Invalid skill id");
        
        // 再找到Monster里的具体skill，判定为true
        Skill storage skill = monster.skills[_skillID];
        skill.isLearned = true;
    }

}