import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  hamburger: false
}

const UiSlice = createSlice({
  name: 'UI',
  initialState,
  reducers: {
    toggleHamburger: (state) => {
      state.hamburger = !state.hamburger
    }
  }
})

export const UIActions = UiSlice.actions;
export default UiSlice.reducer