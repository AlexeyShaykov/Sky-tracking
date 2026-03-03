import { configureStore } from '@reduxjs/toolkit'; 

import favoritesReducer from './favorites/favorites.slice';
import airportsReducer from './airports/airports.slice';
import filterReducer from './filters/filters.slice';


export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    airports: airportsReducer,
    filters: filterReducer,
  },
});

export type TRootState = ReturnType<typeof store.getState>;
export type TAppDispatch = typeof store.dispatch;