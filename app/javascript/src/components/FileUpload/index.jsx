import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useDropzone } from "react-dropzone";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import { ListItemIcon } from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import CircularProgress from "@mui/material/CircularProgress";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import styles from "./FileUpload.module.css";
import OrganizationsService from "../../services/organizations.service";
import { showSnackbar } from "../../features/feedbackSlice";
import Alerts from "../../constants/alerts";
import Modal from "../Modal";
import TasketeerButton, { buttonCategories } from "../TasketeerButton";

const FileUpload = ({ onUpload, isOpen, onClose }) => {
  const [uploading, setUploading] = React.useState(false);
  const [acceptedFiles, setAcceptedFiles] = React.useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (droppedFiles) => {
      setAcceptedFiles((prevFiles) => [...prevFiles, ...droppedFiles]);
    },
  });
  const dispatch = useDispatch();

  const handleClose = () => {
    onClose();
    setAcceptedFiles([]);
  };

  const uploadFiles = async () => {
    setUploading(true);
    const { errorMessage } = await OrganizationsService.uploadFiles(
      acceptedFiles
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
          message: "Your files have been uploaded successfully",
          type: Alerts.success,
        })
      );
      acceptedFiles.splice(0, acceptedFiles.length);
      onUpload();
      onClose();
    }

    setAcceptedFiles([]);
    setUploading(false);
  };

  const files = acceptedFiles.map((file) => (
    <ListItem key={file.path} dense>
      <ListItemIcon>
        <AttachFileIcon />
      </ListItemIcon>
      <ListItemText primary={file.path} secondary={`${file.size} bytes`} />
    </ListItem>
  ));

  const hasFiles = acceptedFiles.length > 0;

  return (
    <Modal
      title="Index Files"
      content={
        <Box className={styles.box}>
          <section>
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            <div {...getRootProps({ className: styles.dropzone })}>
              {/* eslint-disable-next-line react/jsx-props-no-spreading */}
              <input {...getInputProps()} />
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  marginBottom: "16px",
                }}
              >
                <Typography
                  align="center"
                  sx={{
                    fontWeight: 600,
                    fontSize: "18px",
                    lineHeight: "28px",
                  }}
                >
                  Drag & drop files or
                </Typography>
                <TasketeerButton
                  category={buttonCategories.primary}
                  text="Choose files"
                />
              </Box>
              <Typography align="center">
                Compatible formats PDF, Word, or Text files.
              </Typography>
            </div>

            {hasFiles && <List sx={{ ml: 4 }}>{files}</List>}
          </section>
        </Box>
      }
      open={isOpen}
      onClose={handleClose}
      actions={[
        <TasketeerButton
          category={buttonCategories.tertiary}
          text="Cancel"
          onClick={handleClose}
        />,
        <TasketeerButton
          category={buttonCategories.primary}
          text={
            uploading ? (
              <CircularProgress color="primary" size={24} />
            ) : (
              "Upload files"
            )
          }
          disabled={!hasFiles || uploading}
          onClick={uploadFiles}
        />,
      ]}
      keepMounted
      dialogContentSx={{
        width: 734,
      }}
      dialogActionsSx={{
        display: "flex",
        justifyContent: "space-between",
      }}
      disableBackdropClick
      maxWidth="md"
    />
  );
};

FileUpload.propTypes = {
  onUpload: PropTypes.func.isRequired,
};

export default FileUpload;
