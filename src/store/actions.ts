import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ActionType } from "components/action/action";

const initialActions: ActionType[] = [];

export const actionsSlice = createSlice({
  name: "actions",
  initialState: initialActions,
  reducers: {
    addAction: (state, action: PayloadAction<ActionType>) => {
      return state.slice().concat(action.payload);
    },
    removeActionFromIndex: (state, action: PayloadAction<number>) => {
      return state.filter((_, i) => i !== action.payload);
    },
    setActions: (_state, action: PayloadAction<ActionType[]>) => {
      return action.payload;
    },
  },
});

export const { addAction, removeActionFromIndex, setActions } =
  actionsSlice.actions;

export const getActions = (state) => {
  return state.actions;
};

export default actionsSlice.reducer;
