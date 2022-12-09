import { createSlice } from "@reduxjs/toolkit";

export const spsSlice = createSlice({
  name: "sps",
  initialState: 380,
  reducers: {
    setSps: (state, action) => {
      return action.payload;
    },
  },
});

export const { setSps } = spsSlice.actions;

export const getSps = (state) => {
  return state.sps;
};

export default spsSlice.reducer;
