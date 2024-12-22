import { anchorOrigin, menuSlotProps, transformOrigin } from "@/utils/utils";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import { useCallback, useEffect, useState } from "react";
import FilterMenu from "./FilterMenu";
import SortMenu from "./SortMenu";
import { useTableContext } from "@/context/TableContext";
import {
  type InfiniteData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import {
  addTableData,
  generatePerson,
  type PersonApiResponse,
  type Person,
  addTableDataButCanFail,
} from "@/utils/mock";
import { useSelector } from "react-redux";
import { selectSelectedTable } from "@/store/reducers/menuSlice";
import { useSnackbar } from "notistack";

export default function TableActionMenu() {
  const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(
    null,
  );
  const [sortAnchorEl, setSortAnchorEl] = useState<null | HTMLElement>(null);
  const selectedTableId = useSelector(selectSelectedTable);
  const queryClient = useQueryClient();
  const { columns, sortingState, filterState } = useTableContext();

  const { enqueueSnackbar } = useSnackbar();

  const handleCloseFilter = useCallback(() => {
    setFilterAnchorEl(null);
  }, []);

  const handleCloseSort = useCallback(() => {
    setSortAnchorEl(null);
  }, []);

  const handleClickFilter = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      setFilterAnchorEl(event.currentTarget);
    },
    [],
  );

  const handleClickSort = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      setSortAnchorEl(event.currentTarget);
    },
    [],
  );

  const { mutate, isPending } = useMutation({
    mutationFn: (newPersons: Person[]) =>
      addTableData(selectedTableId ?? "", newPersons),

    onMutate: async (variables) => {
      await queryClient.cancelQueries({
        queryKey: ["tableData", selectedTableId, sortingState, filterState],
        exact: false,
      });

      const previousData = queryClient.getQueryData<InfiniteData<PersonApiResponse>>(
        ["tableData", selectedTableId, sortingState, filterState]
      );

      queryClient.setQueryData<InfiniteData<PersonApiResponse>>(
        ["tableData", selectedTableId, sortingState, filterState],
        (oldData) => {
          const newPages = [...(oldData?.pages ?? [])];

          let totalPages = 0;
          for (const page of newPages) {
            totalPages += page.data.length;
          }

          const lastIndex = newPages.length - 1;
          const oldTotalRowCount = newPages[lastIndex]?.meta.totalRowCount ?? 0;

          if (totalPages < oldTotalRowCount) {
            return {
              pageParams: oldData?.pageParams ?? [],
              pages: newPages.map((page) => {
                return {
                  data: [...page.data],
                  meta: {
                    totalRowCount: oldTotalRowCount + variables.length,
                  },
                };
              }),
            };
          } else {
            return {
              pageParams: oldData?.pageParams ?? [],
              pages: newPages.map((page, index) => {
                return {
                  data:
                    index === lastIndex
                      ? [...page.data, ...variables]
                      : [...page.data],
                  meta: {
                    totalRowCount: oldTotalRowCount + variables.length,
                  },
                };
              }),
            };
          }
        },
      );

      return previousData;
    },
    onError: (err, newPersons, previousData) => {
      queryClient.setQueryData<InfiniteData<PersonApiResponse>>(
        ["tableData", selectedTableId, sortingState, filterState],
        () => {
          return previousData;
        },
      );
    },
    mutationKey: ["addTableData", selectedTableId],
  });

  const { mutate: canFailMutate, isError, isPending: canFailPending } = useMutation({
    mutationFn: (newPersons: Person[]) =>
      addTableDataButCanFail(selectedTableId ?? "", newPersons),

    onMutate: async (variables) => {
      await queryClient.cancelQueries({
        queryKey: ["tableData", selectedTableId, sortingState, filterState],
        exact: false,
      });

      const previousData = queryClient.getQueryData<InfiniteData<PersonApiResponse>>(
        ["tableData", selectedTableId, sortingState, filterState]
      );

      queryClient.setQueryData<InfiniteData<PersonApiResponse>>(
        ["tableData", selectedTableId, sortingState, filterState],
        (oldData) => {
          const newPages = [...(oldData?.pages ?? [])];

          let totalPages = 0;
          for (const page of newPages) {
            totalPages += page.data.length;
          }

          const lastIndex = newPages.length - 1;
          const oldTotalRowCount = newPages[lastIndex]?.meta.totalRowCount ?? 0;

          if (totalPages < oldTotalRowCount) {
            return {
              pageParams: oldData?.pageParams ?? [],
              pages: newPages.map((page) => {
                return {
                  data: [...page.data],
                  meta: {
                    totalRowCount: oldTotalRowCount + variables.length,
                  },
                };
              }),
            };
          } else {
            return {
              pageParams: oldData?.pageParams ?? [],
              pages: newPages.map((page, index) => {
                return {
                  data:
                    index === lastIndex
                      ? [...page.data, ...variables]
                      : [...page.data],
                  meta: {
                    totalRowCount: oldTotalRowCount + variables.length,
                  },
                };
              }),
            };
          }
        },
      );

      return previousData;
    },
    onError: (err, newPersons, previousData) => {
      queryClient.setQueryData<InfiniteData<PersonApiResponse>>(
        ["tableData", selectedTableId, sortingState, filterState],
        () => {
          return previousData;
        },
      );
    },
    mutationKey: ["addTableData", selectedTableId],
  });

  useEffect(() => {
    if (isError) {
      enqueueSnackbar("Failed to add rows", { variant: "error" });
    }
  }, [enqueueSnackbar, isError]);

  const handleClickAddRows = useCallback(() => {
    mutate(Array.from({ length: 15000 }, generatePerson));
  }, [mutate]);

  const handleClickAddRowsCanFail = useCallback(() => {
    canFailMutate(Array.from({ length: 100 }, generatePerson));
  }, [canFailMutate]);

  if (!columns?.length) {
    return <>Loading...</>;
  }

  return (
    <>
      <Box className="flex items-center gap-2">
        <Button variant="contained" onClick={handleClickFilter}>
          Filter menu
        </Button>
        <Button variant="contained" onClick={handleClickSort}>
          Sort menu
        </Button>
        <Button variant="outlined" onClick={handleClickAddRows}>
          {isPending ? "Adding rows..." : "Add 15k rows"}
        </Button>
        <Button variant="outlined" onClick={handleClickAddRowsCanFail}>
          {canFailPending ? "Adding rows..." : "Add 100 rows (can fail)"}
        </Button>
      </Box>
      <Menu
        anchorEl={filterAnchorEl}
        open={Boolean(filterAnchorEl)}
        onClose={handleCloseFilter}
        slotProps={menuSlotProps}
        transformOrigin={transformOrigin}
        anchorOrigin={anchorOrigin}
      >
        <FilterMenu onClose={handleCloseFilter} />
      </Menu>
      <Menu
        anchorEl={sortAnchorEl}
        open={Boolean(sortAnchorEl)}
        onClose={handleCloseSort}
        slotProps={menuSlotProps}
        transformOrigin={transformOrigin}
        anchorOrigin={anchorOrigin}
      >
        <SortMenu onClose={handleCloseSort} />
      </Menu>
    </>
  );
}
