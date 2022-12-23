import { createTheme, ThemeProvider } from "@mui/material";
import type { AppProps } from "next/app";

import "../styles/global.scss";

const theme = createTheme({
  palette: {
    primary: {
      main: "#404eed",
    },
    success: {
      main: "#1AAE9F",
    },
  },
});

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
