import { type PayloadAction, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { type RootState } from "../store";

export interface BaseData {
  id: string;
  name: string;
  tables: BaseTableData["id"][];
}

export interface BaseTableData {
  id: string;
  name: string;
  views: BaseTableViewData["id"][];
}

export interface BaseTableViewData {
  id: string;
  name: string;
  state: Record<string, unknown>;
}

const baseAdapter = createEntityAdapter<BaseData, string>({
    selectId: item => item.id,
});

export type BaseSliceData = ReturnType<(typeof baseAdapter)["getInitialState"]>;

export const baseSlice = createSlice({
    name: "base",
    initialState: baseAdapter.getInitialState(),
    reducers: {
        hydrate: (state, action: PayloadAction<BaseSliceData>): BaseSliceData => action.payload,
        addOneBase: baseAdapter.addOne,
        setOneBase: baseAdapter.setOne,
        updateOneBase: baseAdapter.updateOne,
        removeOneBase: baseAdapter.removeOne,
        removeAllBases: baseAdapter.removeAll,
        setManyBases: baseAdapter.setMany,
        addManyBases: baseAdapter.addMany,
        removeManyBases: baseAdapter.removeMany,
    },
});

export const {
  addOneBase,
  setOneBase,
  updateOneBase,
  removeOneBase,
  removeAllBases,
  setManyBases,
  addManyBases,
  removeManyBases,
} = baseSlice.actions;

// | Selectors
const baseSelectors = baseAdapter.getSelectors<RootState>(rootState => rootState.base);

export const selectBaseTotal = baseSelectors.selectTotal;
export const selectBaseIds = baseSelectors.selectIds;
export const selectBases = baseSelectors.selectAll;
export const selectBaseById = baseSelectors.selectById;


