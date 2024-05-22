import React from "react";

import HomeIntro from "../../components/HomeIntro/HomeIntro";
import styles from "./Home.module.css"

function Home() {
  return (
    <div className={styles.GlobalWrapper}>
      <HomeIntro />
    </div>
  );
}

export default Home;