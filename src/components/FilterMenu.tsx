import React, { useState, useCallback, useMemo } from "react";
import {
  Button,
  DialogActions,
  Typography,
  DialogContent,
  TextField,
  MenuItem,
  IconButton,
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import { useTableContext } from "@/context/TableContext";
import { useSelector } from "react-redux";
import { selectSelectedTable } from "@/store/reducers/menuSlice";
import { usePrefetchTableData } from "@/hooks/usePrefetchTableData";

export type FilterCondition = {
  column: string;
  operator:
    | "contains"
    | "notContains"
    | "equals"
    | "notEquals"
    | "empty"
    | "notEmpty";
  type: "and" | "or";
  value?: string | number;
};

export type Filter = FilterCondition[];

const operators = [
  "contains",
  "notContains",
  "equals",
  "notEquals",
  "empty",
  "notEmpty",
];
const type = ["and", "or"];

export default function FilterMenu({ onClose }: { onClose: () => void }) {
  const { filterState, setFilterState, columns, sortingState } = useTableContext();
  const [conditions, setConditions] = useState<Filter>(filterState || []);
  const selectedTableId = useSelector(selectSelectedTable);
  const handleAddCondition = useCallback(() => {
    setConditions((prevConditions) => [
      ...prevConditions,
      { column: "", operator: "contains", type: "and", value: "" },
    ]);
  }, []);

  const handleRemoveCondition = useCallback((index: number) => {
    setConditions((prevConditions) =>
      prevConditions.filter((_, i) => i !== index),
    );
  }, []);

  const handleConditionChange = useCallback(
    (index: number, field: keyof FilterCondition, value: string | number) => {
      setConditions((prevConditions) =>
        prevConditions.map((condition, i) =>
          i === index ? { ...condition, [field]: value } : condition,
        ),
      );
    },
    [],
  );

  const cleanedConditions = useMemo(() => conditions.filter((condition) => condition.column && condition.value), [conditions]);
  const { onMouseEnter } = usePrefetchTableData(selectedTableId, sortingState, cleanedConditions);

  const handleSave = useCallback(() => {
    setFilterState(cleanedConditions);
    onClose();
  }, [cleanedConditions, setFilterState, onClose]);

  return (
    <div className="w-[500px] max-w-[80vw]">
      <DialogContent>
        <Typography>In this view, show records</Typography>
        {conditions.map((condition, index) => (
          <div key={index} className="my-2 flex items-center space-x-2">
            {index === 0 ? (
              <Typography>Where</Typography>
            ) : (
              <TextField
                select
                size="small"
                value={condition.type}
                onChange={(e) =>
                  handleConditionChange(index, "type", e.target.value)
                }
                className="flex-1"
                disabled={index === 0}
              >
                {type.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </TextField>
            )}
            <TextField
              select
              size="small"
              value={condition.column}
              onChange={(e) =>
                handleConditionChange(index, "column", e.target.value)
              }
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
              value={condition.operator}
              onChange={(e) =>
                handleConditionChange(index, "operator", e.target.value)
              }
              className="flex-1"
            >
              {operators.map((operator) => (
                <MenuItem key={operator} value={operator}>
                  {operator}
                </MenuItem>
              ))}
            </TextField>
            {condition.operator !== "empty" &&
              condition.operator !== "notEmpty" && (
                <TextField
                  size="small"
                  value={condition.value}
                  onChange={(e) =>
                    handleConditionChange(index, "value", e.target.value)
                  }
                  className="flex-1"
                />
              )}
            <IconButton onClick={() => handleRemoveCondition(index)}>
              <Delete />
            </IconButton>
          </div>
        ))}
      </DialogContent>
      <DialogActions className="flex flex-row">
        <Button onClick={handleAddCondition} startIcon={<Add />}>
          Add condition
        </Button>
        <Button onMouseEnter={onMouseEnter} onClick={handleSave} variant="contained">
          Save
        </Button>
      </DialogActions>
    </div>
  );
}
