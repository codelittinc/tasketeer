import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import { login, setLoading } from "../../../features/authSlice";
import UsersService from "../../../services/users.service";
import { showSnackbar } from "../../../features/feedbackSlice";
import Alerts from "../../../constants/alerts";
import routes from "../../../constants/routes";
import InputField from "../../../components/InputField/InputField";
import SlackLoginButton from "../../../components/SlackButtons";
import { VALID_EMAIL, VALID_PASSWORD } from "../../../constants/regex";
import styles from "./Signup.module.css";

const SignupPage = () => {
  const [showRequiredField, setShowRequiredFields] = useState(false);
  const [form, setForm] = useState({});
  const { loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFormChanged = (event) => {
    const newForm = { ...form };
    newForm[event.target.name] = event.target.value;
    setForm(newForm);
  };

  const isFormValid = () => {
    if (
      !form.password ||
      form.password != form.password_confirmation ||
      !VALID_PASSWORD.test(form.password) ||
      !form.email ||
      !VALID_EMAIL.test(form.email)
    )
      return false;

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isFormValid()) {
      dispatch(setLoading(true));

      const { user, errorMessage } = await UsersService.signUp(form);
      if (errorMessage) {
        dispatch(
          showSnackbar({
            message: errorMessage,
            type: Alerts.error,
          })
        );
      } else {
        dispatch(login(user));
        dispatch(
          showSnackbar({
            message: "Signed up successfully",
            type: Alerts.success,
          })
        );

        navigate(routes.welcome);
      }

      setTimeout(() => dispatch(setLoading(false)), 400);
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
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div className={styles.headingContainer}>
          <h1 className={styles.header}>Create your account</h1>

          <p className={styles.headingSubLabel}>
            Join Tasketeer with your Slack account.
          </p>

          <SlackLoginButton text="Sign Up with Slack" />

          <div>
            <hr
              className={styles.signUpText}
              data-content=" or sign up manually "
            />
          </div>
        </div>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <InputField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            error={
              (form.email && !VALID_EMAIL.test(form.email)) || showRequiredField
            }
            value={form.email || ""}
            onChange={handleFormChanged}
          />
          <InputField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            error={
              (form.password && !VALID_PASSWORD.test(form.password)) ||
              showRequiredField
            }
            value={form.password || ""}
            onChange={handleFormChanged}
          />
          <span className={styles.passwordLegend}>
            Minimum 8 characters, 1 capital letter, and 1 number.
          </span>

          <InputField
            margin="normal"
            required
            fullWidth
            name="password_confirmation"
            label="Confirm your password"
            type="password"
            id="password_confirmation"
            error={
              (form["password_confirmation"] &&
                form["password_confirmation"] != form.password) ||
              showRequiredField
            }
            value={form["password_confirmation"] || ""}
            onChange={handleFormChanged}
          />

          <button
            className={styles.signUpButton}
            disabled={loading}
            type="submit"
          >
            {loading ? (
              <CircularProgress color="primary" size={24} />
            ) : (
              "Sign up"
            )}
          </button>
        </Box>

        <Grid container>
          <Grid item>
            <Typography
              className={styles.footerText}
              component={Link}
              to={routes.login}
              variant="body2"
              color="inherit"
              fontSize={16}
            >
              Already have an account?&nbsp;
              <span className={styles.footerInnerText}>Log in</span>
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};
export default SignupPage;
