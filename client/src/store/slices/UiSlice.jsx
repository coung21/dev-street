import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  hamburger: false,
  dropdown: false,
  confirm: false,
  authModal: false
}

const UiSlice = createSlice({
  name: 'UI',
  initialState,
  reducers: {
    toggleHamburger: (state) => {
      state.hamburger = !state.hamburger
    },
    toggleDropdown: (state, action) => {
      state.dropdown = action.payload
    },
    toggleConfirm : (state,action) => {
      state.confirm = action.payload
    },
    toggleAuthModal: (state, action) => {
      state.authModal = action.payload
    }
  }
})

export const UIActions = UiSlice.actions;
export default UiSlice.reducer