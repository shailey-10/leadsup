import { setWebsiteData } from '@/app/redux/websiteData';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilteredWebsiteData } from '../../redux/filteredWebsiteData';

const useAnalyzerStates = () => {
  const [analyzedCount, setAnalyzedCount] = useState(0);
  const [allWebsiteUrls, setAllWebsiteUrls] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState('search');
  const [searchQuery, setSearchQuery] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [websites, setWebsites] = useState<string[]>([]);
  const [parsedData, setParsedData] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');

  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const { websiteData } = useSelector((state: any) => state.websiteData);
  const { filteredWebsiteData } = useSelector(
    (state: any) => state.filteredWebsiteData
  );

  useEffect(() => {
    const mode = searchParams.get('mode');
    if (mode) {
      setActiveTab(mode);
    }
  }, [searchParams]);

  useEffect(() => {
    dispatch(setFilteredWebsiteData(websiteData));
  }, [dispatch, websiteData]);

  const handleTabChange = (tab: string) => {
    setSearchQuery('');
    setWebsiteUrl('');
    setWebsites([]);
    setActiveTab(tab);
    dispatch(setWebsiteData([]));

    router.push(`/analyzer?mode=${tab}`);
  };

  return {
    activeTab,
    setActiveTab,
    searchQuery,
    setSearchQuery,
    websiteUrl,
    setWebsiteUrl,
    websites,
    setWebsites,
    parsedData,
    setParsedData,
    loading,
    setLoading,
    loadingMessage,
    setLoadingMessage,
    router,
    dispatch,
    websiteData,
    filteredWebsiteData,
    handleTabChange,
    analyzedCount,
    setAnalyzedCount,
    allWebsiteUrls,
    setAllWebsiteUrls,
  };
};

export default useAnalyzerStates;
