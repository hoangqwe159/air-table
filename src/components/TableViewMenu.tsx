import React, { useState, useCallback } from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import { useTableContext } from "@/context/TableContext";

export default function TableViewMenu() {
  const { views, setSortingState, setFilterState } = useTableContext();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelectView = useCallback((viewName: string) => {
    const selectedView = views[viewName];
    setSortingState(selectedView?.sortingState ?? []);
    setFilterState(selectedView?.filterState ?? []);

    handleClose();
  }, [views, setSortingState, setFilterState]);

  return (
    <div className="p-4">
      <Button variant="contained" onClick={handleClick}>
        Select View
      </Button>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {Object.keys(views).map((viewName) => (
          <MenuItem
            key={viewName}
            onClick={() => handleSelectView(viewName)}
          >
            {viewName}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}