import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

export default function WaitApprovalPage() {
  return (
    <Container component="div" maxWidth="sm" sx={{ mb: 4 }}>
      <Typography component="h1" variant="h4" align="center">
        Welcome to Tasketeer
      </Typography>

      <Typography
        variant="body2"
        align="center"
        maxWidth="xs"
        sx={{
          mt: 2,
          mb: 4,
        }}
      >
        Your account is waiting for approval. Please wait while our team reviews your request.
      </Typography>
    </Container>
  );
}
