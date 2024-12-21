import { validEmail } from "@/utils/utils";
import { type Theme } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import GoogleIcon from "@mui/icons-material/Google";
import AppleIcon from "@mui/icons-material/Apple";
import { useSnackbar } from "notistack";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";

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

  const screenSx = useCallback(
    (theme: Theme) => ({
      background: theme.palette.background.default,
    }),
    [],
  );

  const { enqueueSnackbar } = useSnackbar();

  const onClickUnsupportedLogin = useCallback(() => {
    enqueueSnackbar("Unsupported login method", {
      variant: "error",
    });
  }, [enqueueSnackbar]);

  const router = useRouter();
  const { status } = useSession();
  const onClickLogin = useCallback(async () => {
    await signIn("google");
  }, []);

  useEffect(() => {
    if (status === "authenticated") {
      void router.push("/dashboard");
    }
  }, [status, router]);

  return (
    <Box sx={screenSx} className="flex min-h-screen flex-col">
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
            onClick={onClickUnsupportedLogin}
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
              onClick={onClickLogin}
            >
              Sign in with Google
            </Button>
            <Button
              onClick={onClickUnsupportedLogin}
              fullWidth
              variant="outlined"
              color="accent"
            >
              Sign in with Single Sign On
            </Button>
            <Button
              onClick={onClickUnsupportedLogin}
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
            priority
            width={445}
            height={662}
          />
        </div>
      </Box>
    </Box>
  );
}
