import { type AppType } from "next/app";
import { CssBaseline, StyledEngineProvider } from "@mui/material";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import MuiThemeProvider from "@/providers/MuiThemeProvider";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <SessionProvider>
      <StyledEngineProvider injectFirst>
        <CssBaseline />
        <MuiThemeProvider>
          <Component {...pageProps} />
        </MuiThemeProvider>
      </StyledEngineProvider>
    </SessionProvider>
  )
};

export default MyApp;
