import {createSlice} from '@reduxjs/toolkit'
import authThunk from '../actions/authAction'

const initialState = {
  user: {},
  error: false,
  message: '',
  loading: false
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetError(state){
      state.error = false
    },
    
  },
  extraReducers: builder => {
    builder
      .addCase(authThunk.login.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(authThunk.login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(authThunk.login.rejected, (state, action) => {
        state.loading = false;
        state.message = action.error.message;
        state.error = true
      });
  }
})

export const resetErrorState = authSlice.actions 
export default authSlice.reducer