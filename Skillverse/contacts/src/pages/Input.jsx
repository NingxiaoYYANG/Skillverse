import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BigButton from '../components/BigButton';
import PropTypes from 'prop-types';

const Input = (props) => {
  const [position, setPosition] = useState('');
  const [areaOfInterest, setAreaOfInterest] = useState('');
  const navigate = useNavigate();

  const handleInterestChange = (event) => {
    setAreaOfInterest(event.target.value);
  };

  const handlePositionChange = (event) => {
    setPosition(event.target.value);
    props.setUserInputFn(event.target.value);
    localStorage.setItem('userInput', event.target.value);
  };

  const getPositions = () => {
    // Handle getting positions based on area of interest
    // TO-DO
  };

  const getSkillInfos = () => {
    navigate(`/monster-output`);
  };

  return (
    <div className="app">
      <section className="input-container">
        <div className="interest-input">
          <h1>What is your area of interest?</h1>
          <select value={areaOfInterest} onChange={handleInterestChange}>
            <option value="">Select an option</option>
            <option value="Information Technology">Information Technology</option>
            <option value="Creative Arts">Creative Arts</option>
            <option value="Engineering">Engineering</option>
          </select>
          <BigButton id="confirm" onClick={getPositions}>
            Confirm
          </BigButton>
        </div>
        <br />
        <div className="position-input">
          <h1>What is your career goal?</h1>    
          <select value={position} onChange={handlePositionChange}>
            <option value="">Select an option</option>
            <option value="Frontend developer">Frontend developer</option>
            <option value="Backend developer">Backend developer</option>
            <option value="Game developer">Game developer</option>
          </select>
          <BigButton id="confirm" onClick={getSkillInfos}>
            Confirm
          </BigButton>
        </div>
      </section>
    </div>
  );
};

Input.protoTypes = {
    setUserInputFn: PropTypes.func
}

export default Input;
