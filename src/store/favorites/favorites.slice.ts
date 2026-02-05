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

 export type FavoritesState = {
    favorites: string[];
 }

 const initialState: FavoritesState = {
   favorites: loadFavorites(),
 };

 const favoritesSlice = createSlice({
   name: 'favorites',
   initialState,
   reducers: {
     addFavorite: (state, action: PayloadAction<string>) => {
      if (state.favorites.includes(action.payload)) return state; 

       const newFavorites = [...state.favorites, action.payload];
       saveFavorites(newFavorites);
       return { favorites: newFavorites };
     },
     removeFavorite: (state, action: PayloadAction<string>) => {
       const filteredFavorites = state.favorites.filter((id) => id !== action.payload);
       saveFavorites(filteredFavorites);
       return { favorites: filteredFavorites };
     },
     clearFavorites: () => {
       saveFavorites([]);
       return { favorites: [] };
     },
    },
  });
 
  export const { addFavorite, removeFavorite, clearFavorites } = favoritesSlice.actions;
   export default favoritesSlice.reducer;