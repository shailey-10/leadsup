import React, { createContext, useContext, useState } from 'react';

const AnalyzerContext = createContext<any>(null);

export const AnalyzerProvider = ({ children }: { children: React.ReactNode }) => {
  const [analyzerStates, setAnalyzerStates] = useState({
    loading: false,
    activeTab: '',
    searchQuery: '',
    websiteUrl: '',
    websites: [],
    parsedData: [],
    loadingMessage: '',
    analyzedCount: 0,
    allWebsiteUrls: [],
  });

  const setAnalyzerStateValue = (key: string, value: any) => {
    setAnalyzerStates(prev => ({ ...prev, [key]: value }));
  };

  return (
    <AnalyzerContext.Provider value={{ analyzerStates, setAnalyzerStateValue }}>
      {children}
    </AnalyzerContext.Provider>
  );
};

export const useAnalyzer = () => useContext(AnalyzerContext);
