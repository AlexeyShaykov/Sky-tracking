  import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
 
 const LS_KEY_FAVORITES = 'favorites';

 const loadFavorites = (): string[] => {
   if (typeof window === 'undefined') return [];
   const data = localStorage.getItem(LS_KEY_FAVORITES);
   return data ? JSON.parse(data) : [];
 };

 const saveFavorites = (favorites: string[]) => {
   if (typeof window === 'undefined') return;
   localStorage.setItem(LS_KEY_FAVORITES, JSON.stringify(favorites));
 };

 export type FavoritesState = string[];

 const initialState: FavoritesState = loadFavorites();
 
 const favoritesSlice = createSlice({
   name: 'favorites',
   initialState,
   reducers: {
     addFavorite: (state, action: PayloadAction<string>) => {
      if (state.includes(action.payload)) return state; 

       const newFavorites = [...state, action.payload];
       saveFavorites(newFavorites);
       return newFavorites;
     },
     removeFavorite: (state, action: PayloadAction<string>) => {
       const filteredFavorites = state.filter((id) => id !== action.payload);
       saveFavorites(filteredFavorites);
       return filteredFavorites;
     },
     clearFavorites: () => {
       saveFavorites([]);
       return [];
     },
    },
  });
 
  export const { addFavorite, removeFavorite, clearFavorites } = favoritesSlice.actions;
  export default favoritesSlice.reducer;