import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: false,
  message: ''
};

const loadingErrorSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    startLoading: (state) => {
      state.loading = true;
    },
    finishLoading: (state) => {
      state.loading = false;
    },
    setError: (state) => {
      state.error = true
    },
    resetError: (state) => {
      state.error = false
    },
    setMessage: (state,action) => {
      state.message = action.payload;
    }
  },
});

export const { startLoading, finishLoading, setError, resetError, setMessage } = loadingErrorSlice.actions;

export default loadingErrorSlice.reducer;
