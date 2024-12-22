import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
  useMemo,
} from "react";
import { type SortingState } from "@tanstack/react-table";
import { type Filter } from "@/utils/mock";
import { EMPTY_LIST, EMPTY_OBJECT } from "@/utils/utils";

type Views = Record<string, {
  sortingState: SortingState;
  filterState: Filter;
}>;

type TableContextType = {
  sortingState: SortingState;
  setSortingState: React.Dispatch<React.SetStateAction<SortingState>>;
  filterState: Filter;
  setFilterState: React.Dispatch<React.SetStateAction<Filter>>;
  columns: string[];
  setColumns: React.Dispatch<React.SetStateAction<string[]>>;
  views: Views;
  setViews: React.Dispatch<React.SetStateAction<Views>>;
};

const TableContext = createContext<TableContextType | undefined>(undefined);

export const TableProvider = ({ children }: { children: ReactNode }) => {
  const [sortingState, setSortingState] = useState<SortingState>(EMPTY_LIST);
  const [filterState, setFilterState] = useState<Filter>(EMPTY_LIST);
  const [columns, setColumns] = useState<string[]>(EMPTY_LIST);
  const [views, setViews] = useState<Views>(EMPTY_OBJECT);

  const value = useMemo(
    () => ({ sortingState, setSortingState, filterState, setFilterState, columns, setColumns, views, setViews }),
    [sortingState, filterState, columns, views],
  );

  return (
    <TableContext.Provider
      value={value}
    >
      {children}
    </TableContext.Provider>
  );
};

export const useTableContext = () => {
  const context = useContext(TableContext);
  if (!context) {
    throw new Error("useTableContext must be used within a TableProvider");
  }
  return context;
};
