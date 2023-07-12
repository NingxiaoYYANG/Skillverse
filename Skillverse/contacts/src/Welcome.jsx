import PropTypes from 'prop-types';
import React from 'react';
import BigButton from './components/BigButton';
import App from './App';

import './Welcome.css';

const Welcome = (props) => {

  return (
    <div className='Welcome_Section'>
          {App.userWalletAddress ? (
            <>
              <b className='Title'>Welcome To Skillverse</b>
              <br />
              <b className='Introduction'>We are here to help you!</b>
              <br />
              <BigButton onClick={props.monsterPageFn}>READY!</BigButton>
            </>
          ): (
            <>
              <BigButton onClick={App.loginWithEth}>Login with Ethereum</BigButton>
            </>
          )}
    </div>
  )
};


export default Welcome;

Welcome.propTypes = {
  monsterPageFn: PropTypes.func
};
