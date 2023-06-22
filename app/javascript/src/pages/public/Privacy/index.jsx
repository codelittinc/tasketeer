import * as React from "react";
import Typography from "@mui/material/Typography";
import { Link as RouterLink } from "react-router-dom";
import routes from "../../../constants/routes";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { PrivacyTitle, PrivacyDescription } from "./PrivacyMUIStyles";
import { privacyPolicyData } from "./utils";
import COLORS from "../../../utils/colors";

export default function PrivacyPage() {
  const renderPrivacyPolicy = (privacyPolicy) => {
    return (
      <div key={privacyPolicy.title}>
        <Typography component="h1" variant="h4" paragraph sx={PrivacyTitle}>
          {privacyPolicy.title}
        </Typography>

        {privacyPolicy.description.map((description) => {
          return (
            <Typography
              variant="body2"
              paragraph
              color="text.primary"
              sx={PrivacyDescription}
              key={description}
            >
              {description}
            </Typography>
          );
        })}
      </div>
    );
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        sx={{
          borderBottom: `1px solid ${COLORS.neutral600}`,
          mb: 8,
        }}
      >
        <Grid
          container
          item
          md={10}
          sx={{
            mt: 8,
            pb: 1,
          }}
        >
          {renderPrivacyPolicy(privacyPolicyData[0])}
        </Grid>
      </Box>

      <Box display="flex" justifyContent="center">
        <Grid
          container
          item
          md={10}
          sx={{
            mb: 8,
          }}
        >
          {privacyPolicyData.slice(1).map((privacyPolicy) => {
            return renderPrivacyPolicy(privacyPolicy);
          })}

          <Typography
            component="h1"
            variant="h4"
            paragraph
            color="text.primary"
            sx={PrivacyTitle}
          >
            Contact Us
          </Typography>

          <Typography
            variant="body2"
            paragraph
            color="text.primary"
            sx={PrivacyDescription}
          >
            If you have any questions or suggestions about our Privacy Policy,
            do not hesitate to&nbsp;
            <Typography
              variant="body2"
              color="text.primary"
              component={RouterLink}
              to={routes.support}
              sx={PrivacyDescription}
            >
              contact us
            </Typography>
            .
          </Typography>
        </Grid>
      </Box>
    </>
  );
}
