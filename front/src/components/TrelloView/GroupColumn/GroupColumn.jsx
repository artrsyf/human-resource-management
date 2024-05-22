import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus, faSortAsc, faSortDesc } from "@fortawesome/free-solid-svg-icons";

import styles from "./assets/styles/GroupColumn.module.css";
import UserSlimCard from "../UserSlimCard/UserSlimCard";

function GroupColumn({ group, groupUsers }) {
  const [sortOrder, setSortOrder] = useState("none");

  const toggleSortButton = () => {
    setSortOrder(prevSortOrder => {
      switch(prevSortOrder) {
        case "none":
          return "asc"
        case "asc":
          return "desc"
        default:
          return "none"
      }
    });
  };

  const renderSortIcon = () => {
    switch(sortOrder) {
      case "none":
        return null;
      case "asc":
        return <FontAwesomeIcon icon={faSortAsc} size="sm" className={styles.GroupColumnHeaderIco} />;
      default:
        return <FontAwesomeIcon icon={faSortDesc} size="sm" className={styles.GroupColumnHeaderIco} />;
    }
  }

  const sortedGroupUsers = [...groupUsers].sort((a, b) => {
    switch(sortOrder) {
      case "none":
        return 0
      case "asc":
        return a.name.localeCompare(b.name);
      default:
        return b.name.localeCompare(a.name);
    }
  });

  return (
    <div className={styles.GroupColumn}>
      <div className={styles.GroupColumnHeader}>
        <div className={styles.GroupColumnHeaderText} onClick={toggleSortButton}>
          {group}
        </div>
        {renderSortIcon()}
      </div>
      <div className={styles.GroupColumnList}>
        {sortedGroupUsers.map(user => (
          <UserSlimCard key={user.id} user={user} />
        ))}
      </div>
      <div className={styles.GroupColumnExpandTool}>
        <FontAwesomeIcon icon={faPlus} size="xl" />
        <Link to="#" className={styles.GroupColumnExpandToolText}>
          Добавить пользователя
        </Link>
      </div>
    </div>
  );
}

export default GroupColumn