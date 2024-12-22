import { type BaseData } from "@/store/reducers/baseSlice";
import { setSelectedBase } from "@/store/reducers/menuSlice";
import { MenuItem, Typography } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { tableMetadataQueryOptions } from "./TableNavigation";

interface BaseMenuItemProps {
  data: BaseData;
  handleClose: () => void;
}

export default function BaseMenuItem({
  data,
  handleClose,
}: BaseMenuItemProps) {
  const queryClient = useQueryClient();

  const dispatch = useDispatch();
  const onClick = useCallback(() => {
    handleClose();
    dispatch(setSelectedBase(data.id));
  }, [handleClose, dispatch, data.id]);

  const onHover = useCallback(() => {
    void queryClient.prefetchQuery(tableMetadataQueryOptions(data.tables));
  }, [queryClient, data.tables]);

  return (
    <MenuItem onMouseEnter={onHover} onClick={onClick}>
      <Typography>{data.name}</Typography>
    </MenuItem>
  );
}