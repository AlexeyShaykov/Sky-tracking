  import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
 
 const filtersSlice = createSlice({
   name: 'filters',
   initialState: {
      fromCountry: null,
      currentlySelectedAirline: null,
   } as {
      fromCountry: string | null;
      currentlySelectedAirline: string | null;
   },
   reducers: {
     addFromCountryFilter: (state, action: PayloadAction<string | null>) => {
        state.fromCountry = action.payload;
        return state;
     },
     addCurrentlySelectedAirlineFilter: (state, action: PayloadAction<string | null>) => {
       state.currentlySelectedAirline = action.payload;
       return state;
     },
     clearAllFilters: (state) => {
       state.fromCountry = null;
       state.currentlySelectedAirline = null;
       return state;
     },
    },
  });
 
  export const { addFromCountryFilter, addCurrentlySelectedAirlineFilter, clearAllFilters } = filtersSlice.actions;
  export default filtersSlice.reducer;