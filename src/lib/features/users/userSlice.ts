import { IUser } from '@/types/user'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface userState {
  userData: IUser[] | null
  userRefetch: (() => void) | null
}

const initialState: userState = {
  userData: null,
  userRefetch: null,
}

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<IUser[] | null>) => {
      state.userData = action.payload
    },
    setUserRefetch: (state, action: PayloadAction<(() => void) | null>) => {
      state.userRefetch = action.payload
    },
  },
})

export const { setUserData, setUserRefetch } = userSlice.actions
export default userSlice.reducer
