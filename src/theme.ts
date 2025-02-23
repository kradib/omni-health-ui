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
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#ffffff", // Change this to any color
          color: "#000000", // Text color
          boxShadow: "none",
          borderBottom: "3px solid rgb(211, 211, 212)",
        },
      },
    },
  },
  typography: {
    fontFamily: "Inter, sans-serif",
    h2: {
      fontSize: 16,
      fontWeight: "bold",
      color: "#000000",
    },
    h4: {
      fontWeight: "bold",
    },
    h5: {
      fontWeight: "bold",
      color: "#5aabed",
    },
    h6: {
      fontWeight: "bold",
      color: "#6a6b6b",
    },
    subtitle1: {
      fontSize: 14,
      color: "#6a6b6b",
    },
    subtitle2: {
      fontSize: 20,
      fontWeight: "bold",
      color: "#868787",
    },
    button: {
      textTransform: "none",
    },
  },
});

export default theme;
