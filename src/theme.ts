import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          "&.Mui-disabled": {
            backgroundColor: "#90CAF9", // Light Blue
            color: "#ffffff", // White text
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: "10px", // Change border radius here
        },
      },
    },
  },
  typography: {
    fontFamily: "Inter, sans-serif",
    h4: {
      fontWeight: "bold",
    },
    subtitle1: {
      fontSize: 14,
      color: "#6a6b6b",
    },
    button: {
      textTransform: "none",
    },
  },
});

export default theme;
