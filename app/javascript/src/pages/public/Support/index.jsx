import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { showSnackbar } from "../../../features/feedbackSlice";
import Alerts from "../../../constants/alerts";
import { useDispatch } from "react-redux";
import InputField from "../../../components/InputField/InputField";
import SupportService from "../../../services/support.service";
import TasketeerButton, {
  buttonCategories,
} from "../../../components/TasketeerButton";
import { VALID_EMAIL } from "../../../constants/regex";
import styles from "./Support.module.css";

export default function SupportPage() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const [form, setForm] = useState({});
  const [showRequiredField, setShowRequiredFields] = useState(false);

  const isFormValid = () => {
    if (
      !form["first-name"] ||
      !form["last-name"] ||
      !form.email ||
      !VALID_EMAIL.test(form.email) ||
      !form.comment
    )
      return false;

    return true;
  };

  const handleFormChanged = (event) => {
    const newForm = { ...form };
    newForm[event.target.name] = event.target.value;
    setForm(newForm);
  };

  const submit = async (e) => {
    e.preventDefault();

    if (isFormValid()) {
      setLoading(true);

      const { errorMessage } = await SupportService.submit(form);

      if (errorMessage) {
        dispatch(
          showSnackbar({
            message: errorMessage,
            type: Alerts.error,
          })
        );
      } else {
        dispatch(
          showSnackbar({
            message: "The form has been successfully submitted!",
            type: Alerts.success,
          })
        );
      }
      setLoading(false);
    } else {
      setShowRequiredFields(true);

      setTimeout(() => {
        setShowRequiredFields(false);
      }, "5000");

      dispatch(
        showSnackbar({
          message: "Please complete all required fields.",
          type: Alerts.error,
        })
      );
    }
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        component="form"
        className={styles.box}
      >
        <Grid container item md={6} lg={6} xl={7} spacing={2}>
          <Grid item xs={12}>
            <Typography
              component="h1"
              sx={{
                mt: 1,
                fontFamily: "Clash Display",
                fontWeight: 500,
                fontSize: "48px",
                lineHeight: "56px",
              }}
            >
              Contact Us
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <InputField
              required
              fullWidth
              id="first-name"
              label="First Name"
              name="first-name"
              type="first-name"
              value={form["first-name"] || ""}
              onChange={handleFormChanged}
              error={showRequiredField}
              autoFocus
            />
          </Grid>
          <Grid item xs={6}>
            <InputField
              required
              fullWidth
              id="last-name"
              label="Last Name"
              name="last-name"
              type="last-name"
              value={form["last-name"] || ""}
              onChange={handleFormChanged}
              error={showRequiredField}
            />
          </Grid>
          <Grid item xs={6}>
            <InputField
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              type="email"
              value={form.email || ""}
              error={
                (form.email && !VALID_EMAIL.test(form.email)) ||
                showRequiredField
              }
              onChange={handleFormChanged}
            />
          </Grid>
          <Grid item xs={6}>
            <InputField
              fullWidth
              id="company"
              label="Company Name"
              name="company"
              type="company"
              value={form.company || ""}
              onChange={handleFormChanged}
            />
          </Grid>
          <Grid item xs={12}>
            <InputField
              fullWidth
              id="comment"
              label="Message"
              rows={5}
              multiline
              name="comment"
              type="comment"
              required
              value={form.comment || ""}
              error={showRequiredField}
              onChange={handleFormChanged}
            />
          </Grid>
          <Grid item xs={12} display="flex" justifyContent="flex-end">
            <TasketeerButton
              category={buttonCategories.primary}
              onClick={submit}
              disabled={loading}
              text={
                loading ? (
                  <CircularProgress color="primary" size={24} />
                ) : (
                  "Submit"
                )
              }
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
