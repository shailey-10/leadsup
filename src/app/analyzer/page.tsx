'use client';

import { UserAuth } from '@/context/authContext';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../components/Button/Button';
import Loader from '../components/Loader/Loader';
import LeftPanel from '../home/components/LeftPanel';
import {
  analyzeData,
  setActiveTab,
  setSearchQuery,
  setWebsiteUrl,
  setWebsites,
} from '../redux/analyzerSlice';
import { AppDispatch, RootState } from '../redux/store';
import AnalyzerResults from './components/AnalyzerResults';
import { CsvInput, SearchInput, UrlInput } from './components/Inputs';
import QueryBuilder from './components/QueryBuilder';
import TabSelection from './components/TabSelection';
import styles from './page.module.css';

export default function Upload() {
  const dispatch = useDispatch<AppDispatch>();
  const {
    activeTab,
    searchQuery,
    websiteUrl,
    websites,
    loading,
    loadingMessage,
    websiteData,
    filteredWebsiteData,
  } = useSelector((state: RootState) => state.analyzer);

  const router = useRouter();

  const { user, role, searches, setSearches, idToken, plan } = UserAuth();
  const [selectedFilter, setSelectedFilter] = useState<any>([
    { filter: '', value: '' },
  ]);
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);

  function renderInputInfo() {
    if (activeTab === 'search') {
      return 'What are you looking for?';
    }
    if (activeTab === 'url') {
      return 'Enter a Website URL';
    }
  }

  useEffect(() => {
    if (activeTab === 'search') {
      setButtonDisabled(!searchQuery);
    } else if (activeTab === 'url') {
      setButtonDisabled(!websiteUrl);
    } else if (activeTab === 'csv') {
      setButtonDisabled(websites.length === 0);
    }
  }, [activeTab, searchQuery, websiteUrl, websites]);

  const handleAnalyze = () => {
    if (role !== 'member') {
      alert('Subscribe to start analyzing');
      router.push('/pricing');
      return;
    } else {
      // update here when pro introduced

      if (plan !== 'Pro-USD-Monthly' && activeTab === 'search') {
        alert('Become a Agency + member to start generating leads');
        return;
      }
      if (searches <= 0) {
        alert('No Credits Left, please contact admin');
        return;
      }
    }
    dispatch(analyzeData({ user, idToken, searches, setSearches }));
  };

  const handleTabChange = (tab: string) => {
    dispatch(setActiveTab(tab));
    router.push(`/analyzer?mode=${tab}`);
  };

  const getPageTitle = () => {
    if (activeTab === 'search') {
      return 'Lead Generator';
    } else {
      if (activeTab == 'url') {
        return 'Website analyzer';
      } else {
        return 'Bulk CSV analyzer';
      }
    }
  };

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <LeftPanel />
        <main className={styles.main}>
          <>
            <div className={styles.header}>
              <h1>{getPageTitle()}</h1>
              <div className={styles.credits}>
                <p>
                  {' '}
                  Remaining Credits: <span> {searches} </span>{' '}
                </p>
              </div>
            </div>
            <TabSelection
              activeTab={activeTab}
              handleTabChange={handleTabChange}
            />
            <div className={styles.searchField}>
              <h3 className={styles.inputInfo}>{renderInputInfo()}</h3>

              <div className={styles.inputContainer}>
                {activeTab === 'search' && (
                  <SearchInput
                    searchQuery={searchQuery}
                    setSearchQuery={(query) => dispatch(setSearchQuery(query))}
                  />
                )}
                {activeTab === 'url' && (
                  <UrlInput
                    websiteUrl={websiteUrl}
                    setWebsiteUrl={(url) => dispatch(setWebsiteUrl(url))}
                  />
                )}
                {activeTab === 'csv' && (
                  <CsvInput
                    setParsedData={(data) => dispatch(setWebsites(data))}
                    setWebsites={(websites) => dispatch(setWebsites(websites))}
                  />
                )}

                <Button
                  disabled={buttonDisabled}
                  type="Primary"
                  text="Check lead"
                  onClick={handleAnalyze}
                />
              </div>
            </div>
            {websiteData.length === 0 && activeTab !== 'csv' && !loading && (
              <div className={styles.placeholderImage}>
                <Image
                  src={'/Hero.png'}
                  alt="Hero Image"
                  width={480}
                  height={300}
                  priority
                ></Image>
              </div>
            )}
            {loading ? (
              <div className={styles.analyzerResults}>
                <Loader loadingMessage={loadingMessage} />
              </div>
            ) : (
              websiteData.length > 0 && (
                <div className={styles.analyzerResults}>
                  <AnalyzerResults filteredWebsiteData={filteredWebsiteData}>
                    <QueryBuilder
                      selectedFilter={selectedFilter}
                      setSelectedFilter={setSelectedFilter}
                    />
                  </AnalyzerResults>
                </div>
              )
            )}
          </>
        </main>
      </div>
    </div>
  );
}
