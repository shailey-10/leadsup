import Button from "@/app/components/Button/Button";
import { UserAuth } from "@/context/authContext";
import { columns } from "../columns";
import { DataTable } from "../data-table";
import useAnalyzerStates from "../hooks/useAnalyzerStates";
import { handleAnalyzeMore } from "../utils/analyzeHelpers";

const AnalyzerResults = ({ children, filteredWebsiteData }: { children: React.ReactNode; filteredWebsiteData: any[] }) => {
  const { analyzedCount, allWebsiteUrls,  dispatch,   parsedData, setLoading, activeTab, setLoadingMessage, setAnalyzedCount, setAllWebsiteUrls } = useAnalyzerStates();
  const {user, searches, idToken, setSearches} = UserAuth();
  return (
    <>
      {children}
      <br />
      <div>
        <DataTable columns={columns} data={filteredWebsiteData} />
        <Button type="Primary" text="Load More" onClick={() => handleAnalyzeMore(analyzedCount, allWebsiteUrls, idToken, dispatch, user, searches, setSearches, parsedData, setLoading, activeTab, setLoadingMessage, setAnalyzedCount, setAllWebsiteUrls)}/>
      </div>
    </>
  );
};

export default AnalyzerResults;