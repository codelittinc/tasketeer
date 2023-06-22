import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "@mui/material/Table";
import IconButton from "@mui/material/IconButton";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Skeleton from "@mui/material/Skeleton";
import FileUpload from "../../../components/FileUpload";
import OrganizationsService from "../../../services/organizations.service";
import TrashIcon from "../../../../../assets/icons/trash-icon.svg";
import { showSnackbar } from "../../../features/feedbackSlice";
import DeleteDialog from "../../../components/Dialog/DeleteDialog";
import Alerts from "../../../constants/alerts";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import { Box } from "@mui/material";
import { Description, Title } from "./FilesMUIStyles";
import TasketeerButton, {
  buttonCategories,
  buttonSize,
} from "../../../components/TasketeerButton";
import { styled } from "@mui/material";
import COLORS from "../../../utils/colors";

const HeaderTableCell = styled(TableCell)({
  borderBottom: `1px solid ${COLORS.neutral100}`,
  color: COLORS.neutral100,
  fontFamily: "Montserrat",
  fontSize: "16px",
  fontWeight: "600",
  lineHeight: "24px",
  padding: "16px 24px",
});
const BodyTableCell = styled(TableCell)({
  borderBottom: `1px solid ${COLORS.neutral800}`,
  fontFamily: "Montserrat",
  fontSize: "14px",
  padding: "16px 24px",
  fontWeight: "600",
});
const StyledTableRow = styled(TableRow)({
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
});

export default function FilesPage() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [indexing, setIndexing] = React.useState(false);
  const [files, setFiles] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [deleteDialog, setDeleteDialog] = React.useState(false);
  const [fileToDelete, setFileToDelete] = React.useState(null);
  const [canIndexFiles, setCanIndexFiles] = React.useState(false);
  const [uploadModalOpen, setUploadModalOpen] = React.useState(false);

  const fetchFiles = async () => {
    setLoading(true);
    const { files: loadedFiles } = await OrganizationsService.listFiles();
    setFiles(loadedFiles || []);
    setLoading(false);
  };

  const onClickDelete = (fileId) => {
    setFileToDelete(fileId);
    setDeleteDialog(true);
  };

  const onClickCancel = () => {
    setDeleteDialog(false);
    setFileToDelete(null);
  };

  const deleteFile = async () => {
    setDeleteDialog(false);
    const { success, errorMessage } = await OrganizationsService.deleteFile(
      fileToDelete
    );
    if (errorMessage) {
      dispatch(
        showSnackbar({
          message: errorMessage,
          type: Alerts.error,
        })
      );
    } else if (success) {
      dispatch(
        showSnackbar({
          message: "File deleted successfully",
          type: Alerts.success,
        })
      );
      await fetchFiles();
    }
  };

  const indexFiles = async () => {
    if (!canIndexFiles) {
      return;
    }
    setIndexing(true);
    const { success } = await OrganizationsService.indexFiles();
    setIndexing(false);
    setCanIndexFiles(!success);
    dispatch(
      showSnackbar({
        message: success
          ? "File Indexing started successfully!"
          : "There was an error running the file indexing.",
        type: success ? Alerts.success : Alerts.error,
      })
    );
  };

  React.useEffect(() => {
    setCanIndexFiles(user?.selected_organization?.can_index_files || false);
    const loadFiles = async () => {
      await fetchFiles();
    };
    loadFiles();
  }, []);

  const hasFiles = !loading && files.length > 0;

  return (
    <>
      <FileUpload
        onUpload={fetchFiles}
        isOpen={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
      />

      <Typography component="h1" variant="h3" sx={Title}>
        Index Content
      </Typography>
      <Typography component="p" variant="p" sx={Description}>
        To train Tasketeer's and enable accurate document search, please upload
        the relevant files. These could be internal documents, manuals, reports,
        etc.
      </Typography>

      <Box sx={{ paddingTop: "24px" }}>
        <TasketeerButton
          category={buttonCategories.primary}
          onClick={() => setUploadModalOpen(true)}
          text="Upload Files"
          size={buttonSize.large}
        />
      </Box>

      {hasFiles && (
        <div>
          <Box sx={{ float: "right", marginBottom: "9px" }}>
            <TasketeerButton
              disabled={!canIndexFiles || indexing}
              category={buttonCategories.secondary}
              onClick={() => indexFiles()}
              text="Index Content"
            />
          </Box>
          <Table
            size="small"
            sx={{
              backgroundColor: COLORS.neutral900,
              borderRadius: "16px",
            }}
          >
            <TableHead>
              <TableRow>
                <HeaderTableCell>File</HeaderTableCell>
                <HeaderTableCell>Date</HeaderTableCell>
                <HeaderTableCell>Status</HeaderTableCell>
                <HeaderTableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {loading &&
                Array(10)
                  .fill(0)
                  .map((_, i) => (
                    <StyledTableRow key={i}>
                      <BodyTableCell colSpan={4}>
                        <Skeleton variant="rectangular" height={36} />
                      </BodyTableCell>
                    </StyledTableRow>
                  ))}

              {!loading &&
                files.length > 0 &&
                files.map((file) => (
                  <StyledTableRow key={file.id}>
                    <BodyTableCell>{file.name}</BodyTableCell>
                    <BodyTableCell>
                      {dayjs(file.created_at).format("YYYY-MM-DD")}
                    </BodyTableCell>
                    <BodyTableCell>
                      {file.indexed_at ? <>Indexed</> : <>Not Indexed</>}
                    </BodyTableCell>
                    <BodyTableCell>
                      <IconButton onClick={() => onClickDelete(file.id)}>
                        <img src={TrashIcon} />
                      </IconButton>
                    </BodyTableCell>
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      )}

      <DeleteDialog
        open={deleteDialog}
        description='This action will permanently delete the file. In order to apply these changes to the index, you will need to click the "Index Content" button.'
        onDelete={deleteFile}
        onCancel={onClickCancel}
      />
    </>
  );
}
