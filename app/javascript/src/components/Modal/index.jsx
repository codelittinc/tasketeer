import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import Icon from "../Icon";
import {
  CLOSE_ICON,
  DEFAULT_STYLE_ACTIONS,
  DEFAULT_STYLE_CONTENT,
  DEFAULT_STYLE_DIALOG_WRAPPER,
  DEFAULT_STYLE_ICON,
  DEFAULT_STYLE_TITLE,
} from "./utils";

const Modal = ({
  title,
  content,
  open,
  onClose,
  actions,
  dialogSx,
  dialogActionsSx,
  dialogContentSx,
  keepMounted,
  hideCloseIcon,
  disableBackdropClick,
  maxWidth = "sm",
}) => {
  const handleClose = (e, reason) => {
    if (reason === "backdropClick" && disableBackdropClick) {
      return;
    }

    onClose?.();
  };
  return (
    <Dialog
      maxWidth={maxWidth}
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{
        ...DEFAULT_STYLE_DIALOG_WRAPPER,
        ...dialogSx,
      }}
      keepMounted={keepMounted}
      disableEscapeKeyDown
    >
      <DialogTitle style={DEFAULT_STYLE_TITLE} id="alert-dialog-title">
        {title}
        {onClose && !hideCloseIcon ? (
          <Icon
            icon={CLOSE_ICON}
            onClick={handleClose}
            sx={DEFAULT_STYLE_ICON}
          />
        ) : null}
      </DialogTitle>
      <DialogContent
        sx={{ ...DEFAULT_STYLE_CONTENT, ...dialogContentSx }}
        id="alert-dialog-description"
      >
        {content}
      </DialogContent>
      <DialogActions
        sx={{
          ...DEFAULT_STYLE_ACTIONS,
          ...dialogActionsSx,
        }}
      >
        {actions}
      </DialogActions>
    </Dialog>
  );
};

export default Modal;
