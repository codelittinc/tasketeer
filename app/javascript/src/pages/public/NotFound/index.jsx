import * as React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import routes from '../../../constants/routes';

export default function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <Typography variant="h1">
        404
      </Typography>
      <Typography variant="h6">
        The page you’re looking for doesn’t exist.
      </Typography>
      <Button variant="contained" onClick={() => navigate(routes.root)}>
        Back Home
      </Button>
    </Box>
  );
}
