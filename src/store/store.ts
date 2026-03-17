import { configureStore } from '@reduxjs/toolkit'
import { counterSlice } from '../counter/counterSlice'

export const store = configureStore({
  reducer: { todo: counterSlice.reducer },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch