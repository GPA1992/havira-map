import { configureStore } from '@reduxjs/toolkit'
import userReducer from '@/lib/features/users/userSlice'
import squareZoomReducer from '@/lib/features/squareZoom/squareZoomSlice'
export const makeStore = () => {
  return configureStore({
    reducer: {
      users: userReducer,
      squareZoom: squareZoomReducer,
    },
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
