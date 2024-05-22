import React from "react";

import styles from "./assets/styles/UserCard.module.css";
import defaultImage from "./assets/images/default_profile.webp";

function UserCard({ user }) {
  return (
    <div className={styles.CardWrapper}>
      <div className={styles.CardContent}>
        <div className={styles.CardContentName}>
          {user.name}
        </div>
        <img src={user.profilePicture || defaultImage} alt={user.name} className={styles.CardContentProfileImage}/>
        <div className={styles.CardContentUserInfoField}>
          {user.group || "Unmanaged"}
        </div>
        <div className={styles.CardContentUserInfoField}>
          {user.number}
        </div>
      </div>
    </div>
  );
}

export default UserCard