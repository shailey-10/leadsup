"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { filters } from "@/constants/filters";
import { UserAuth } from "@/context/authContext";
import mergeArrays from "@/helpers/mergeArrays";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { doc, updateDoc } from "firebase/firestore";
import { useRouter, useSearchParams } from "next/navigation";
import Papa from "papaparse";
import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader/Loader";
import { db } from "../firebase-config";
import { setFilteredWebsiteData } from "../redux/filteredWebsiteData";
import { setWebsiteData } from "../redux/websiteData";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import styles from "./page.module.css";
import LeftPanel from "../home/components/LeftPanel";
import Image from "next/image";

const baseUrl = process.env.API_BASE_URL;

export default function Upload() {
  const [activeTab, setActiveTab] = useState("search");
  const [searchQuery, setSearchQuery] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [websites, setWebsites] = useState<string[]>([]);
  const [parsedData, setParsedData] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const { user, role, searches, setSearches } = UserAuth();
  const { websiteData } = useSelector((state: any) => state.websiteData);
  const { filteredWebsiteData } = useSelector(
    (state: any) => state.filteredWebsiteData
  );

  useEffect(() => {
    const mode = searchParams.get("mode");
    if (mode) {
      setActiveTab(mode);
    }
  }, [searchParams]);

  useEffect(() => {
    dispatch(setFilteredWebsiteData(websiteData));
  }, [websiteData]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    router.push(`/analyzer?mode=${tab}`);
  };

  const handleAnalyze = async () => {
    if (searches <= 0) {
      alert("Not enough credits left, please connect to team for more credits");
      return;
    }

    setLoading(true);
    let dataToAnalyze: string[] = [];

    switch (activeTab) {
      case "search":
        dataToAnalyze = [searchQuery];
        break;
      case "url":
        dataToAnalyze = [websiteUrl];
        break;
      case "csv":
        dataToAnalyze = websites;
        break;
    }

    await analyzeCsv(dataToAnalyze);
  };

  const analyzeCsv = async (dataToAnalyze: string[]) => {
    const apiUrl = `http://localhost:8080/api/analyzer`;

    const requestData = {
      url: dataToAnalyze,
    };

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Received data:", data);

      if (data && data.data && Array.isArray(data.data)) {
        console.log("Existing parsedData:", parsedData);
        const mergedData = mergeArrays(parsedData, data.data);
        console.log("Merged data:", mergedData);

        if (mergedData.length === 0) {
          console.warn("Merged data is empty. Using only new data.");
          dispatch(setWebsiteData(data.data));
          dispatch(setFilteredWebsiteData(data.data));
        } else {
          dispatch(setWebsiteData(mergedData));
          dispatch(setFilteredWebsiteData(mergedData));
        }

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
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const [availableOptions, setAvailableOptions] = useState(filters);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<any>([
    { filter: "", value: "" },
  ]);

  function filterChange(value: string, i: number) {
    console.log(value);
    let tempFilters = [...selectedFilter];
    tempFilters[i].filter = value;
    setSelectedFilter(tempFilters);
  }
  function valueChange(value: string, i: number) {
    let tempFilters = [...selectedFilter];
    tempFilters[i].value = value;
    setSelectedFilter(tempFilters);
  }
  function addFilter() {
    let tempFilters = [...selectedFilter];
    tempFilters.push({ filter: "", value: "" });
    setSelectedFilter(tempFilters);
  }

  function removeFilter(i: number) {
    let tempFilters = [...selectedFilter];
    tempFilters.splice(i, 1);
    setSelectedFilter(tempFilters);
  }

  useEffect(() => {
    console.log(selectedFilter);
  }, [selectedFilter]);

  function applyQuery() {
    let tempData = [...websiteData];
    selectedFilter.map((filterItem: { value: string; filter: any }) => {
      let value = false;
      if (filterItem.value === "Yes") {
        value = true;
      }
      tempData = tempData.filter(
        (item) => item[`${filterItem.filter}`] === value
      );
    });
    dispatch(setFilteredWebsiteData(tempData));
  }

  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      complete: (result) => {
        const websitesArray = result.data
          .map((row: any) => row.Website)
          .filter(
            (website: string | undefined): website is string =>
              typeof website === "string" && website.trim() !== ""
          );
        const parsedArray = result.data.map((row: any) => row);
        setParsedData(parsedArray);
        const filteredArray = websitesArray.filter(
          (item) => !item.includes("facebook")
        );
        setWebsites(filteredArray);
      },
      error: (error) => {
        console.error("CSV parsing error:", error);
      },
    });
  };

  return (
    <div className={styles.container}>
      <LeftPanel />
      <main className={styles.main}>
        <h1>Leads Analyzer</h1>

        <div className={styles.optionsContainer}>
          <div
            className={`${styles.option} ${
              activeTab === "search" ? styles.active : ""
            }`}
            onClick={() => handleTabChange("search")}
          >
            <div className={styles.optionRow}>
              <Image
                src="/vercel.svg"
                alt="Search"
                width={24}
                height={24}
                className={styles.optionIcon}
              />
            </div>
            <div className={styles.optionText}>
              <h2>Find with search</h2>
              <p>Search like "Gyms in New York"</p>
            </div>
          </div>

          <div
            className={`${styles.option} ${
              activeTab === "url" ? styles.active : ""
            }`}
            onClick={() => handleTabChange("url")}
          >
            <div className={styles.optionRow}>
              <Image
                src="/vercel.svg"
                alt="Link"
                width={24}
                height={24}
                className={styles.optionIcon}
              />
            </div>
            <div className={styles.optionText}>
              <h2>Find with URL</h2>
              <p>Enter any website URL</p>
            </div>
          </div>

          <div
            className={`${styles.option} ${
              activeTab === "csv" ? styles.active : ""
            }`}
            onClick={() => handleTabChange("csv")}
          >
            <div className={styles.optionRow}>
              <Image
                src="/vercel.svg"
                alt="CSV File"
                width={24}
                height={24}
                className={styles.optionIcon}
              />
            </div>
            <div className={styles.optionText}>
              <h2>Find with .csv</h2>
              <p>Upload a .csv file with website links</p>
            </div>
          </div>
        </div>

        <div className={styles.inputContainer}>
          {activeTab === "search" && (
            <input
              type="text"
              placeholder='Search like "Gyms in New York"'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          )}
          {activeTab === "url" && (
            <input
              type="text"
              placeholder="Enter website URL"
              value={websiteUrl}
              onChange={(e) => setWebsiteUrl(e.target.value)}
            />
          )}
          {activeTab === "csv" && (
            <input type="file" accept=".csv" onChange={handleFileUpload} />
          )}
          <button onClick={handleAnalyze}>Check lead</button>
        </div>

        <div>
          <p>Remaining Credits: {searches}</p>
        </div>

        {loading ? (
          <div className={styles.loaderContainer}>
            <Loader />
          </div>
        ) : (
          websiteData.length > 0 && (
            <>
              <div className={styles.queryBuilder}>
                <p>Query Builder</p>
                <div className={styles.queryBuilder}>
                  {selectedFilter.map((filter: any, i: number) => {
                    return (
                      <div className={styles.queryItems} key={i}>
                        <Select
                          onValueChange={(value) => filterChange(value, i)}
                        >
                          <SelectTrigger className={styles.select}>
                            <SelectValue placeholder="Filters" />
                          </SelectTrigger>
                          <SelectContent className={styles.selectContent}>
                            {availableOptions.map((item) => {
                              return (
                                <SelectItem key={item.value} value={item.value}>
                                  {item.display}
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                        {selectedFilter && (
                          <Select
                            onValueChange={(value) => valueChange(value, i)}
                          >
                            <SelectTrigger className={styles.select}>
                              <SelectValue placeholder="Value" />
                            </SelectTrigger>
                            <SelectContent className={styles.selectContent}>
                              <SelectItem value={"Yes"}>Yes</SelectItem>
                              <SelectItem value={"No"}>No</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                        <CancelOutlinedIcon onClick={() => removeFilter(i)} />
                      </div>
                    );
                  })}
                </div>
                <div className={styles.queryParams}>
                  {selectedFilter.length < 3 && (
                    <AddCircleOutlineRoundedIcon onClick={addFilter} />
                  )}
                  <button
                    style={{
                      backgroundColor: "black",
                      color: "#fff",
                      padding: "10px 25px",
                      borderRadius: "8px",
                    }}
                    onClick={applyQuery}
                  >
                    Apply Query
                  </button>
                </div>
              </div>
              <br />

              <div className="container mx-auto py-10">
                <DataTable columns={columns} data={filteredWebsiteData} />
              </div>
            </>
          )
        )}
      </main>
    </div>
  );
}
