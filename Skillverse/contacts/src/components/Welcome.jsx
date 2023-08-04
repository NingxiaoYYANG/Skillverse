import PropTypes from 'prop-types';
import React from 'react';
import './Welcome.css'; // Import Welcome.css here if needed
import BigButton from './BigButton';

const Welcome = (props) => {
  return (
    <div className='Welcome_Section'>
      <h1 className='Title'>Welcome To Skillverse</h1>
      <div className="space"></div>
      <div className="intro">
        <h2 className="intro-heading">We are here to help you!</h2>
        <div className="space"></div>
        <h2 className="intro-heading">Are you ready to tell us some information about yourself? </h2>
        <div className="space"></div>
        <div className="space"></div>
      </div>
      <BigButton onClick={props.monsterInputBtnFn} disabled={!props.userConnected}>READY!</BigButton>
      <div className="space"></div>
      <div className="space"></div>
    </div>
  );
};

Welcome.propTypes = {
  monsterInputBtnFn: PropTypes.func,
  userConnected: PropTypes.bool
};

export default Welcome;
