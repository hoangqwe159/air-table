import { type AppType, type AppProps } from "next/app";
import { CssBaseline, StyledEngineProvider } from "@mui/material";
import { SessionProvider } from "next-auth/react";
import MuiThemeProvider from "@/providers/MuiThemeProvider";
import SnackBarProvider from "@/providers/SnackBarProvider";
import { AppCacheProvider } from "@mui/material-nextjs/v14-pagesRouter";
import Head from "next/head";
import { Provider } from 'react-redux';
import { store } from "@/store/store";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

import "@/styles/globals.css";

const queryClient = new QueryClient();
const MyApp: AppType = (props: AppProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { Component, pageProps } = props;

  return (
    <AppCacheProvider {...props}>
      <Head>
        <title>Airtable</title>
        <meta name="description" content="Airtable login page" />
        <link rel="icon" href="/airtable.svg" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <StyledEngineProvider injectFirst>
      <MuiThemeProvider>
        <SnackBarProvider>
          <SessionProvider>
           <CssBaseline />
           <Provider store={store}>
            <QueryClientProvider client={queryClient}>
              <Component {...pageProps} />
            </QueryClientProvider>
           </Provider>
          </SessionProvider>
        </SnackBarProvider>
      </MuiThemeProvider>
      </StyledEngineProvider>
    </AppCacheProvider>
  );
};

export default MyApp;
