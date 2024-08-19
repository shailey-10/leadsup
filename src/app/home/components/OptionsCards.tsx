import { UserAuth } from '@/context/authContext';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import InsertLinkOutlinedIcon from '@mui/icons-material/InsertLinkOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import Link from "next/link";
import styles from "../home.module.css";


const OptionsCards = ({ key, tier, title, description, style, image, link }: {
  key: number;
  tier: string;
  title: string;
  description: string;
  style: string;
  image: string;
  link: string;
}) => {

    const { role, user } = UserAuth();


  function RenderIcon() {
    if (image === "search") {
    return <SearchOutlinedIcon style={{ fontSize: 24 }} />
  } else if (image === "url") {
    return <InsertLinkOutlinedIcon style={{ fontSize: 24 }} />
  }else if (image === "csv") {
    return <InsertDriveFileOutlinedIcon style={{ fontSize: 24 }} />
  }
}

  return (
    <Link
      href={link}
      className={`${styles.freeOption} ${tier === "PRO" ? styles.background : ''}`}
          >
            <div className={styles.optionRow}>
              <div className={styles.titleBox}>
                {RenderIcon()}
                <h2>{title}</h2>
              </div>
              { !user?.displayName && role !== 'member' && <span className={styles[style]}>{tier}</span>}
            </div>
            <div>
              <p>{description}</p>
            </div>
          </Link>
  )
}

export default OptionsCards