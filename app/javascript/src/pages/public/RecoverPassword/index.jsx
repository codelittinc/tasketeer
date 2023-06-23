import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import { setLoading } from '../../../features/authSlice';
import UsersService from '../../../services/users.service';
import Alerts from '../../../constants/alerts';
import { showSnackbar } from '../../../features/feedbackSlice';
import routes from '../../../constants/routes';
import InputField from '../../../components/InputField/InputField';
import styles from './RecoverPassword.module.css';
import { validateEmail } from '../../../utils/validators';
import { getLabels } from './utils';

const RecoverPassword = () => {
  const { loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [email, setEmail] = React.useState('');
  const [isEmailValid, setIsEmailValid] = React.useState(false);
  const [showConfirmation, setShowConfirmation] = React.useState(false);

  React.useEffect(() => {
    setIsEmailValid(validateEmail(email));
  }, [email]);

  const handleSubmit = async () => {
    dispatch(setLoading(true));
    const { errorMessage } = await UsersService.resetPassword(email);
    dispatch(setLoading(false));
    if (errorMessage) {
      dispatch(
        showSnackbar({
          message: errorMessage,
          type: Alerts.error,
        }),
      );
    } else {
      setShowConfirmation(true);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div className={styles.headingContainer}>
          <h1 className={styles.header}>
            {getLabels(showConfirmation, email).header}
          </h1>

          <p className={styles.headingSubLabel}>
            {getLabels(showConfirmation, email).subLabel}
          </p>
        </div>

        {!showConfirmation && (
          <InputField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            onChange={(e) => setEmail(e.target.value)}
            autoFocus
          />
        )}

        <button
          className={styles.sendButton}
          disabled={loading || !isEmailValid}
          type="submit"
          onClick={handleSubmit}
        >
          {loading ? (
            <CircularProgress color="primary" size={24} />
          )
            : getLabels(showConfirmation).button}
        </button>

        <Typography
          className={styles.footerText}
          component={Link}
          to={routes.root}
          variant="body2"
          fontSize={16}
        >
          Back to Home
        </Typography>
      </Box>
    </Container>
  );
};

export default RecoverPassword;
