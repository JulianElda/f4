import { createSlice } from "@reduxjs/toolkit";
import { ElementalStates } from "consts/jobactions";

type StartingElementSlice = ElementalStates;

const initialStartingElement: StartingElementSlice = ElementalStates.AF3;

export const startingElementSlice = createSlice({
  name: "startingElement",
  initialState: initialStartingElement,
  reducers: {
    setStartingElement: (state, action) => {
      return action.payload;
    },
  },
});

export const { setStartingElement } = startingElementSlice.actions;

export const getStartingElement = (state) => {
  return state.startingElement;
};

export default startingElementSlice.reducer;
