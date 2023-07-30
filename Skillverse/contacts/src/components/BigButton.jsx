import PropTypes from 'prop-types';
import React from 'react';
import Button from '@mui/material/Button';

const BigButton = (props) => {
  return (
    <Button
      sx={{ 
        fontsize: '20pt',
        borderRadius: '5px',
        border: 'none',
        padding: '15px 32px',
        textTransform: 'uppercase',
        cursor: 'pointer',
        color: '#fff',
        backgroundImage: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        transition: '0.3s ease-in-out',
        '&:hover': {
            backgroundImage: 'linear-gradient(45deg, #FF8E53 30%, #FE6B8B 90%)',
        }
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

export default BigButton;

BigButton.propTypes = {
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  children: PropTypes.string,
};
