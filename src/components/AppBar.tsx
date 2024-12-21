import {
  AppBar as MuiAppBar,
  Avatar,
  Button,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
  Menu,
  type Theme,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import HistoryIcon from "@mui/icons-material/History";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import { useSession } from "next-auth/react";
import { stringToColor } from "@/utils/utils";
import { useBaseData } from "@/hooks/useBaseData";
import { useSelector } from "react-redux";
import { selectBases } from "@/store/reducers/baseSlice";
import { selectSelectedBase } from "@/store/reducers/menuSlice";
import { useCallback, useMemo, useState } from "react";
import BaseMenuItem from "./BaseMenuItem";

const menuSlotProps = {
  paper: {
    elevation: 0,
    sx: {
      overflow: 'visible',
      filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
      mt: 1.5,
      '& .MuiAvatar-root': {
        width: 32,
        height: 32,
        ml: -0.5,
        mr: 1,
      },
      '&::before': {
        content: '""',
        display: 'block',
        position: 'absolute',
        top: 0,
        right: 14,
        width: 10,
        height: 10,
        bgcolor: 'background.paper',
        transform: 'translateY(-50%) rotate(45deg)',
        zIndex: 0,
      },
    },
  },
};

const transparentSx = {
  background: "transparent",
} as const;

const transformOrigin= { horizontal: 'right', vertical: 'top' } as const;
const anchorOrigin= { horizontal: 'right', vertical: 'bottom' } as const;

export default function AppBar() {
  const { data } = useSession();

  const baseData = useSelector(selectBases);
  const selectedBaseId = useSelector(selectSelectedBase);
  const selectedBase = useMemo(() => {
    return baseData.find((base) => base.id === selectedBaseId);
  }, [baseData, selectedBaseId]);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClickBase = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const iconButtonSx = useCallback((theme: Theme) => {
    return {
      background: theme.palette.background.paper,
    };
  }, []);

  const avatarSx = useCallback((_theme: Theme) => {
    return {
      background: stringToColor(data?.user?.name ?? "Unknown"),
      width: 32,
      height: 32,
    };
  }, [data]);

  useBaseData();

  return (
    <>
      <MuiAppBar position="static" color="primary" enableColorOnDark>
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
                sx={iconButtonSx}
              >
                <ArrowBackIcon fontSize="inherit" />
              </IconButton>
            </Tooltip>

            <Button
              sx={transparentSx}
              endIcon={<KeyboardArrowDownIcon />}
              disableRipple
              onClick={handleClickBase}
              disableFocusRipple
              color="paper"
            >
              <Typography>{selectedBase?.name ?? "Loading..."}</Typography>
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
                sx={iconButtonSx}
              >
                <NotificationsNoneOutlinedIcon fontSize="inherit" />
              </IconButton>
            </Tooltip>
            <Avatar
              sx={avatarSx}
            >
              <Typography>{data?.user?.name?.charAt(0) ?? "U"}</Typography>
            </Avatar>
          </div>
        </Toolbar>
      </MuiAppBar>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={Boolean(anchorEl)}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={menuSlotProps}
        transformOrigin={transformOrigin}
        anchorOrigin={anchorOrigin}
      >
        {baseData?.map((base) => {
          return (
            <BaseMenuItem key={base.id} data={base} handleClose={handleClose} />
          )
        })}
      </Menu>
    </>
  );
}