import React from "react";

import styles from "./assets/styles/GroupGrid.module.css";
import GroupColumn from "../GroupColumn/GroupColumn";

function GroupGrid({ users }) {
  const groupMap = users.reduce((acc, user) => {
    if (!acc[user.group]) {
      acc[user.group] = [];
    }
    acc[user.group].push(user);

    return acc;
  }, {});

  return (
    <div className={styles.GroupGrid}>
      {Object.entries(groupMap).map(([group, groupUsers]) => (
        <GroupColumn key={group} group={group} groupUsers={groupUsers} />
      ))}

      <div className={styles.GroupColumn}>
        <div className={styles.GroupColumnHeader}>
          Добавить группу
        </div>
      </div>
    </div>
  );
}

export default GroupGrid