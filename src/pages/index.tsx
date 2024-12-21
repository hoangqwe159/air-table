import { validEmail } from "@/utils/utils";
import {
  Box,
  Button,
  Divider,
  Link,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import Head from "next/head";
import Image from "next/image";
import { useCallback, useMemo, useState } from "react";
import GoogleIcon from "@mui/icons-material/Google";
import AppleIcon from "@mui/icons-material/Apple";

export default function Home() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleEmailChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setEmail(value);
      if (value && !validEmail(value)) {
        setEmailError("Invalid email address");
      } else {
        setEmailError("");
      }
    },
    [],
  );

  const googleIcon = useMemo(() => {
    return <GoogleIcon />;
  }, []);

  const appleIcon = useMemo(() => {
    return <AppleIcon />;
  }, []);

  return (
    <>
      <Head>
        <title>Airtable | Login Page</title>
        <meta name="description" content="Airtable login page" />
        <link rel="icon" href="/airtable.svg" />
      </Head>
      <main className="flex min-h-screen flex-col">
        <Box className="flex h-full w-full flex-row">
          <div className="flex flex-1 flex-col items-center justify-center gap-6 p-12">
            <Image
              src="/airtable-1200x600.webp"
              alt="Airtable Logo"
              width={120}
              height={60}
            />
            <div className="flex w-full flex-col items-center">
              <Typography variant="h5" fontWeight={"bold"}>
                Sign in
              </Typography>
              <Typography>
                or <Link href={"/create"}>create an account</Link>
              </Typography>
            </div>
            <div className="flex w-full flex-col items-center gap-2">
              <Typography variant="h6" className="w-full" align="left">
                Email
              </Typography>
              <TextField
                variant="outlined"
                size="small"
                placeholder="Email"
                fullWidth
                value={email}
                onChange={handleEmailChange}
                error={Boolean(emailError)}
                helperText={emailError}
              />
            </div>
            <Button
              disabled={!!emailError || !email}
              fullWidth
              variant="contained"
              color="primary"
            >
              Continue
            </Button>
            <div className="flex w-full flex-row items-center justify-center gap-4">
              <Divider className="flex-1" />
              <Typography color="default">or</Typography>
              <Divider className="flex-1" />
            </div>
            <div className="flex w-full flex-col items-center gap-2">
              <Button
                startIcon={googleIcon}
                fullWidth
                variant="outlined"
                color="accent"
              >
                Sign in with Google
              </Button>
              <Button fullWidth variant="outlined" color="accent">
                Sign in with Single Sign On
              </Button>
              <Button
                startIcon={appleIcon}
                fullWidth
                variant="outlined"
                color="accent"
              >
                Sign in with Apple
              </Button>
            </div>
          </div>
          <div className="hidden flex-1 flex-col items-center p-12 sm:flex">
            <Image
              className="rounded-3xl"
              src="/login-intro-445x662.webp"
              alt="Airtable Logo"
              width={445}
              height={662}
            />
          </div>
        </Box>
      </main>
    </>
  );
}
