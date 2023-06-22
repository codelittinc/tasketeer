import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    // primary: {
    //   main: '#2C5DD9',
    // },
    // secondary: {
    //   main: '#d40390',
    // },
  },
  components: {
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
