import TextField from "@mui/material/TextField";
import { styled } from "@mui/material";
import COLORS from "../../utils/colors";

const InputField = styled(TextField)({
  "& label.Mui-focused": {
    color: COLORS.primary200,
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      border: `2px solid ${COLORS.neutral500}`,
      borderRadius: "12px",
    },
    "&:hover fieldset": {
      border: `2px solid ${COLORS.secondary100}`,
    },
    "&.Mui-focused fieldset": {
      border: `2px solid ${COLORS.primary200}`,
    },
  },
});

export default InputField;
