import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  favourites: [],
};

const favouritesSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    addFavourite: (state, action) => {
      const route = action.payload;
      const exists = state.favourites.find((fav) => fav.id === route.id);
      if (!exists) {
        state.favourites.push(route);
      }
    },
    removeFavourite: (state, action) => {
      state.favourites = state.favourites.filter((fav) => fav.id !== action.payload);
    },
    clearFavourites: (state) => {
      state.favourites = [];
    },
    toggleFavourite: (state, action) => {
      const route = action.payload;
      const index = state.favourites.findIndex((fav) => fav.id === route.id);
      if (index >= 0) {
        state.favourites.splice(index, 1);
      } else {
        state.favourites.push(route);
      }
    },
  },
});

export const { addFavourite, removeFavourite, clearFavourites, toggleFavourite } =
  favouritesSlice.actions;

export default favouritesSlice.reducer;

