import { Outlet } from "react-router-dom";

import NavBar from "../../components/NavBar/NavBar"
import styles from "./Layout.module.css"

const Layout = () => {
  return (
    <div className={styles.Layout}>
      <NavBar className={styles.NavBar} />
      <div className={styles.Content}>
        <Outlet />
      </div>  
    </div>
  )
};

export default Layout;