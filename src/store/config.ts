import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ElementalStates } from "consts/jobactions";

type ConfigSlice = {
  f3p: boolean;
  sps: number;
  startingElement: ElementalStates;
};

const initialConfig: ConfigSlice = {
  f3p: true,
  sps: 380,
  startingElement: ElementalStates.AF3,
};

export const configSlice = createSlice({
  name: "config",
  initialState: initialConfig,
  reducers: {
    setF3p: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        f3p: action.payload,
      };
    },
    setSps: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        sps: action.payload,
      };
    },
    setStartingElement: (state, action: PayloadAction<ElementalStates>) => {
      return {
        ...state,
        startingElement: action.payload,
      };
    },
  },
});

export const { setF3p, setSps, setStartingElement } = configSlice.actions;

export const getF3p = (state) => {
  return state.config.f3p;
};

export const getSps = (state) => {
  return state.config.sps;
};

export const getStartingElement = (state) => {
  return state.config.startingElement;
};

export default configSlice.reducer;
