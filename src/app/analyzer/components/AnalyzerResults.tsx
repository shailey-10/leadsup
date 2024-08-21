import Button from "@/app/components/Button/Button";
import { UserAuth } from "@/context/authContext";
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { columns } from "../columns";
import { DataTable } from "../data-table";
import { handleAnalyzeMore } from "../utils/analyzeHelpers";

const AnalyzerResults = ({ children, filteredWebsiteData }: { children: React.ReactNode; filteredWebsiteData: any[] }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, searches, idToken, setSearches } = UserAuth();

  const handleLoadMore = () => {
    dispatch(handleAnalyzeMore({ idToken, user, searches, setSearches }));
  };

  return (
    <>
      {children}
      <br />
      <div>
        <DataTable columns={columns} data={filteredWebsiteData} />
        <Button type="Primary" text="Load More" onClick={handleLoadMore} />
      </div>
    </>
  );
};

export default AnalyzerResults;