import Papa from "papaparse";
import { useRef, useState } from "react";
import Button from '../../components/Button/Button';
import styles from "../page.module.css";
export const SearchInput = ({ searchQuery, setSearchQuery }: { searchQuery: string; setSearchQuery: (query: string) => void }) => (
  <input
  className={styles.input}
    type="text"
    placeholder='Search like "Gyms in New York"'
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
  />
);

export const UrlInput = ({ websiteUrl, setWebsiteUrl }: { websiteUrl: string; setWebsiteUrl: (url: string) => void }) => (
  <input
  className={styles.input}
    type="text"
    placeholder="Enter website URL"
    value={websiteUrl}
    onChange={(e) => setWebsiteUrl(e.target.value)}
  />
);

export const CsvInput = ({ setWebsites, setParsedData }: { setWebsites: (websites: string[]) => void, setParsedData: (data: any[]) => void }) => {
  const [hasFiles, setHasFiles] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  function handleDragOver(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
  }
  function handleDrop(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    const file = event.dataTransfer?.files[0];
    if (file) {
      handleFileUpload(file);
      setHasFiles(true);
    }
  }

  const handleFileUpload = (file: File) => {
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
  <div className={styles.dragDrop}
    onDragOver={handleDragOver}
    onDrop={handleDrop}
  >
    <h3>{hasFiles ? ".CSV uploaded" : "Drop your .CSV file here"}</h3>
    <input
      type="file"
      accept=".csv"
      onChange={(e) => {
        const file = e.target.files?.[0];
        if (file) {
          handleFileUpload(file);
          setHasFiles(true);
        }
      }}
      hidden
      ref={fileInputRef}
    />
    <Button type="Primary" text={hasFiles ? "Re Upload" : "Upload"} onClick={() => fileInputRef.current?.click()} />
  </div>
  );
};