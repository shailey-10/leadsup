import Button from '@/app/components/Button/Button';
import { UserAuth } from '@/context/authContext';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { columns } from '../columns';
import { DataTable } from '../data-table';
import { handleAnalyzeMore } from '../utils/analyzeHelpers';

const AnalyzerResults = ({
  children,
  filteredWebsiteData,
}: {
  children: React.ReactNode;
  filteredWebsiteData: any[];
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, searches, idToken, setSearches } = UserAuth();

  const handleLoadMore = () => {
    dispatch(handleAnalyzeMore({ idToken, user, searches, setSearches }));
  };

  const { activeTab } = useSelector((state: RootState) => state.analyzer);

  return (
    <>
      {children}
      <br />
      <div>
        <DataTable columns={columns} data={filteredWebsiteData} />
        {activeTab === 'search' && (
          <Button type="Primary" text="Load More" onClick={handleLoadMore} />
        )}
      </div>
    </>
  );
};

export default AnalyzerResults;
