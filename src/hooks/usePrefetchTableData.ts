import { fetchSize } from "@/components/TableContainer";
import { fetchTableData, type Filter, type PersonApiResponse } from "@/utils/mock";
import { useQueryClient } from "@tanstack/react-query";
import { type SortingState } from "@tanstack/react-table";
import { useCallback } from "react";

export function usePrefetchTableData(tableId: string | undefined, sortingState: SortingState, filter: Filter) {
    const queryClient = useQueryClient();
    const onMouseEnter = useCallback(() => {
      void queryClient.prefetchInfiniteQuery<
          PersonApiResponse
        >({
          queryKey: [
            "tableData",
            tableId, //refetch when selected table changes
            sortingState, //refetch when sorting changes
            filter, //refetch when filter changes
          ],
          queryFn: async () => {
            const fetchedData = await fetchTableData(
              tableId ?? "",
              0,
              fetchSize,
              sortingState,
              filter,
            );
            return fetchedData;
          },
          initialPageParam: 0,
        });
    }, [filter, queryClient, sortingState, tableId]);

    return { onMouseEnter };
}