import * as React from "react";
import { Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
// eslint-disable-next-line import/no-unresolved
import { SLACK_CLIENT_ID } from "env";

import SlackLogo from "../../../../assets/images/slack-logo.png";
import SlackButton from "./SlackButton";

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
      <img src={SlackLogo} width={24} alt={text} />

      <Typography
        sx={{
          fontSize: "16px",
          fontWeight: 600,
          marginLeft: "8px",
          lineHeight: "24px",
        }}
      >
        {text ? text : "Login"}
      </Typography>
    </SlackButton>
  );
};

export default SlackLoginButton;
