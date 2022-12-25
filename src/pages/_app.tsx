import { createTheme, ThemeProvider } from "@mui/material";
import type { AppProps } from "next/app";

import * as moment from "moment";
import "moment/locale/pt-br";

import { SessionProvider as NextAuthProvider } from "next-auth/react";

import "../styles/global.scss";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { ReloadNotificationProps } from "../utils/Notify";
import { RELOAD_NOTIFICATION } from "../configs";

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
  useEffect(() => {
    const reloadNotification = sessionStorage.getItem(RELOAD_NOTIFICATION);

    if (reloadNotification) {
      const { message, type } = JSON.parse(
        reloadNotification
      ) as ReloadNotificationProps;

      toast(message, { type });

      sessionStorage.removeItem(RELOAD_NOTIFICATION);
    }
  }, []);

  return (
    <NextAuthProvider session={pageProps.session}>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
        <ToastContainer
          style={{
            minWidth: "40%",
          }}
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
