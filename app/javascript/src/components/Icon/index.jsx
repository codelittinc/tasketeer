import React from 'react';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import COLORS from '../../utils/colors';

const ICON_BUTTON_SIZE = '44px';

const Icon = ({ icon, onClick, sx }) => (
  <IconButton
    disableRipple
    sx={{
      backgroundColor: COLORS.neutral900,
      borderRadius: '8px',
      margin: '8px',
      width: ICON_BUTTON_SIZE,
      height: ICON_BUTTON_SIZE,
      ...sx,
    }}
    onClick={onClick}
  >
    <Box
      component='img'
      src={icon.svg}
      alt={icon?.alt}
      sx={{
        height: icon.height,
        width: icon.width,
        mr: 0.125,
        alignSelf: 'center',
      }}
    />
  </IconButton>
);

Icon.defaultProps = {
  onClick: () => {},
  sx: undefined,
};

Icon.propTypes = {
  icon: PropTypes.object.isRequired,
  onClick: PropTypes.func,
  sx: PropTypes.any,
};

export default Icon;
