import { createTheme, ThemeProvider } from "@mui/material";
import type { AppProps } from "next/app";

import { SessionProvider as NextAuthProvider } from "next-auth/react";

import "../styles/global.scss";

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#1F6FEB",
    },
    success: {
      main: "#1AAE9F",
    },
  },
});

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextAuthProvider session={pageProps.session}>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </NextAuthProvider>
  );
}
