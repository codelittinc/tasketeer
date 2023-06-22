import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '../../../components/Card';
import getAdminCards from './utils';
import Modal from '../../../components/Modal';
import COLORS from '../../../utils/colors';
import routes from '../../../constants/routes';
import Continue from '../../../../../assets/icons/continue.svg';
import GptApiKeyService from '../../../services/gptApiKey.service';

const AdminHome = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const adminCards = getAdminCards(navigate);
  const [showGptKeyModal, setShowGptKeyModal] = useState();

  useEffect(() => {
    const fetchMessages = async () => {
      const { apiKey: apiKeyResponse } = await GptApiKeyService.getApiKey();

      if (!apiKeyResponse?.value) {
        setShowGptKeyModal(true);
      }
    };

    if (currentUser.id) {
      fetchMessages();
    }
  }, [currentUser]);

  const getGptModalActions = () => (
    <Button
      key="setup"
      variant="container"
      disableRipple
      sx={{
        backgroundColor: COLORS.primary200,
        borderRadius: '12px',
        padding: '12px 32px',
        textTransform: 'none',
        '&:hover': { backgroundColor: COLORS.primary200 },
      }}
      onClick={() => navigate(routes.setup)}
      endIcon={
        <Box
          component="img"
          src={Continue}
          alt="Continue to GPT Setup"
          sx={{
            mr: 0.125,
            alignSelf: 'center',
          }}
        />
      }
    >
      Go to GPT setup
    </Button>
  );

  return (
    <Container component="div" maxWidth="lg" sx={{ mb: 4, mt: '150px' }}>
      <Typography
        component="h1"
        variant="h4"
        align="left"
        sx={{
          fontFamily: 'Clash Display Variable',
          fontSize: '48px',
          fontWeight: 500,
          lineHeight: '56px',
        }}
      >
        Welcome to Tasketeer!
      </Typography>

      <Typography
        variant="body2"
        align="left"
        maxWidth="xs"
        sx={{ mt: 2, mb: 4 }}
      >
        Before you start using the application, please tell us what is your
        organization name
      </Typography>
      <Grid
        sx={{ flexGrow: 1 }}
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        <Grid item xs={12}>
          <Grid container justifyContent="flex-start" spacing={2}>
            {adminCards.map((card, index) => (
              <Card
                key={`card-${index}`}
                title={card.title}
                description={card.description}
                action={card.action}
                cardSx={{ margin: '10px' }}
              />
            ))}
          </Grid>
        </Grid>
      </Grid>
      <Modal
        title="Welcome to Tasketeer!"
        content="Please set up GPT key. This integration is crucial for Tasketeer to deliver accurate and intelligent responses to your queries."
        open={showGptKeyModal}
        onClose={() => setShowGptKeyModal(false)}
        actions={getGptModalActions()}
        keepMounted
        hideCloseIcon
        disableBackdropClick
        dialogActionsSx={{ padding: '20px' }}
      />
    </Container>
  );
};

export default AdminHome;
