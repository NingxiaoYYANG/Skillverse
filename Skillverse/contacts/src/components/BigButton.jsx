import PropTypes from 'prop-types';
import React from 'react';
import Button from '@mui/material/Button';

const BigButton = (props) => {
  return (
    <Button
      sx={{ fontsize: '20pt' }}
      variant="outlined"
      onClick={props.onClick}
      className={'btn'}
    >
      {props.children}
    </Button>
  );
};

export default BigButton;

BigButton.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.string,
};
