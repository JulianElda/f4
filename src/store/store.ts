import { configureStore } from "@reduxjs/toolkit";
import actionsReducer from "store/actions";
import f3pReducer from "store/f3p";
import spsReducer from "store/sps";
import startingElementReducer from "store/startingElement";

export const store = configureStore({
  reducer: {
    actions: actionsReducer,
    f3p: f3pReducer,
    sps: spsReducer,
    startingElement: startingElementReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
