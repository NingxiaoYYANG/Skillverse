import PropTypes from 'prop-types';
import React from 'react';
import Button from '@mui/material/Button';
import './BigButton.css'; // Import the custom CSS file

const BigButton = (props) => {
  return (
    <Button
      sx={{ 
        fontsize: '20pt',
        borderRadius: '5px',
        border: 'none',
        padding: '20px 42px',
        textTransform: 'uppercase',
        cursor: 'pointer',
        color: '#fff',
      }}
      variant="contained"
      onClick={props.onClick}
      disabled={props.disabled}
      className={'btn'}
    >
      {props.children}
    </Button>
  );
};

BigButton.propTypes = {
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  children: PropTypes.string,
};

export default BigButton;
