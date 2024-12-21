import {
  AppBar,
  Avatar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import HistoryIcon from "@mui/icons-material/History";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import { useSession } from "next-auth/react";
import { stringToColor } from "@/utils/utils";

export default function Dashboard() {
  const { data } = useSession();

  return (
    <Box className="min-h-screen w-full">
      <AppBar position="static" color="primary" enableColorOnDark>
        <Toolbar
          className="flex flex-row items-center justify-between"
          color="secondary"
        >
          <div className="flex flex-row items-center gap-2">
            <Tooltip title="Go Home" placement="right">
              <IconButton
                size="small"
                color="primary"
                aria-label="open drawer"
                disableRipple
                disableFocusRipple
                sx={(theme) => {
                  return {
                    background: theme.palette.background.paper,
                  };
                }}
              >
                <ArrowBackIcon fontSize="inherit" />
              </IconButton>
            </Tooltip>

            <Button
              sx={{
                background: "transparent",
              }}
              endIcon={<KeyboardArrowDownIcon />}
              disableRipple
              disableFocusRipple
              color="paper"
            >
              <Typography>Employee Portal</Typography>
            </Button>
            <Button size="small" color="paper">
              Data
            </Button>
            <Button size="small" color="paper">
              Automations
            </Button>
            <Button size="small" color="paper">
              Interfaces
            </Button>
            <Button size="small" color="paper">
              Forms
            </Button>
          </div>

          <div className="flex flex-row items-center gap-4">
            <Tooltip title="History" placement="bottom">
              <IconButton size="small" color="paper">
                <HistoryIcon fontSize="inherit" />
              </IconButton>
            </Tooltip>
            <Button
              size="small"
              color="paper"
              startIcon={<HelpOutlineOutlinedIcon />}
            >
              Help
            </Button>
            <Button variant="contained" color="paper">
              <Typography fontSize="inherit" color="secondary">
                Trial: 13 days left
              </Typography>
            </Button>
            <Tooltip title="Notifications" placement="bottom">
              <IconButton
                size="small"
                color="primary"
                aria-label="open drawer"
                disableRipple
                disableFocusRipple
                sx={(theme) => {
                  return {
                    background: theme.palette.background.paper,
                  };
                }}
              >
                <NotificationsNoneOutlinedIcon fontSize="inherit" />
              </IconButton>
            </Tooltip>
            <Avatar
              sx={{
                background: stringToColor(data?.user?.name ?? "Unknown"),
                width: 32,
                height: 32,
              }}
            >
              <Typography>{data?.user?.name?.charAt(0) ?? "U"}</Typography>
            </Avatar>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
