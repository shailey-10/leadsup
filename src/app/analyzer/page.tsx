"use client";

import { UserAuth } from "@/context/authContext";
import { useEffect, useState } from "react";
import Button from "../components/Button/Button";
import Loader from "../components/Loader/Loader";
import LeftPanel from "../home/components/LeftPanel";
import AnalyzerResults from "./components/AnalyzerResults";
import { CsvInput, SearchInput, UrlInput } from "./components/Inputs";
import QueryBuilder from "./components/QueryBuilder";
import TabSelection from "./components/TabSelection";
import useAnalyzerStates from "./hooks/useAnalyzerStates";
import styles from "./page.module.css";
import { handleAnalyze } from "./utils/analyzeHelpers";


export default function Upload() {
  
 const {
    activeTab,
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
    dispatch,
    websiteData,
    filteredWebsiteData,
    handleTabChange,
    loadingMessage,
    setLoadingMessage,
        analyzedCount,
    setAnalyzedCount,
    allWebsiteUrls,
    setAllWebsiteUrls,
  } = useAnalyzerStates();

    const { user, role, searches, setSearches, idToken } = UserAuth();



  const [selectedFilter, setSelectedFilter] = useState<any>([
    { filter: "", value: "" },
  ]);
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);

  function renderInputInfo () {
    if (activeTab === "search") {
      return 'What are you looking for?';
    }
        if (activeTab === "url") {
      return 'Enter a Website URL'
    }
  }

  useEffect(() => {
    console.log(selectedFilter);
  }, [selectedFilter]);

  useEffect(() => {
    if (activeTab === "search") {
      if(searchQuery){
        setButtonDisabled(false);
      }else{
        setButtonDisabled(true);
      }
    }
     else if(activeTab === "url"){
        if(websiteUrl){
          setButtonDisabled(false);
        }else{
          setButtonDisabled(true);
        }
      } else if(activeTab === "csv"){
        if(websites.length > 0){
          setButtonDisabled(false);
        }else{
          setButtonDisabled(true);
        }
      }
  }, [activeTab, searchQuery, setWebsites, websiteUrl, websites.length]);

  

  return (
    <div className={styles.container}>
      <LeftPanel />
      <main className={styles.main}>
        {loading ? <Loader loadingMessage={loadingMessage} /> :
        <>
      <div className={styles.header}>
        <h1>Analyzer</h1>
          <div className={styles.credits}>
            <p> Remaining Credits: <span> {searches} </span> </p>
          </div>
          </div>
                <TabSelection activeTab={activeTab} handleTabChange={handleTabChange} />

        <h3>{renderInputInfo()}</h3>

        <div className={styles.inputContainer}>
          
          {activeTab === "search" && <SearchInput searchQuery={searchQuery} setSearchQuery={setSearchQuery} />}


          {activeTab === "url" && <UrlInput websiteUrl={websiteUrl} setWebsiteUrl={setWebsiteUrl} />}


          {activeTab === "csv" && <CsvInput setParsedData={setParsedData} setWebsites={setWebsites} />}


          <Button disabled={buttonDisabled} type="Primary" text="Check lead" onClick={() => handleAnalyze({searches, setLoading, activeTab, searchQuery, websiteUrl, websites, idToken, dispatch, user, setSearches, parsedData, setParsedData, setLoadingMessage,    analyzedCount,
    setAnalyzedCount,
    allWebsiteUrls,
    setAllWebsiteUrls,})} />
        </div>


        {(
          websiteData.length > 0 && (
            <AnalyzerResults
              filteredWebsiteData={filteredWebsiteData}
            >
              <QueryBuilder
                selectedFilter={selectedFilter}
                setSelectedFilter={setSelectedFilter}
                websiteData={websiteData}
                dispatch={dispatch}
              />
            </AnalyzerResults>
          )
        )}
      </>
      }
      </main>
    </div>
  );
}
