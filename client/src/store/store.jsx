import {configureStore} from '@reduxjs/toolkit'
import authSlice from './slices/authSlice'
import loadingErrorSlice from './slices/loadingErrorSlice'
import UiSlice from './slices/UiSlice'
import loadingErrorMiddleware from './middlewares/loadingErrorMiddleware'


const store = configureStore({
  reducer: { auth: authSlice, loadingError: loadingErrorSlice, Ui: UiSlice },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loadingErrorMiddleware),
});

export default store