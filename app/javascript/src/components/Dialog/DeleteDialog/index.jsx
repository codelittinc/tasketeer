import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import PropTypes from 'prop-types';

const DeleteDialog = ({
  onDelete,
  onCancel,
  open,
  title,
  description,
}) => (
  <Dialog
    open={open}
    onClose={onCancel}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">
      {title}
    </DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        {description}
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onCancel}>Cancel</Button>
      <Button onClick={onDelete} color="error">Delete</Button>
    </DialogActions>
  </Dialog>
);

DeleteDialog.defaultProps = {
  title: 'Are you sure?',
  description: 'This action cannot be undone.',
  open: false,
  onDelete: () => {},
  onCancel: () => {},
};

DeleteDialog.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  open: PropTypes.bool,
  onDelete: PropTypes.func,
  onCancel: PropTypes.func,
};

export default DeleteDialog;
