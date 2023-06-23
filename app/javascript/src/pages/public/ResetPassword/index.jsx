import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import { setLoading } from '../../../features/authSlice';
import UsersService from '../../../services/users.service';
import Alerts from '../../../constants/alerts';
import { showSnackbar } from '../../../features/feedbackSlice';
import routes from '../../../constants/routes';
import InputField from '../../../components/InputField/InputField';
import styles from './ResetPassword.module.css';

const ResetPassword = () => {
  const { loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [password, setPassword] = React.useState('');
  const [passwordConfirmation, setPasswordConfirmation] = React.useState('');
  const [isPasswordValid, setIsPasswordValid] = React.useState(false);

  const [params] = useSearchParams();
  const token = params.get('token');
  const email = params.get('email');

  React.useEffect(() => {
    setIsPasswordValid(password && password === passwordConfirmation);
  }, [password, passwordConfirmation]);

  const handleSubmit = async () => {
    dispatch(setLoading(true));
    const { errorMessage } = await UsersService.updatePassword(email, token, password);
    dispatch(setLoading(false));
    if (errorMessage) {
      dispatch(
        showSnackbar({
          message: errorMessage,
          type: Alerts.error,
        }),
      );
    } else {
      showSnackbar({
        message: 'New password saved successfully!',
        type: Alerts.success,
      });
      navigate(routes.login);
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
            Set a new password
          </h1>
        </div>

        <InputField
          margin="normal"
          required
          fullWidth
          type="password"
          label="Password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          autoFocus
        />

        <InputField
          margin="normal"
          required
          fullWidth
          type="password"
          label="Confirm Password"
          name="confirm_password"
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          autoFocus
        />

        <button
          className={styles.sendButton}
          disabled={loading || !isPasswordValid}
          type="submit"
          onClick={handleSubmit}
        >
          {loading ? (
            <CircularProgress color="primary" size={24} />
          )
            : 'Save' }
        </button>
      </Box>
    </Container>
  );
};

export default ResetPassword;
