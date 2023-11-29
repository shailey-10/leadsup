"use client";
import { configureStore } from "@reduxjs/toolkit";
import filteredWebsiteData from "./filteredWebsiteData";
import websiteDataReducer from "./websiteData";

export default configureStore({
  reducer: {
    websiteData: websiteDataReducer,
    filteredWebsiteData: filteredWebsiteData,
  },
});
