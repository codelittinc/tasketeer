import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import COLORS from '../../../utils/colors';
import routes from '../../../constants/routes';
import Continue from '../../../../../assets/icons/continue.svg';
import Notion from '../../../../../assets/icons/notion-logo.svg';
import Upload from '../../../../../assets/icons/upload.svg';
import World from '../../../../../assets/icons/world.svg';

const getActionTitle = (label, icon, alt) => (
  <>
    <Box
      component="img"
      src={icon}
      alt={alt}
      sx={{
        mr: 1,
        alignSelf: 'center',
      }}
    />
    <Typography component="h5" sx={{ color: COLORS.neutral100 }}>
      {label}
    </Typography>
  </>
);

const getActionButton = (label, navigate, route) => (
  <Button
    variant="container"
    disableRipple
    sx={{
      backgroundColor: COLORS.primary200,
      borderRadius: '12px',
      padding: '12px 32px',
      textTransform: 'none',
      marginTop: '16px',
      '&:hover': { backgroundColor: COLORS.primary200 },
    }}
    onClick={() => navigate(route)}
    endIcon={(
      <Box
        component="img"
        src={Continue}
        alt="Continue to Training"
        sx={{
          mr: 0.125,
          alignSelf: 'center',
        }}
      />
    )}
  >
    {label}
  </Button>
);

const getAdminCards = (navigate) => [
  {
    title: getActionTitle('Upload Files', Upload),
    description:
      "To train Tasketeer's AI and enable accurate document search, please upload the relevant files.",
    action: getActionButton('Upload Files', navigate, routes.organization),
  },
  {
    title: getActionTitle('Notion API', Notion),
    description:
      "Tasketeer can leverage your company's information stored in Notion.  Please provide your Notion API key.",
    action: getActionButton('Set Notion', navigate, routes.integration),
  },
  {
    title: getActionTitle('Add Links', World),
    description:
      'Consider adding links to domain-specific websites or internal resources. Tasketeer can learn from these pages.',
    action: getActionButton('Add Links', navigate, routes.webCrawler),
  },
];

export default getAdminCards;
