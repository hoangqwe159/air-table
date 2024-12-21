import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface MenuData {
  selectedBase?: string;
  selectedTable?: string;
  selectedView?: string;
}

const initialState: MenuData = {
  selectedBase: undefined,
  selectedTable: undefined,
  selectedView: undefined,
};

export const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    hydrate: (state, action: PayloadAction<MenuData>): MenuData => action.payload,
    setSelectedBase: (state, action: PayloadAction<MenuData["selectedBase"]>) => {
      state.selectedBase = action.payload;
    },
    setSelectedTable: (state, action: PayloadAction<MenuData["selectedTable"]>) => {
      state.selectedTable = action.payload;
    },
    setSelectedView: (state, action: PayloadAction<MenuData["selectedView"]>) => {
      state.selectedView = action.payload;
    },
  },
});

export const { setSelectedBase, setSelectedTable, setSelectedView } = menuSlice.actions;

export const selectSelectedBase = (state: { menu: MenuData }) => state.menu.selectedBase;
export const selectSelectedTable = (state: { menu: MenuData }) => state.menu.selectedTable;
export const selectSelectedView = (state: { menu: MenuData }) => state.menu.selectedView;