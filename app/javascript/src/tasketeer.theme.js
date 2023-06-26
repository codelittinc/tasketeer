import { createTheme } from "@mui/material/styles";
import COLORS from "./utils/colors";

const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: COLORS.neutral1000,
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: COLORS.neutral1000,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          fontFamily: "Montserrat",
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: "Montserrat",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "& input:-webkit-autofill": {
            WebkitBoxShadow: "0 0 0 100px #152739 inset",
            fontFamily: "Montserrat",
          },
        },
      },
    },
  },
});

export default theme;
