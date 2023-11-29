"use client";
import { useState } from "react";

const Test = () => {
  const [apiData, setApiData] = useState(null);

  const fetchData = async () => {
    const apiUrl = "/api/scrape"; // Replace with the actual API endpoint URL

    const industry = "restaurants"; // Example industry parameter
    const location = "New York"; // Example location parameter

    const requestData = {
      industry,
      location,
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
        throw new Error("Error fetching data");
      }

      const data = await response.json();
      setApiData(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      {/* Your component JSX */}
      <button onClick={fetchData}>Fetch Data</button>
      {/* Render the API data */}
      {/* {apiData && <pre>{JSON.stringify(apiData, null, 2)}</pre>} */}
    </div>
  );
};

export default Test;
