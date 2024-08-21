import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { analyzeNextBatch, analyzeSearch, analyzeUrls } from '../analyzer/utils/analyzeHelpers';
import { AppDispatch, RootState } from './store';

// We'll pass the necessary auth data as a parameter to the thunk
export const analyzeData = createAsyncThunk<
  void,
  { user: any; idToken: string; searches: number; setSearches: (searches: number) => void },
  { state: RootState; dispatch: AppDispatch }
>(
  'analyzer/analyzeData',
  async (authData, { getState, dispatch }) => {
    const state = getState();
    const { activeTab, searchQuery, websiteUrl, websites } = state.analyzer;
    const { user, idToken, searches, setSearches } = authData;

    let dataToAnalyze: string[] = [];

    try {
      switch (activeTab) {
        case "search":
          dataToAnalyze = [searchQuery];
          await analyzeSearch(dataToAnalyze, idToken, dispatch, getState, user, searches, setSearches);
          break;
        case "url":
          dataToAnalyze = [websiteUrl];
          await analyzeUrls(dataToAnalyze, idToken, dispatch, getState, user, searches, setSearches, []);
          break;
        case "csv":
          dataToAnalyze = websites;
          await analyzeUrls(dataToAnalyze, idToken, dispatch, getState, user, searches, setSearches, []);
          break;
        default:
          throw new Error("Invalid active tab");
      }
    } catch (error) {
      console.error("Error in analyzeData:", error);
      dispatch(setLoadingMessage("An error occurred during analysis."));
      throw error; // Re-throw the error so that the thunk is rejected
    }
  }
);

export const handleAnalyzeMore = createAsyncThunk<
  void,
  { idToken: string; user: any; searches: number; setSearches: (searches: number) => void },
  { state: RootState; dispatch: AppDispatch }
>(
  'analyzer/handleAnalyzeMore',
  async (authData, { getState, dispatch }) => {
    const { idToken, user, searches, setSearches } = authData;
    const state = getState();
    const { analyzedCount, allWebsiteUrls, parsedData } = state.analyzer;

    console.log(analyzedCount, allWebsiteUrls.length);
    if (analyzedCount < allWebsiteUrls.length) {
      dispatch(setLoadingMessage(`Analyzing next batch (${analyzedCount + 1} to ${Math.min(analyzedCount + 20, allWebsiteUrls.length)})...`));
      await analyzeNextBatch(allWebsiteUrls, idToken, dispatch, getState, user, searches, setSearches, parsedData);
    }
  }
);

const analyzerSlice = createSlice({
  name: 'analyzer',
  initialState: {
    activeTab: 'search',
    searchQuery: '',
    websiteUrl: '',
    websites: [],
    loading: false,
    loadingMessage: '',
    analyzedCount: 0,
    allWebsiteUrls: [],
    parsedData: [],
    websiteData: [],
    filteredWebsiteData: [],
  },
  reducers: {
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setWebsiteUrl: (state, action) => {
      state.websiteUrl = action.payload;
    },
    setWebsites: (state, action) => {
      state.websites = action.payload;
    },
    setLoadingMessage: (state, action) => {
      state.loadingMessage = action.payload;
    },
    setAnalyzedCount: (state, action) => {
      state.analyzedCount = action.payload;
    },
    setAllWebsiteUrls: (state, action) => {
      state.allWebsiteUrls = action.payload;
    },
    setParsedData: (state, action) => {
      state.parsedData = action.payload;
    },
    setWebsiteData: (state, action) => {
      state.websiteData = action.payload;
    },
    setFilteredWebsiteData: (state, action) => {
      state.filteredWebsiteData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(analyzeData.pending, (state) => {
        state.loading = true;
        state.loadingMessage = "Starting analysis...";
      })
      .addCase(analyzeData.fulfilled, (state) => {
        state.loading = false;
        state.loadingMessage = "";
      })
      .addCase(analyzeData.rejected, (state, action) => {
        state.loading = false;
        state.loadingMessage = action.error.message || "An error occurred during analysis.";
      })
      .addCase(handleAnalyzeMore.pending, (state) => {
        state.loading = true;
        state.loadingMessage = "Loading more data...";
      })
      .addCase(handleAnalyzeMore.fulfilled, (state) => {
        state.loading = false;
        state.loadingMessage = "";
      })
      .addCase(handleAnalyzeMore.rejected, (state, action) => {
        state.loading = false;
        state.loadingMessage = action.error.message || "An error occurred while loading more data.";
      });
  },
});

export const {
  setActiveTab,
  setSearchQuery,
  setWebsiteUrl,
  setWebsites,
  setLoadingMessage,
  setAnalyzedCount,
  setAllWebsiteUrls,
  setParsedData,
  setWebsiteData,
  setFilteredWebsiteData,
} = analyzerSlice.actions;

export default analyzerSlice.reducer;