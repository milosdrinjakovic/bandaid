import { configureStore } from '@reduxjs/toolkit'
import sidebarSlice from './features/sidebarSlice'
import textsSlice from './features/textsSlice'


export const store = configureStore({
  reducer: {
    sidebar: sidebarSlice,
    texts: textsSlice
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch