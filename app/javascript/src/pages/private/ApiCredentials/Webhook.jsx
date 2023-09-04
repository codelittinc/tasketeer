import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import styles from "./ApiCredentials.module.css";
import InputField from "../../../components/InputField/InputField";
import WebhooksService from "../../../services/webhooks.service";

const Webhooks = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const [webhookUrl, setWebhookUrl] = React.useState("");
  const [webhook, setWebhook] = React.useState();

  useEffect(() => {
    const getWebhook = async () => {
      const { selected_organization } = currentUser;
      const { webhook } = selected_organization;
      if (webhook.id) {
        const response = await WebhooksService.getWebhook(webhook.id);
        setWebhookUrl(response.webhook.url);
        setWebhook(response.webhook);
      }
    };

    if (currentUser.id) {
      getWebhook();
    }
  }, [currentUser]);

  const handleCreate = async () => {
    if (webhookUrl) {
      const { webhook } = await WebhooksService.createWebhook({
        url: webhookUrl,
      });

      setWebhookUrl(webhook.url);
    }
  };

  const handleUpdate = async () => {
    await WebhooksService.updateWebhook(webhook.id, {
      webhook: webhook,
    });

    setWebhookUrl(webhook.url);
  };

  return (
    <>
      <p className={styles.title}>Setup your webhook</p>
      <p className={styles.emptyMessagesParagraph}>
        Every time you send us an API request with a prompt, we will send you a
        webhook with the results. You can setup your webhook URL below.
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
              id="webhook-url"
              label="Webhook Url"
              name="url"
              autoFocus
              onChange={(e) => {
                setWebhookUrl(e.target.value);
              }}
              value={webhookUrl}
            />
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
            onClick={webhook ? handleUpdate : handleCreate}
            disabled={!webhookUrl}
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
            Set webhook
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Webhooks;
