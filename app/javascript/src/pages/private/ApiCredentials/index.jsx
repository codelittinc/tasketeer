import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import styles from "./ApiCredentials.module.css";
import InputField from "../../../components/InputField/InputField";
import ApiCredentialsService from "../../../services/apiCredentials.service";
import CopyIcon from "@mui/icons-material/ContentCopy";
import RefreshIcon from "@mui/icons-material/Refresh";

const ApiCredentials = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const [secretKey, setSecretKey] = React.useState("");
  const [apiCredential, setApiCredential] = React.useState();

  useEffect(() => {
    const fetchApiCredentials = async () => {
      const { selected_organization } = currentUser;
      const { api_credential } = selected_organization;
      if (api_credential.id) {
        const { apiCredential } = await ApiCredentialsService.getApiCredential(
          api_credential.id
        );
        setSecretKey(apiCredential.secret_key);
        setApiCredential(api_credential);
      }
    };

    if (currentUser.id) {
      fetchApiCredentials();
    }
  }, [currentUser]);

  const handleCreate = async () => {
    if (secretKey) {
      const { apiCredential } = await ApiCredentialsService.createApiCredential(
        {
          secretKey: secretKey,
        }
      );

      setSecretKey(apiCredential.secret_key);
    }
  };

  const handleUpdate = async () => {
    const potato = await ApiCredentialsService.updateApiCredential(
      apiCredential.id,
      {
        secretKey: secretKey,
      }
    );

    setSecretKey(apiCredential.secret_key);
  };

  const copyToClipboard = () => navigator.clipboard.writeText(secretKey);
  const generateKey = () => {
    const key =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);

    setSecretKey(key);
  };

  return (
    <Container component="div" maxWidth="md" sx={{ mt: 8 }}>
      <p className={styles.title}>Create a secret key</p>
      <p className={styles.emptyMessagesParagraph}>
        To use our API, you need to create a secret key. This key will be used
        to authenticate your requests to our API.
      </p>

      <Box component="form">
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            mt: 4,
          }}
        >
          <div style={{ display: "flex", width: "100%", alignItems: "center" }}>
            <InputField
              margin="normal"
              required
              fullWidth
              id="api-secret-key"
              label="Secret Key"
              name="secret-key"
              autoFocus
              onChange={(e) => {
                setSecretKey(e.target.value);
              }}
              value={secretKey}
            />

            <IconButton
              style={{ marginLeft: "10px", pointer: "cursor" }}
              aria-label="copy"
              onClick={generateKey}
            >
              <RefreshIcon />
            </IconButton>
            <IconButton
              style={{ marginLeft: "10px", pointer: "cursor" }}
              aria-label="copy"
              onClick={copyToClipboard}
            >
              <CopyIcon />
            </IconButton>
          </div>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexFlow: "row",
            justifyContent: "space-between",
            marginTop: "16px",
          }}
        >
          <Button
            variant="contained"
            onClick={apiCredential ? handleUpdate : handleCreate}
            disabled={!secretKey}
            sx={{
              fontWeight: 600,
              fontSize: "16px",
              fontFamily: "Montserrat",
              fontStyle: "normal",
              color: "var(--neutral400)",
              backgroundColor: "var(--primary200)",
              height: "56px",
              textTransform: "none",
              borderRadius: "12px",
            }}
          >
            Set secret key
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ApiCredentials;
