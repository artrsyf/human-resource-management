import React from "react";

import styles from "./assets/styles/HomeIntro.module.css";
import image from "./assets/images/cat.webp"

function HomeIntro() {
  return (
    <div className={styles.HomeIntroWrapper}>
      <img className={styles.HomeIntroImage} src={image} alt="Intro"/>
      <div className={styles.HomeIntroText}>
        Тестовое задание по направлению "Разработка JavaScript. SafeBoard H1 2024"
      </div>
      <div className={styles.HomeIntroText}>
        Выполнил Фадеев Роман
      </div>
    </div>
  );
}

export default HomeIntro