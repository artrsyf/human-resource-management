import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTable, faTableCellsLarge, faColumns } from "@fortawesome/free-solid-svg-icons";

import styles from "./Users.module.css"
import UserRecordGrid from "../../components/TableView/UserRecordGrid/UserRecordGrid";
import UserCardGrid from "../../components/CardView/UserCardGrid/UserCardGrid";
import GroupGrid from "../../components/TrelloView/GroupGrid/GroupGrid";

function Users() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("table");
  const [activeButton, setActiveButton] = useState("table");

  const handleDisplayVariantButtonClick = (mode) => {
    setViewMode(mode);
    setActiveButton(mode);
  };

  const renderView = () => {
    switch (viewMode) {
      case "table":
        return <UserRecordGrid users={processedUsers} />;
      case "grid":
        return <UserCardGrid users={processedUsers} />;
      case "trelloLike":
        return <GroupGrid users={processedUsers} />;
      default:
        return null;
    }
  };
  
  useEffect(() => {
    // TODO Загрузка данных (для примера используется локальный json) Подтягиваем с ендпоинта
    // let data = [
    //   { "id": 1, "name": "John Doe", "account": "firstAcc", "email": "john@example.com", "group": "Руководство", "number": "+123(456)123-45-56" },
    //   { "id": 2, "name": "Jane Smith", "account": "secondAcc", "email": "jane@example.com", "group": "Бухгалтерия", "number": "+123(456)321-11-23" }
    // ]
    // setUsers(data)

    const usersApiUrl = process.env.REACT_APP_USERS_API_URL

    fetch(usersApiUrl+"api/users")
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error("An error occured due fetching users:", error));
  }, []);
  
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const processedUsers =  filteredUsers.map(user => ({
    ...user,
    group: user.group || "Unmanaged"
  }));

  return (
    <div className={styles.GlobalWrapper}>
      <div className={styles.TableWrapper}>
        <div className={styles.ToolsPanel}>
          <input
            type="text"
            placeholder="Поиск пользователей"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className={styles.UsersSearchInput}
          />

          <div className={styles.DisplayPanel}>
            <button 
              type="button"
              className={`${styles.DisplayPanelVariant} ${activeButton === "table" ? styles.DisplayVariantActive : ''}`}
              onClick={() => handleDisplayVariantButtonClick("table")}
            >
              <FontAwesomeIcon icon={faTable} size="xl" />
            </button>
            <button 
              type="button"
              className={`${styles.DisplayPanelVariant} ${activeButton === "grid" ? styles.DisplayVariantActive : ''}`}
              onClick={() => handleDisplayVariantButtonClick("grid")}
            >
              <FontAwesomeIcon icon={faTableCellsLarge} size="xl" />
            </button>
            <button 
              type="button"
              className={`${styles.DisplayPanelVariant} ${activeButton === "trelloLike" ? styles.DisplayVariantActive : ''}`}
              onClick={() => handleDisplayVariantButtonClick("trelloLike")}
            >
              <FontAwesomeIcon icon={faColumns} size="xl" />
            </button>
          </div>
        </div>

        {renderView()}
      </div>
    </div>
  );
}
  
  export default Users;