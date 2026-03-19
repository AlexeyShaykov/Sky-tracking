import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface IFlightActionState {
  isShowRoute: boolean;
}

const initialState: IFlightActionState = {
  isShowRoute: true,
};

const flightActionSlice = createSlice({
  name: 'flight-action',
  initialState,
  reducers: {
    toggleShowRoute(state, action: PayloadAction<boolean>) {
      state.isShowRoute = action.payload;
    },
  },
});

export const { toggleShowRoute } = flightActionSlice.actions;
export default flightActionSlice.reducer;