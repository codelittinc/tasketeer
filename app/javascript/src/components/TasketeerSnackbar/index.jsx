import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { closeSnackbar } from '../../features/feedbackSlice';

export default function TasketeerSnackbar() {
  const { message, type } = useSelector((state) => state.feedback);

  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(closeSnackbar());
  };

  return (
    <Snackbar
      open={!!message && !!type}
      onClose={handleClose}
      autoHideDuration={5000}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
    >
      <Alert
        onClose={handleClose}
        severity={type || 'success'}
        variant="filled"
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
