import * as React from "react";
import Typography from "@mui/material/Typography";
import FAQItems from "../../../constants/faqItems";
import TasketeerAccordion from "../../../components/TasketeerAccordion";
import Grid from "@mui/material/Grid";

export default function FaqPage() {
  return (
    <Grid
      container
      sx={{
        mb: 8,
        mt: 8,
      }}
    >
      <Typography
        component="h1"
        variant="h2"
        paragraph
        color="text.primary"
        sx={{
          mb: 3,
          fontFamily: "Clash Display",
          fontSize: "48px",
          fontWeight: 500,
          lineHeight: "56px",
        }}
      >
        Frequently Asked Questions
      </Typography>

      <TasketeerAccordion items={FAQItems} />
    </Grid>
  );
}
