import PropTypes from 'prop-types';
import { useEffect, useState } from "react";
import React from 'react';

const Monster = (props) => {
  const [monster, setMonster] = useState(null);
  const [contract, setContract] = useState(null);
  const [id, setId] = useState(null);

  useEffect(() => {
    const fetchMonsterDetails = async () => {
      if (!contract) {
        return;
      }

      try {
        const monsterDetails = await contract.methods.monsters(id).call();
        setMonster(monsterDetails);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMonsterDetails();
  }, [id, contract]);

  if (!monster) {
    return null;
  }


  return (
    <div className="monster">
      <ul>
        <li>ID: {monster.monsterID}</li>
        <li>Name: {monster.monsterName}</li>
        <li>Skills: {monster.skills.map((skill) => skill.skillID).join(", ")}</li>
      </ul>
    </div>
  );
}

export default Monster;

Monster.propTypes = {
  setId: PropTypes.func,
  setContract: PropTypes.func,
};
