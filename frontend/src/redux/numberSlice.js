// src/redux/numberSlice.js
import { createSlice } from "@reduxjs/toolkit";

export const numberSlice = createSlice({
  name: 'number',
  initialState: {
    value: '',
  },
  reducers: {
    setNumber: (state, action) => {
      state.value = action.payload;
    },
    clearNumber: (state) => {
      state.value = '';
    },
  },
});

export const { setNumber, clearNumber } = numberSlice.actions;
export const selectNumber = (state) => state.number.value;
export default numberSlice.reducer;
