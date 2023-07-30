import PropTypes from 'prop-types';
import React from 'react';

import './Welcome.css';
import BigButton from './BigButton';

const Welcome = (props) => {
  return (
    <div className='Welcome_Section'>
      <h1  className='Title'>Welcome To Skillverse</h1 >
      <p className='Introduction'>
        We are here to help you!
      </p>
      <BigButton onClick={props.monsterInputBtnFn}>READY!</BigButton>
      {/* <BigButton onClick={props.monsterOutputBtnFn}>Test Output</BigButton> */}
      <div className="space"></div>
      <div className="additional-content">
        <h2>Skillverse</h2>
        <p>The mission of Skillverse is to break down the barriers of centralized educational institutions and eliminate the monopoly of education certification by such institutions. It aims to provide equal access to high-quality educational resources and more scientifically recognized professional certifications for everyone.</p>

        <h2>Background</h2>
        <p>The graduation certificates issued by centralized educational institutions today may not always fully reflect an individual's professional and vocational capabilities in the industry. Possessing a certificate issued by a certain educational institution does not necessarily represent a true mastery of a particular field's professional skills. Moreover, many prestigious educational institutions are only open to a small portion of the world's population...</p>

        <h2>Government</h2>
        <p>In addition to the participation of team members in the development of the project, Skillverse will also adopt a DAO (Decentralized Autonomous Organization) governance model...</p>

        <h2>Tokenomics</h2>
        <p>The total token supply is 100 million tokens. 65% of the tokens will be distributed in batches to different categories of participants to support ecosystem development...</p>

        <h2>How do I participate in Skillverse?</h2>
        <p>Learners will have the opportunity to continuously earn airdropped tokens as rewards during their learning journey...</p>

        <h2>How can I benefit from Skillverse?</h2>
        <p>The platform will charge a certain percentage of service fees with each successful payment...</p>
      </div>
    </div>
  );
};

Welcome.propTypes = {
  monsterInputBtnFn: PropTypes.func,
  userConnected: PropTypes.bool
};

export default Welcome;
