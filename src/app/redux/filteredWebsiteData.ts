import { createSlice } from "@reduxjs/toolkit";

export const filteredWebsiteDataSlice = createSlice({
  name: "filteredWebsiteData",
  initialState: {
    filteredWebsiteData: [{}],
  },
  reducers: {
    setFilteredWebsiteData: (state, action) => {
      state.filteredWebsiteData = action.payload;
    },
  },
});

export const { setFilteredWebsiteData } = filteredWebsiteDataSlice.actions;
export default filteredWebsiteDataSlice.reducer;
