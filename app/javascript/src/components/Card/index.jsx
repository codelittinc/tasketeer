import { Box, Typography } from '@mui/material';
import React from 'react';
import COLORS from '../../utils/colors';

const Card = ({ title, description, action, width, height, cardSx }) => (
  <Box
    sx={{
      width: width || 297,
      height: height || 272,
      backgroundColor: COLORS.neutral900,
      padding: '32px',
      borderRadius: '24px',
      '&:hover': {
        backgroundColor: COLORS.neutral900,
      },
      ...cardSx,
    }}
  >
    <Box component='div' sx={{ display: 'flex', marginBottom: '10px' }}>
      {title}
    </Box>
    <Typography component='body1'>{description}</Typography>
    {action || null}
  </Box>
);

export default Card;
