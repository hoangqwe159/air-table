import type React from "react";
import { forwardRef, memo, useMemo, type PropsWithChildren } from "react";
import {
  SnackbarProvider as NotistackProvider,
  useSnackbar,
  type CustomContentProps,
} from "notistack";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

type SnackbarProviderProps = object;

export default memo(function SnackbarProvider({
  children,
}: PropsWithChildren<SnackbarProviderProps>): React.ReactElement {
  const anchorOrigin = useMemo(() => {
    return {
      vertical: "top",
      horizontal: "left",
    } as const;
  }, []);

  const Components = useMemo(
    () => ({
      success: CustomAlert,
      error: CustomAlert,
      warning: CustomAlert,
      info: CustomAlert,
      default: CustomAlert,
    }),
    [],
  );

  return (
    <NotistackProvider
      maxSnack={6}
      anchorOrigin={anchorOrigin}
      Components={Components}
    >
      {children}
    </NotistackProvider>
  );
});

type CustomAlertProps = CustomContentProps;

const CustomAlert = forwardRef<HTMLDivElement, CustomAlertProps>(
  ({ message, variant, id }, ref): React.ReactElement => {
    const { closeSnackbar } = useSnackbar();
    const closeAlert = useMemo(
      () => () => closeSnackbar(id),
      [closeSnackbar, id],
    );

    const CloseButton = useMemo(
      () => (
        <IconButton
          aria-label="close"
          color="inherit"
          size="small"
          onClick={closeAlert}
        >
          <CloseIcon fontSize="inherit" />
        </IconButton>
      ),
      [closeAlert],
    );

    const severity = useMemo(() => {
      switch (variant) {
        case "success":
          return "success";
        case "error":
          return "error";
        case "warning":
          return "warning";
        default:
          return "info";
      }
    }, [variant]);

    return (
      <Alert
        ref={ref}
        severity={severity}
        action={CloseButton}
        variant="filled"
        className="max-h-40"
      >
        {message}
      </Alert>
    );
  },
);

CustomAlert.displayName = "CustomAlert";
