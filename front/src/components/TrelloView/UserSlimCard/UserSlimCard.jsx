import React from "react";

import styles from "./assets/styles/UserSlimCard.module.css";

function UserSlimCard({ user }) {
  return (
    <div className={styles.SlimCardWrapper}>
      <div className={styles.SlimCardContent}>
        <div className={styles.SlimCardContentName}>
          {user.name}
        </div>
        <div className={styles.SlimCardContentUserInfoField}>
          {user.group || "Unmanaged"}
        </div>
      </div>
    </div>
  );
}

export default UserSlimCard