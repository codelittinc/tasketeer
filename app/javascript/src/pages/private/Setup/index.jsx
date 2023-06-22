import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import SetupTable from './SetupTable';
import styles from './Setup.module.css';
import InputField from '../../../components/InputField/InputField';
import GptApiKeyService from '../../../services/gptApiKey.service';

const SetupPage = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const [apiKey, setApiKey] = React.useState();
  const [inputValue, setInputValue] = React.useState();

  useEffect(() => {
    const fetchMessages = async () => {
      const { apiKey: apiKeyResponse } = await GptApiKeyService.getApiKey();

      if (apiKeyResponse?.value) {
        setApiKey(apiKeyResponse);
      }
    };

    if (currentUser.id) {
      fetchMessages();
    }
  }, [currentUser]);

  const handleCreate = async () => {
    if (inputValue) {
      const { apiKey: apiKeyResponse } = await GptApiKeyService.createApiKey({
        api_key: { value: inputValue },
      });

      setApiKey(apiKeyResponse);
    }
  };

  const handleDelete = async (id) => {
    if (apiKey) {
      const { status } = await GptApiKeyService.deleteApiKey(id);

      if (status) {
        setApiKey('');
      }
    }
  };

  return (
    <Container component="div" maxWidth="md" sx={{ mt: 8 }}>
      <p className={styles.title}>Set GPT Key</p>
      <p className={styles.emptyMessagesParagraph}>
        Before you can start using Tasketeer, we need to set up the GPT key.
        This integration is crucial for Tasketeer to deliver accurate and
        intelligent responses to your queries.
      </p>

      {!apiKey?.value && (
        <Box component="form">
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              mt: 4,
            }}
          >
            <InputField
              margin="normal"
              required
              fullWidth
              id="gpt-api-key"
              label="GPT API Key"
              name="gpt-api-key"
              autoFocus
              onChange={(e) => setInputValue(e.target.value)}
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexFlow: 'row',
              justifyContent: 'space-between',
              marginTop: '16px',
            }}
          >
            <p>
              Don't have a GPT key yet?
              <a
                className={styles.learnUrl}
                href="https://platform.openai.com/docs/quickstart/add-your-api-key"
                target="_blank"
                rel="noreferrer"
              >
                <b> Learn how to generate it</b>
              </a>
            </p>
            <Button
              variant="contained"
              onClick={handleCreate}
              disabled={!inputValue}
              sx={{
                fontWeight: 600,
                fontSize: '16px',
                fontFamily: 'Montserrat',
                fontStyle: 'normal',
                color: 'var(--neutral400)',
                backgroundColor: 'var(--primary200)',
                height: '56px',
                textTransform: 'none',
                borderRadius: '12px',
              }}
            >
              Set GPT Key
            </Button>
          </Box>
        </Box>
      )}

      {!!apiKey?.value && (
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexFlow: 'column',
            justifyContent: 'center',
            width: '88%',
            fontFamily: 'Montserrat',
            fontStyle: 'normal',
            fontWeight: '400',
            fontSize: '14px',
            lineHeight: '20px',
          }}
        >
          <Box
            sx={{
              mt: 4,
              mb: 8,
              width: '100%',
              backgroundColor: '#1A1A1A',
              borderRadius: '12px',
              overflow: 'auto',
              marginBottom: '0px',
            }}
          >
            <SetupTable apiKey={apiKey} onDelete={handleDelete} />
          </Box>
          <p>If you want to set another key please remove the current one.</p>
        </Box>
      )}
    </Container>
  );
};

export default SetupPage;
