"use client";
import { configureStore } from "@reduxjs/toolkit";
import analyzerReducer from "./analyzerSlice";

export const store = configureStore({
  reducer: {
    analyzer: analyzerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;