import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface squareZoomState {
  lat: number
  lng: number
  zoom: number
}

const initialState: squareZoomState = {
  lat: 40.8054,
  lng: -74.0241,
  zoom: 3,
}

const squareZoomSlice = createSlice({
  name: 'squareZoom',
  initialState,
  reducers: {
    setLat: (state, action: PayloadAction<number>) => {
      state.lat = action.payload
    },
    setLng: (state, action: PayloadAction<number>) => {
      state.lng = action.payload
    },
    setZoom: (state, action: PayloadAction<number>) => {
      state.zoom = action.payload
    },
  },
})

export const { setLat, setLng, setZoom } = squareZoomSlice.actions
export default squareZoomSlice.reducer
