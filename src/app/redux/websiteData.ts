import { createSlice } from "@reduxjs/toolkit";

export const websiteDataSlice = createSlice({
  name: "websiteData",
  initialState: {
    websiteData: [],
  },
  reducers: {
    setWebsiteData: (state, action) => {
      state.websiteData = action.payload;
    },
  },
});

export const { setWebsiteData } = websiteDataSlice.actions;
export default websiteDataSlice.reducer;
