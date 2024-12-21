import {
  type PayloadAction,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { type RootState } from "../store";
import { type BaseTableViewData } from "./baseSlice";

const viewAdapter = createEntityAdapter<BaseTableViewData, string>({
  selectId: (item) => item.id,
});

export type BaseTableViewSliceData = ReturnType<
  (typeof viewAdapter)["getInitialState"]
>;

export const viewSlice = createSlice({
  name: "view",
  initialState: viewAdapter.getInitialState(),
  reducers: {
    hydrate: (
      state,
      action: PayloadAction<BaseTableViewSliceData>,
    ): BaseTableViewSliceData => action.payload,
    addOneBaseTableView: viewAdapter.addOne,
    setOneBaseTableView: viewAdapter.setOne,
    updateOneBaseTableView: viewAdapter.updateOne,
    removeOneBaseTableView: viewAdapter.removeOne,
    removeAllBaseTableViews: viewAdapter.removeAll,
    setManyBaseTableViews: viewAdapter.setMany,
    addManyBaseTableViews: viewAdapter.addMany,
    removeManyBaseTableViews: viewAdapter.removeMany,
  },
});

export const {
  addOneBaseTableView,
  setOneBaseTableView,
  updateOneBaseTableView,
  removeOneBaseTableView,
  removeAllBaseTableViews,
  setManyBaseTableViews,
  addManyBaseTableViews,
  removeManyBaseTableViews,
} = viewSlice.actions;

// | Selectors
const viewSelectors = viewAdapter.getSelectors<RootState>(
  (rootState) => rootState.view,
);

export const selectDownloadTotal = viewSelectors.selectTotal;
export const selectDownloadIds = viewSelectors.selectIds;
export const selectDownloads = viewSelectors.selectAll;
export const selectDownloadById = viewSelectors.selectById;
