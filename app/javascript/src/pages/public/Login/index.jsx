import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";
import { login, setLoading } from "../../../features/authSlice";
import UsersService from "../../../services/users.service";
import Alerts from "../../../constants/alerts";
import { showSnackbar } from "../../../features/feedbackSlice";
import routes from "../../../constants/routes";
import SlackLoginButton from "../../../components/SlackButtons";
import InputField from "../../../components/InputField/InputField";
import LoginIcon from "../../../../../assets/icons/login.svg";
import styles from "./Login.module.css";

const LoginPage = () => {
  const { loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    const { user, errorMessage } = await UsersService.signIn(
      data.email,
      data.password
    );

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
          message: "Signed in successfully",
          type: Alerts.success,
        })
      );
      dispatch(login(user));
      navigate(routes.welcome);
    }

    setTimeout(() => dispatch(setLoading(false)), 400);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div className={styles.headingContainer}>
          <h1 className={styles.header}>Welcome back!</h1>

          <p className={styles.headingSubLabel}>
            Sign in with your Slack account.
          </p>

          <SlackLoginButton text="Log In with Slack" />

          <div>
            <hr
              className={styles.signUpText}
              data-content=" or please enter your credentials to access "
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
          />
          <button
            className={styles.signUpButton}
            disabled={loading}
            type="submit"
          >
            {loading ? (
              <CircularProgress color="primary" size={24} />
            ) : (
              "Log In"
            )}
            <img src={LoginIcon} className={styles.loginIcon} />
          </button>
        </Box>

        <Grid container>
          <Grid item>
            <Typography
              className={styles.footerText}
              component={Link}
              to={routes.signup}
              variant="body2"
              fontSize={16}
            >
              Don't have an account?&nbsp;
              <span className={styles.footerInnerText}>Sign up</span>
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default LoginPage;
