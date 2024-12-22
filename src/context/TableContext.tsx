// filepath: /Users/hoangqwe159/viet-trinoor/air-table/src/context/TableContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
  useMemo,
} from "react";
import { type SortingState } from "@tanstack/react-table";
import { type Filter } from "@/utils/mock";

type TableContextType = {
  sortingState: SortingState;
  setSortingState: React.Dispatch<React.SetStateAction<SortingState>>;
  filterState: Filter;
  setFilterState: React.Dispatch<React.SetStateAction<Filter>>;
  columns: string[];
  setColumns: React.Dispatch<React.SetStateAction<string[]>>;
};

const TableContext = createContext<TableContextType | undefined>(undefined);

export const TableProvider = ({ children }: { children: ReactNode }) => {
  const [sortingState, setSortingState] = useState<SortingState>([]);
  const [filterState, setFilterState] = useState<Filter>([]);
  const [columns, setColumns] = useState<string[]>([]);

  const value = useMemo(
    () => ({ sortingState, setSortingState, filterState, setFilterState, columns, setColumns }),
    [sortingState, setSortingState, filterState, setFilterState, columns, setColumns],
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
