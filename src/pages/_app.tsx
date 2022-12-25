import { createTheme, ThemeProvider } from "@mui/material";
import type { AppProps } from "next/app";

import * as moment from "moment";
import "moment/locale/pt-br";

import { SessionProvider as NextAuthProvider } from "next-auth/react";

import "../styles/global.scss";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

moment.locale("pt-br");

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
        <ToastContainer
          position="top-right"
          newestOnTop
          closeOnClick
          pauseOnFocusLoss={false}
          pauseOnHover
          theme="dark"
        />
      </ThemeProvider>
    </NextAuthProvider>
  );
}
