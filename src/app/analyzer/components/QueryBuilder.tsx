import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { filters } from '@/constants/filters';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import exportFromJSON from 'export-from-json';
import { useDispatch, useSelector } from 'react-redux';
import { setFilteredWebsiteData } from '../../redux/analyzerSlice';
import styles from '../page.module.css';

const QueryBuilder = ({
  selectedFilter,
  setSelectedFilter,
}: {
  selectedFilter: Array<{ filter: string; value: string }>;
  setSelectedFilter: React.Dispatch<
    React.SetStateAction<Array<{ filter: string; value: string }>>
  >;
}) => {
  const dispatch = useDispatch();
  const { websiteData } = useSelector((state: any) => state.analyzer);
  const filterChange = (value: string, i: number) => {
    let tempFilters = [...selectedFilter];
    tempFilters[i].filter = value;
    setSelectedFilter(tempFilters);
  };

  const valueChange = (value: string, i: number) => {
    let tempFilters = [...selectedFilter];
    tempFilters[i].value = value;
    setSelectedFilter(tempFilters);
  };

  const addFilter = () => {
    let tempFilters = [...selectedFilter];
    tempFilters.push({ filter: '', value: '' });
    setSelectedFilter(tempFilters);
  };

  const removeFilter = (i: number) => {
    let tempFilters = [...selectedFilter];
    tempFilters.splice(i, 1);
    setSelectedFilter(tempFilters);
  };

  const applyQuery = () => {
    let tempData = [...websiteData];
    selectedFilter.forEach((filterItem: { value: string; filter: any }) => {
      let value = filterItem.value === 'Yes';
      tempData = tempData.filter((item) => item[filterItem.filter] === value);
    });
    dispatch(setFilteredWebsiteData(tempData));
  };

  function downloadCsv() {
    const data = [...websiteData];
    const fileName = 'Leads Data';
    const exportType = exportFromJSON.types.csv;
    exportFromJSON({ data, fileName, exportType });
  }

  return (
    <div className={styles.queryBuilder}>
      <div className={styles.filters}>
        <p>Filter:</p>
        <div className={styles.queryBuilder}>
          {selectedFilter.map((filter: any, i: number) => (
            <div className={styles.queryItems} key={i}>
              <Select onValueChange={(value) => filterChange(value, i)}>
                <SelectTrigger className={styles.select}>
                  <SelectValue placeholder="Filters" />
                </SelectTrigger>
                <SelectContent className={styles.selectContent}>
                  {filters.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.display}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select onValueChange={(value) => valueChange(value, i)}>
                <SelectTrigger className={styles.select}>
                  <SelectValue placeholder="Value" />
                </SelectTrigger>
                <SelectContent className={styles.selectContent}>
                  <SelectItem value="Yes">Yes</SelectItem>
                  <SelectItem value="No">No</SelectItem>
                </SelectContent>
              </Select>
              <CancelOutlinedIcon onClick={() => removeFilter(i)} />
            </div>
          ))}
        </div>
        <div className={styles.queryParams}>
          {selectedFilter.length < 3 && (
            <AddCircleOutlineRoundedIcon onClick={addFilter} />
          )}
        </div>
      </div>
      <div>
        <button
          style={{
            backgroundColor: 'black',
            color: '#fff',
            padding: '10px 25px',
            borderRadius: '8px',
          }}
          onClick={applyQuery}
        >
          Apply Query
        </button>
        <button
          style={{
            backgroundColor: '#000',
            padding: '10px 18px',
            color: '#fff',
            borderRadius: '6px',
            marginBottom: '10px',
            marginLeft: '10px',
          }}
          onClick={downloadCsv}
        >
          Export to csv
        </button>
      </div>
    </div>
  );
};

export default QueryBuilder;
