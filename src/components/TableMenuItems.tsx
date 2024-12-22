import { type BaseTableData } from "@/store/reducers/baseSlice";
import { selectSelectedTable, setSelectedTable } from "@/store/reducers/menuSlice";
import { fetchTableData, type PersonApiResponse } from "@/utils/mock";
import { Button, Typography } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSize } from "./TableContainer";
import { useTableContext } from "@/context/TableContext";

interface TableMenuItemProps {
  table: BaseTableData;
}

export default function TableMenuItem({ table }: TableMenuItemProps) {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { setFilterState, setSortingState } = useTableContext();
  
  const selectedTableId = useSelector(selectSelectedTable);
  const onClick = useCallback(() => {
    dispatch(setSelectedTable(table.id));
    setFilterState([]);
    setSortingState([]);
  }, [dispatch, setFilterState, setSortingState, table.id]);
  
  const onMouseEnter = useCallback(() => {
    void queryClient.prefetchInfiniteQuery<
        PersonApiResponse
      >({
        queryKey: [
          "tableData",
          table.id, //refetch when selected table changes
          [], //refetch when sorting changes
          [], //refetch when filter changes
        ],
        queryFn: async () => {
          const fetchedData = await fetchTableData(
            table.id ?? "",
            0,
            fetchSize,
            [],
            [],
          );
          return fetchedData;
        },
        initialPageParam: 0,
      });
  }, [queryClient, table.id]);

  return (
    <Button onMouseEnter={onMouseEnter} variant={selectedTableId === table.id ? "contained" : "outlined"} key={table.id} onClick={onClick}>
      <Typography>{table.name}</Typography>
    </Button>
  );
}