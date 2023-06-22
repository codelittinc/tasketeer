import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import UsersService from '../../../services/users.service';
import { showSnackbar } from '../../../features/feedbackSlice';
import Alerts from '../../../constants/alerts';
import { login } from '../../../features/authSlice';
import routes from '../../../constants/routes';
import OrganizationsService from '../../../services/organizations.service';

export default function OnboardingPage() {
  const [loading, setLoading] = React.useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    const {
      errorMessage,
    } = await OrganizationsService.createOrganization(data.name, data.notion_api_key);

    if (errorMessage) {
      dispatch(showSnackbar({
        message: errorMessage,
        type: Alerts.error,
      }));
    } else {
      dispatch(showSnackbar({
        message: 'Welcome!',
        type: Alerts.success,
      }));

      // Refresh the user so we have it with the new organization
      const { user: userData } = await UsersService.getAuthenticatedUser();
      dispatch(login(userData));

      setLoading(false);
      navigate(routes.welcome);
    }
  };

  return (
    <Container component="div" maxWidth="sm" sx={{ mb: 4 }}>
      <Typography component="h1" variant="h4" align="center">
        Welcome to Tasketeer
      </Typography>

      <Typography variant="body2" align="center" maxWidth="xs" sx={{ mt: 2, mb: 4 }}>
        Before you start using the application, please tell us what is your organization name
      </Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="name"
          label="Organization name"
          name="name"
          autoFocus
        />

        <TextField
            margin="normal"
            fullWidth
            id="notion_api_key"
            label="Notion API Key"
            name="notion_api_key"
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          loading
          disabled={loading}
          sx={{
            mt: 3,
            mb: 2,
          }}
        >
          {loading ? <CircularProgress color="primary" size={24} /> : 'Save and continue'}
        </Button>
      </Box>
    </Container>
  );
}
