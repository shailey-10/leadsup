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
import { useRouter } from "next/navigation";
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

export default function Upload() {
  const [websites, setWebsites] = useState<string[]>([]);
  const [parsedData, setParsedData] = useState<any>([]);
  const { websiteData } = useSelector((state: any) => state.websiteData);
  const { filteredWebsiteData } = useSelector(
    (state: any) => state.filteredWebsiteData
  );
  const router = useRouter();
  // const [analyzedWebsites, setAnalyzedWebsites] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  // const [filteredAnalyzedWebsites, setFilteredAnalyzedWebsites] = useState<any>(
  //   []
  // );

  const { user, role, searches, setSearches } = UserAuth();
//     useEffect(() => {
//     console.log('first')
//  const apiUrl = 'https://analyzer-ljrsjtv7ua-uc.a.run.app/api/test'
    
//     fetch(apiUrl, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
     
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         console.log(data)
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//       });
  
//   },[])
  useEffect(() => {
    if (!user) {
      router.push("/signup");
    }
    if (user && role === "viewer") {
      router.push("/pending");
    }
    console.log(user);
  }, [user]);
  useEffect(() => {
    dispatch(setFilteredWebsiteData(websiteData));
    // setFilteredAnalyzedWebsites(websiteData);
  }, [websiteData]);

  const dispatch = useDispatch();

  async function analyzeCsv() {
    // "https://us-central1-leadsup-bd2ab.cloudfunctions.net/api";
    setLoading(true);
    const apiUrl = "/api/local-analyzer";
    // const apiUrl = 'https://analyzer-ljrsjtv7ua-uc.a.run.app/api/local-analyzer'
    const requestData = {
      url: websites,
    };
    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => response.json())
      .then((data) => {
        const mergedData = mergeArrays(parsedData, data.data);
        console.log(data.data);
        const usedCredits = data.data.length;
        const docRef = doc(db, "user-roles", user?.uid);
        updateDoc(docRef, {
          searches: searches - usedCredits,
        });
        setSearches(searches - usedCredits);
        dispatch(setWebsiteData(mergedData));
        // setAnalyzedWebsites(mergedData);
        console.log(mergedData);
        setLoading(false);
        return data;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  async function analyze() {
    if (searches - websites.length < 0) {
      alert("Not enough credits left, please connect to team for more credits");
      return;
    }
    setLoading(true);
    await analyzeCsv()
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err, "siren, siren, siren");
      });
  }

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

    // setFilteredAnalyzedWebsites(tempData);
  }
  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      complete: (result) => {
        const websitesArray = result.data.map((row: any) => row.Website);
        const parsedArray = result.data.map((row: any) => row);
        setParsedData(parsedArray);
        const filteredArray = websitesArray.filter(
          (item) => item !== "" && !item.includes("facebook")
        );
        setWebsites(filteredArray);
      },
      error: (error) => {
        console.error("CSV parsing error:", error);
      },
    });
  };

  return (
    <div
      style={{
        marginBottom: "30px !important",
        width: "1500px",
        margin: "0 auto",
        padding: "20px 70px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>Leads Analyzer</h1>
        <div>
          <p>Remaining Credits: {searches}</p>
        </div>
      </div>
      <br />
      <input type="file" accept=".csv" onChange={handleFileUpload} />
      <br />
      <br />
      <button
        style={{
          backgroundColor: "black",
          color: "#fff",
          padding: "10px 25px",
          borderRadius: "8px",
        }}
        onClick={analyze}
      >
        Analyze
      </button>
      <br />
      <br />
      {loading ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
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
                      <Select onValueChange={(value) => filterChange(value, i)}>
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
      {websiteData.length === 0 && !loading && (
        <img
          className={styles.demoImage}
          src={"/demoshot.png"}
          alt="Demo img"
        ></img>
      )}
    </div>
  );
}
