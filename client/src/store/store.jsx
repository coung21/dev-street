import {configureStore} from '@reduxjs/toolkit'
import authSlice from './slices/authSlice'
import loadingErrorSlice from './slices/loadingErrorSlice'
import loadingErrorMiddleware from './middlewares/loadingErrorMiddleware'


const store = configureStore({
  reducer: { auth: authSlice, loadingError: loadingErrorSlice },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loadingErrorMiddleware),
});

export default store