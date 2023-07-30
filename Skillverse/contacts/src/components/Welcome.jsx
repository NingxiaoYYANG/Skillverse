import PropTypes from 'prop-types';
import React from 'react';

import './Welcome.css';
import BigButton from './BigButton';

const Welcome = (props) => {
  return (
    <div className='Welcome_Section'>
      <h1  className='Title'>Welcome To Skillverse</h1 >
      <div className="intro">
        <h2>We are here to help you!</h2>
        <div className="space"></div>
        <h2>Are you ready to tell us some informatio about yourself? </h2>
      </div>
      <BigButton onClick={props.monsterInputBtnFn} disabled={!props.userConnected}>READY!</BigButton>
    </div>
  );
};

Welcome.propTypes = {
  monsterInputBtnFn: PropTypes.func,
  userConnected: PropTypes.bool
};

export default Welcome;
