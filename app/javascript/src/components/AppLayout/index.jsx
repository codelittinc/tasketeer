import * as React from 'react';
import { Outlet } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Navbar from '../Navbar';

const AppLayout = () => {
  return (
    <div>
      <CssBaseline />
      <Navbar />

      <Container
        component="main"
        sx={{
          mt: 3,
          mb: 3,
        }}
      >
        {/* An <Outlet> renders whatever child route is currently active,
        so you can think about this <Outlet> as a placeholder for
        the child routes we defined above. */}
        <Outlet />
      </Container>
    </div>
  );
};

export default AppLayout;
