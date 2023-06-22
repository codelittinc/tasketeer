import { Tooltip, styled, tooltipClasses } from '@mui/material';
import React from 'react';
import COLORS from '../../utils/colors';

const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: '500px',
    backgroundColor: COLORS.neutral100,
    color: COLORS.neutral1000,
    fontSize: '16px',
    padding: '24px',
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: COLORS.neutral100,
  },
});

export default LightTooltip;
