import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { grey } from "@mui/material/colors";

const SlackButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(grey[50]),
  backgroundColor: grey[50],
  "&:hover": {
    backgroundColor: grey[100],
  },
  borderRadius: 12,
  textTransform: "none",
  padding: "12px 0",
}));

export default SlackButton;
