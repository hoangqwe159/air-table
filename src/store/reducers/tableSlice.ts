import { type PayloadAction, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { type RootState } from "../store";
import { type BaseTableData } from "./baseSlice";

const tableAdapter = createEntityAdapter<BaseTableData, string>({
    selectId: item => item.id,
});

export type BaseTableSliceData = ReturnType<(typeof tableAdapter)["getInitialState"]>;

export const tableSlice = createSlice({
    name: "table",
    initialState: tableAdapter.getInitialState(),
    reducers: {
        hydrate: (state, action: PayloadAction<BaseTableSliceData>): BaseTableSliceData => action.payload,
        addOneBaseTable: tableAdapter.addOne,
        setOneBaseTable: tableAdapter.setOne,
        updateOneBaseTable: tableAdapter.updateOne,
        removeOneBaseTable: tableAdapter.removeOne,
        removeAllBaseTables: tableAdapter.removeAll,
        setManyBaseTables: tableAdapter.setMany,
        addManyBaseTables: tableAdapter.addMany,
        removeManyBaseTables: tableAdapter.removeMany,
    },
});

export const {
    addOneBaseTable,
    setOneBaseTable,
    updateOneBaseTable,
    removeOneBaseTable,
    removeAllBaseTables,
    setManyBaseTables,
    addManyBaseTables,
    removeManyBaseTables,
} = tableSlice.actions;

// | Selectors
const tableSelectors = tableAdapter.getSelectors<RootState>(rootState => rootState.table);

export const selectDownloadTotal = tableSelectors.selectTotal;
export const selectDownloadIds = tableSelectors.selectIds;
export const selectDownloads = tableSelectors.selectAll;
export const selectDownloadById = tableSelectors.selectById;


