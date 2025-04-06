import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { Provider } from 'react-redux';
import { FC, ReactNode } from "react";
import Page from "./Pages";
import { store } from "./redux/store";

const App: FC = () => {
  return (
    <ProviderWrapper>
      <CssBaseline />
      <Page />
    </ProviderWrapper>
  );
};

const ProviderWrapper: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    // <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </Provider>
  );
};
const theme = createTheme({
  palette: {
    primary: {
      main: "#244D59",
      light: "#E8E8E8",
      dark: "#0C1F31",
    },
    secondary: {
      main: "#DB7A18",
    },
  },
  typography: {
    fontFamily: ["Open Sans", "sans-serif"].join(","),
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
            width: "6px",
            height: "6px",
          },
          "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
            borderRadius: 8,
            backgroundColor: "#244D59",
            minHeight: 200,
          },
        },
      },
    },
  },
});

export default App;
