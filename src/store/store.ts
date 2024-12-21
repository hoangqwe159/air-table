import { configureStore } from '@reduxjs/toolkit'
import { baseSlice } from './reducers/baseSlice'
import { tableSlice } from './reducers/tableSlice'
import { viewSlice } from './reducers/viewSlice'
import { menuSlice } from './reducers/menuSlice'

export const store = configureStore({
  reducer: {
    base: baseSlice.reducer,
    table: tableSlice.reducer,
    view: viewSlice.reducer,
    menu: menuSlice.reducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch