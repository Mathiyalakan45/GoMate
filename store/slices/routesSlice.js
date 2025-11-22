import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  routes: [],
  isLoading: false,
  error: null,
};

const routesSlice = createSlice({
  name: 'routes',
  initialState,
  reducers: {
    fetchRoutesStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchRoutesSuccess: (state, action) => {
      state.isLoading = false;
      state.routes = action.payload;
      state.error = null;
    },
    fetchRoutesFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchRoutesStart, fetchRoutesSuccess, fetchRoutesFailure } = routesSlice.actions;

export default routesSlice.reducer;

