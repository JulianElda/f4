import { createSlice } from "@reduxjs/toolkit";

export const f3pSlice = createSlice({
  name: "f3p",
  initialState: true,
  reducers: {
    setf3p: (_state, action) => {
      return action.payload;
    },
  },
});

export const { setf3p } = f3pSlice.actions;

export const getf3p = (state) => {
  return state.f3p;
};

export default f3pSlice.reducer;
