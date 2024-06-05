import { IUser, IUserPartial } from '@/types/user'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface userState {
  userData: IUserPartial[] | null
}

const initialState: userState = {
  userData: null,
}

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<IUser[] | null>) => {
      if (action.payload) {
        const userMapped = action.payload.map((user: IUser) => {
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            city: user.address.city,
            lat: parseFloat(user.address.geo.lat),
            lng: parseFloat(user.address.geo.lng),
          }
        })
        state.userData = userMapped
      } else {
        state.userData = null
      }
    },
    addUserData: (state, action: PayloadAction<IUserPartial>) => {
      if (state.userData) {
        state.userData.unshift(action.payload)
      } else {
        state.userData = [action.payload]
      }
    },
    deleteUserData: (state, action: PayloadAction<number>) => {
      if (state.userData) {
        const index = state.userData.findIndex(
          (user) => user.id === action.payload,
        )
        state.userData.splice(index, 1)
      }
    },
  },
})

export const { setUserData, addUserData, deleteUserData } = userSlice.actions
export default userSlice.reducer
