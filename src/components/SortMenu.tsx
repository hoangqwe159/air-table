import React, { useState, useCallback } from "react";
import { Button, DialogActions, DialogContent, TextField, Typography, MenuItem, IconButton } from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import { useTableContext } from "@/context/TableContext";
import { type ColumnSort, type SortingState } from "@tanstack/react-table";
import { usePrefetchTableData } from "@/hooks/usePrefetchTableData";
import { useSelector } from "react-redux";
import { selectSelectedTable } from "@/store/reducers/menuSlice";

export default function SortMenu({ onClose }: { onClose: () => void }) {
  const { sortingState, setSortingState, columns, filterState } = useTableContext();
  const [sortConditions, setSortConditions] = useState<SortingState>(sortingState || []);
  const selectedTableId = useSelector(selectSelectedTable);

  const handleAddSortCondition = useCallback(() => {
    setSortConditions((prevConditions) => [
      ...prevConditions,
      { id: "", desc: false },
    ]);
  }, []);

  const handleRemoveSortCondition = useCallback((index: number) => {
    setSortConditions((prevConditions) => prevConditions.filter((_, i) => i !== index));
  }, []);

  const handleSortConditionChange = useCallback((index: number, field: keyof ColumnSort, value: string | boolean) => {
    setSortConditions((prevConditions) =>
      prevConditions.map((condition, i) =>
        i === index ? { ...condition, [field]: value } : condition
      )
    );
  }, []);

  const cleanedSortConditions = sortConditions.filter((condition) => condition.id);
  const { onMouseEnter } = usePrefetchTableData(selectedTableId, cleanedSortConditions, filterState);

  const handleSave = useCallback(() => {
    setSortingState(cleanedSortConditions);
    onClose();
  }, [cleanedSortConditions, setSortingState, onClose]);

  return (
    <div className="w-[500px] max-w-[80vw]">
      <DialogContent>
        <Typography>Sort records by</Typography>
        {sortConditions.map((condition, index) => (
          <div key={index} className="flex items-center space-x-2 my-2">
            <TextField
              select
              size="small"
              value={condition.id}
              onChange={(e) => handleSortConditionChange(index, "id", e.target.value)}
              className="flex-1"
            >
              {columns.map((column) => (
                <MenuItem key={column} value={column}>
                  {column}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              size="small"
              value={condition.desc ? "desc" : "asc"}
              onChange={(e) => handleSortConditionChange(index, "desc", e.target.value === "desc")}
              className="flex-1"
            >
              <MenuItem value="asc">Ascending</MenuItem>
              <MenuItem value="desc">Descending</MenuItem>
            </TextField>
            <IconButton onClick={() => handleRemoveSortCondition(index)}>
              <Delete />
            </IconButton>
          </div>
        ))}
      </DialogContent>
      <DialogActions className="flex flex-row">
        <Button onClick={handleAddSortCondition} startIcon={<Add />}>
          Add sort condition
        </Button>
        <Button onMouseEnter={onMouseEnter} onClick={handleSave} variant="contained">
          Save
        </Button>
      </DialogActions>
    </div>
  );
}