import * as React from 'react';
import Box from '@mui/material/Box';
import {
  Link as RouterLink
} from 'react-router-dom';
// eslint-disable-next-line import/no-unresolved
import { SLACK_CLIENT_ID } from 'env';

import SlackLogo from '../../../../assets/images/slack-logo.png';
import SlackButton from './SlackButton';

const SlackLoginButton = ({ text }) => {
  const currentPath = window.location.hostname;
  return (
    <SlackButton
      variant="contained"
      color="primary"
      size="large"
      component={RouterLink}
      fullWidth
      to={`https://slack.com/openid/connect/authorize?scope=email%20profile%20openid&response_type=code&redirect_uri=https%3A%2F%2F${currentPath}%2Foauth%2Fslack&client_id=${SLACK_CLIENT_ID}`}
    >
      <Box
        component="img"
        src={SlackLogo}
        alt={text}
        sx={{
          width: 24,
          mr: 1.5,
        }}
      />
      {text ? text: 'Login'}
    </SlackButton>
  );
};

export default SlackLoginButton;
