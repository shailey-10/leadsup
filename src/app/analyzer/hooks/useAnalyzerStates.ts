import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setActiveTab,
  setAllWebsiteUrls,
  setAnalyzedCount,
  setFilteredWebsiteData,
  setSearchQuery,
  setWebsiteData,
  setWebsiteUrl,
  setWebsites,
} from '../../redux/analyzerSlice';
import { AppDispatch, RootState } from '../../redux/store';

const useAnalyzerStates = () => {
  const dispatch = useDispatch<AppDispatch>();
  const analyzerState = useSelector((state: RootState) => state.analyzer);

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const mode = searchParams.get('mode');
    if (mode) {
      dispatch(setActiveTab(mode));
    }
  }, [searchParams, dispatch]);

  useEffect(() => {
    dispatch(setFilteredWebsiteData(analyzerState.websiteData));
  }, [dispatch, analyzerState.websiteData]);

  const handleTabChange = (tab: string) => {
    dispatch(setSearchQuery(''));
    dispatch(setWebsiteUrl(''));
    dispatch(setWebsites([]));
    dispatch(setActiveTab(tab));
    dispatch(setWebsiteData([]));

    router.push(`/analyzer?mode=${tab}`);
  };

  return {
    ...analyzerState,
    setActiveTab: (tab: string) => dispatch(setActiveTab(tab)),
    setSearchQuery: (query: string) => dispatch(setSearchQuery(query)),
    setWebsiteUrl: (url: string) => dispatch(setWebsiteUrl(url)),
    setWebsites: (websites: string[]) => dispatch(setWebsites(websites)),
    setWebsiteData: (data: any[]) => dispatch(setWebsiteData(data)),
    setFilteredWebsiteData: (data: any[]) => dispatch(setFilteredWebsiteData(data)),
    setAnalyzedCount: (count: number) => dispatch(setAnalyzedCount(count)),
    setAllWebsiteUrls: (urls: string[]) => dispatch(setAllWebsiteUrls(urls)),
    handleTabChange,
    router,
    dispatch,
  };
};

export default useAnalyzerStates;