import { selectBases } from "@/store/reducers/baseSlice";
import { selectSelectedBase, setSelectedTable } from "@/store/reducers/menuSlice";
import { addManyBaseTables } from "@/store/reducers/tableSlice";
import { fetchTableMetadata } from "@/utils/mock";
import { Box, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import TableMenuItem from "./TableMenuItems";

export default function TableNavigation() {
  const selectedBaseId = useSelector(selectSelectedBase);
  const bases = useSelector(selectBases);
  const dispatch = useDispatch();

  const selectedBase = useMemo(() => {
    return bases.find((base) => base.id === selectedBaseId);
  }, [bases, selectedBaseId]);

  const { data: tables } = useQuery(tableMetadataQueryOptions(selectedBase?.tables ?? []));

  useEffect(() => {
    if (tables) {
      dispatch(setSelectedTable(tables[0]?.id));
      dispatch(addManyBaseTables(tables));
    }
  }, [dispatch, tables]);

  if (!tables) { 
    return <Typography>Loading...</Typography>
  }

  return (
    <Box className="table-navigation flex flex-row gap-2">
      {tables.map((table) => (
        <TableMenuItem key={table.id} table={table} />
      ))}
    </Box>
  )
}

export const tableMetadataQueryOptions = (ids: string[]) => {
  return {
    queryKey: ['tableMetadata', ids.join(',')],
    queryFn: async () => {
      const response = await fetchTableMetadata(ids);
      return response;
    },
    enable: !!ids.length,
  }
}