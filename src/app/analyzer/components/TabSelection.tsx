
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import InsertLinkOutlinedIcon from '@mui/icons-material/InsertLinkOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import styles from "../page.module.css";

const TabSelection = ({ activeTab, handleTabChange }: { activeTab: string; handleTabChange: (tabId: string) => void }) => {
  const tabs = [
    { id: "search", title: "Find with search", description: 'Search like "Gyms in New York"' },
    { id: "url", title: "Find with URL", description: "Enter any website URL" },
    { id: "csv", title: "Find with .csv", description: "Upload a .csv file with website links" },
  ];
    function RenderIcon(id: string) {
    if (id === "search") {
    return <SearchOutlinedIcon style={{ fontSize: 24 }} />
  } else if (id === "url") {
    return <InsertLinkOutlinedIcon style={{ fontSize: 24 }} />
  }else if (id === "csv") {
    return <InsertDriveFileOutlinedIcon style={{ fontSize: 24 }} />
  }
}

  return (
    <div className={styles.optionsContainer}>
      {tabs.map((tab) => (
        <div
          key={tab.id}
          className={`${styles.option} ${activeTab === tab.id ? styles.active : ""}`}
          onClick={() => handleTabChange(tab.id)}
        >
          <div className={styles.optionRow}>
            {RenderIcon(tab.id)}
          </div>
          <div className={styles.optionText}>
            <h2>{tab.title}</h2>
            <p>{tab.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TabSelection;