import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
          /* Scrollbar styles */
          "::-webkit-scrollbar": {
              width: "3px",
              height: "3px", // For horizontal scroll
          },
          "::-webkit-scrollbar-track": {
              backgroundColor: "#f1f1f1",
              borderRadius: "10px",
          },
          "::-webkit-scrollbar-thumb": {
              backgroundColor: "#88898a",
              borderRadius: "10px",
              border: "none",
          },
          "::-webkit-scrollbar-thumb:hover": {
              backgroundColor: "#a3a3a3",
          },
      },
  },
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
    MuiTab: {
      styleOverrides: {
        root: {
          color: "#000000",
          minHeight: "15px",
          "&.Mui-selected": {
            backgroundColor: "#349eeb",
            color: "#ffffff",
            borderRadius: "25px",
            borderBottom: "none",
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          backgroundColor: "#ebeef0",
          alignItems: "center",
          borderRadius: "25px",
        },
        indicator: {
          display: "none",
          transition: "all 0.3s ease-in-out",
        },
      },
    },
  },
  typography: {
    fontFamily: "Inter, sans-serif",
    h1: {
      fontSize: 30,
      fontWeight: "bold",
      color: "#000000",
    },
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
