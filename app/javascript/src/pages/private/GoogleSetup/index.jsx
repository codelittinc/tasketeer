import * as React from 'react';
import { useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useGoogleLogin } from '@react-oauth/google';
import { GOOGLE_API_SCOPE } from 'env';
import classNames from 'classnames';
import InputField from '../../../components/InputField/InputField';
import GoogleIntegrationService from '../../../services/googleIntegration.service';
import { showSnackbar } from '../../../features/feedbackSlice';
import styles from './GoogleSetup.module.css';
import Alerts from '../../../constants/alerts';

const GoogleSetup = () => {
  const dispatch = useDispatch();
  const [folderId, setFolderId] = React.useState('');
  const [googleKey, setGoogleKey] = React.useState('');

  const authorize = useGoogleLogin({
    onSuccess: (tokenResponse) => setGoogleKey(tokenResponse.access_token),
    scope: GOOGLE_API_SCOPE,
  });

  const indexFolder = async () => {
    const { errorMessage } = await GoogleIntegrationService.indexGoogleDrive(googleKey, folderId);
    if (errorMessage) {
      dispatch(showSnackbar({
        message: 'There was an error indexing your Google Drive Folder. Please try again.',
        type: Alerts.error,
      }));
      return;
    }

    dispatch(showSnackbar({
      message: 'The Google Driver folder is being indexed. It may take a few minutes to complete.',
      type: Alerts.success,
    }));
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div className={styles.headingContainer}>
          <h1 className={styles.header}>
            Google Drive Setup
          </h1>
        </div>

        <InputField
          margin="normal"
          required
          fullWidth
          label="Google Drive Folder ID"
          onChange={(e) => setFolderId(e.target.value)}
          autoFocus
          sx={{ mb: 4 }}
        />

        <section className={styles.container}>
          <button
            disabled={!folderId || googleKey}
            className={classNames(styles.button, styles.authorizeButton)}
            type="submit"
            onClick={authorize}
          >
            Authorize Google Drive
          </button>

          <button
            disabled={!googleKey}
            className={classNames(styles.button, styles.indexButton)}
            type="submit"
            onClick={indexFolder}
          >
            Index Folder
          </button>
        </section>
      </Box>
    </Container>
  );
};

export default GoogleSetup;
