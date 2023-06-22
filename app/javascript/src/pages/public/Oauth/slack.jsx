import * as React from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import { login } from '../../../features/authSlice';
import UsersService from '../../../services/users.service';
import Alerts from '../../../constants/alerts';
import { showSnackbar } from '../../../features/feedbackSlice';
import routes from '../../../constants/routes';

const OauthSlackPage = () => {
  const [loading, setLoading] = React.useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [params] = useSearchParams();
  const slackCode = params.get('code');

  React.useEffect(() => {
    if (!loading || !slackCode) return;

    const oauth = async () => {
      const {
        user: userData,
        errorMessage,
      } = await UsersService.slackOauthAuthorize(slackCode, pathname);

      if (errorMessage) {
        dispatch(showSnackbar({
          message: errorMessage,
          type: Alerts.error,
        }));
        navigate(routes.login);
      } else {
        dispatch(login(userData));
        navigate(routes.welcome);
      }

      setLoading(false);
    };

    oauth();
  }, [dispatch, navigate, slackCode, loading]);

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
        <CircularProgress color="inherit" />
      </Box>
    </Container>
  );
};
export default OauthSlackPage;
