import mergeArrays from "@/helpers/mergeArrays";
import { createAsyncThunk } from '@reduxjs/toolkit';
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase-config";
import {
  setAllWebsiteUrls,
  setAnalyzedCount,
  setFilteredWebsiteData,
  setLoadingMessage,
  setParsedData,
  setWebsiteData
} from '../../redux/analyzerSlice';
import { AppDispatch, RootState } from '../../redux/store';

export const analyzeSearch = async (
  searchQuery: string[], 
  idToken: string, 
  dispatch: AppDispatch,
  getState: () => RootState,
  user: any,
  searches: number,
  setSearches: (searches: number) => void
) => {
  const apiUrl = `http://localhost:8080/api/leads/getData`;
  const requestData = { url: searchQuery };

  try {
    dispatch(setLoadingMessage(`Finding "${searchQuery}"...`));
    
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + idToken,
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const websiteUrls: string[] = data.data.map((item: { Website: any }) => item.Website);
    const parsedArray = data.data.map((row: any) => row);
    dispatch(setParsedData(parsedArray));
    dispatch(setAllWebsiteUrls(websiteUrls));
    dispatch(setLoadingMessage(`Found ${parsedArray.length} "${searchQuery}". Analyzing first 20 results...`));
    
    await analyzeNextBatch(websiteUrls, idToken, dispatch, getState, user, searches, setSearches, parsedArray);
  } catch (error) {
    console.error("Error in analyzeSearch:", error);
    dispatch(setLoadingMessage("An error occurred during search analysis."));
  }
};

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

export const analyzeNextBatch = async (
  websiteUrls: string[], 
  idToken: string, 
  dispatch: AppDispatch,
  getState: () => RootState,
  user: any,
  searches: number,
  setSearches: (searches: number) => void,
  parsedData: any[]
) => {
  const batchSize = 20;
  
  // Get the current analyzed count from the state
  const currentState = getState();
  const currentAnalyzedCount = currentState.analyzer.analyzedCount;

  const nextBatch = websiteUrls.slice(currentAnalyzedCount, currentAnalyzedCount + batchSize);
  const nextParsedBatch = parsedData.slice(currentAnalyzedCount, currentAnalyzedCount + batchSize);
  
  await analyzeUrls(nextBatch, idToken, dispatch, getState, user, searches, setSearches, nextParsedBatch);
  
  // Update the analyzed count
  dispatch(setAnalyzedCount(currentAnalyzedCount + nextBatch.length));
};

export const analyzeUrls = async (
  dataToAnalyze: string[],
  idToken: string,
  dispatch: AppDispatch,
  getState: () => RootState,
  user: any,
  searches: number,
  setSearches: (searches: number) => void,
  parsedData: any[]
) => {
  const apiUrl = `http://localhost:8080/api/analyzer/audit`;
  const requestData = { url: dataToAnalyze };
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + idToken,
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    if (data && data.data && Array.isArray(data.data)) {
      let mergedData = mergeArrays(parsedData, data.data);

      // Get the current websiteData from the Redux store
      const currentState = getState();
      const currentWebsiteData = currentState.analyzer.websiteData;

      if (mergedData.length === 0) {
        console.warn("Merged data is empty. Using only new data.");
        mergedData = data.data;
      }

      // Combine the current websiteData with the new mergedData
      const updatedWebsiteData = [...currentWebsiteData, ...mergedData];

      dispatch(setWebsiteData(updatedWebsiteData));
      dispatch(setFilteredWebsiteData(updatedWebsiteData));

      const usedCredits = data.data.length;
      const docRef = doc(db, "user-roles", user?.uid);
      await updateDoc(docRef, {
        searches: searches - usedCredits,
      });
      setSearches(searches - usedCredits);
    } else {
      console.error("Unexpected data format:", data);
    }
  } catch (error) {
    console.error("Error in analyzeUrls:", error);
    dispatch(setLoadingMessage("An error occurred during URL analysis."));
  }
};

