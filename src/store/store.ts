import { configureStore } from "@reduxjs/toolkit";
import actionsReducer from "store/actions";
import configReducer from "store/config";

export const store = configureStore({
  reducer: {
    actions: actionsReducer,
    config: configReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
