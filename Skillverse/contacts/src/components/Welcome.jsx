import PropTypes from 'prop-types';
import React from 'react';

import './Welcome.css';
import BigButton from './BigButton';

const Welcome = (props) => {
  return (
    <div className='Welcome_Section'>
      <b className='Title'>Welcome To Skillverse</b>
      <br />
      <b className='Introduction'>We are here to help you!</b>
      <br />
      <BigButton onClick={props.monsterInputBtnFn} disabled={!props.userConnected}>READY!</BigButton>
    </div>
  );
};

Welcome.propTypes = {
  monsterInputBtnFn: PropTypes.func,
  userConnected: PropTypes.bool
};

export default Welcome;
