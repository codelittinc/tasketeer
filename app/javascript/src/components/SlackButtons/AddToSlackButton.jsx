import * as React from "react";
import Box from "@mui/material/Box";
import { Link as RouterLink } from "react-router-dom";
// eslint-disable-next-line import/no-unresolved
import { SLACK_CLIENT_ID } from "env";

import SlackLogo from "../../../../assets/images/slack-logo.png";
import SlackButton from "./SlackButton";

const AddToSlackButton = ({ isSmall }) => {
  const currentPath = window.location.hostname;

  const userScopes = "email,profile,openid";
  const orgScopes =
    "app_mentions:read,channels:join,chat:write,chat:write.public,im:history,im:write,im:read,team:read,commands";
  const authorizeURL = `https://slack.com/oauth/v2/authorize?client_id=${SLACK_CLIENT_ID}&scope=${orgScopes}&user_scope=${userScopes}&redirect_uri=https%3A%2F%2F${currentPath}%2Fauthorize_oauth%2Fslack`;

  const smallButton = {
    width: "150px",
    fontSize: 10,
    mr: 1.5,
  };

  const largeButton = {
    mt: 4,
    width: "200px",
  };

  const style = isSmall ? smallButton : largeButton;

  return (
    <SlackButton
      variant="contained"
      color="primary"
      size="large"
      sx={{
        fontFamily: "Montserrat",
        fontWeight: 600,
        textTransform: "none",
        ...style,
      }}
      component={RouterLink}
      target="_blank"
      alt="Add to Slack"
      to={authorizeURL}
    >
      <Box
        component="img"
        src={SlackLogo}
        alt="Add to Slack "
        sx={{
          width: 24,
          mr: 1.5,
        }}
      />
      Add to Slack
    </SlackButton>
  );
};

export default AddToSlackButton;
