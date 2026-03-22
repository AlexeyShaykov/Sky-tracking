import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface IFlightActionState {
  isShowRoute: boolean;
  isFollowPlane: boolean;
}

const initialState: IFlightActionState = {
  isShowRoute: true,
  isFollowPlane: true,
};

const flightActionSlice = createSlice({
  name: 'flight-action',
  initialState,
  reducers: {
    toggleShowRoute(state, action: PayloadAction<boolean>) {
      state.isShowRoute = action.payload;
    },
    toggleFollowPlane(state, action: PayloadAction<boolean>) {
      state.isFollowPlane = action.payload;
    },
  },
});

export const { toggleShowRoute, toggleFollowPlane } = flightActionSlice.actions;
export default flightActionSlice.reducer;