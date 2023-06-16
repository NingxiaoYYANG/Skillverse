import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

import './Welcome.css';
import BigButton from './BigButton';

const Welcome = (props) => {
  return (
    <div className='Welcome_Section'>
      <b className='Title'>Welcome To Skillverse</b>
      <br />
      <b className='Introduction'>We are here to help you!</b>
      <br />
      <Link to="/monster">
        <BigButton>READY!</BigButton>
      </Link>
      <Link to="/monster-output">
        <BigButton>Output</BigButton>
      </Link>
    </div>
  );
};

Welcome.propTypes = {
  monsterPageFn: PropTypes.func,
  monsterOutputBtn: PropTypes.func
};

export default Welcome;
