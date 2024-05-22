import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleRight, faAngleLeft, faAngleDoubleRight, faAngleDoubleLeft } from "@fortawesome/free-solid-svg-icons";

import styles from "./assets/styles/UserCardGrid.module.css";
import UserCard from "../UserCard/UserCard";

const UserCardGrid = ({ users }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(5);

  const totalPages = Math.ceil(users.length / usersPerPage);
  const currentUsers = users.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  const handleFirstPage = () => {
    setCurrentPage(1);
  }

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handleLastPage = () => {
    setCurrentPage(totalPages);
  }

  return (
    <div className={styles.UserCardGridWrapper}>
      <div className={styles.UserCardGrid}>
        {currentUsers.map(user => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>

      <div className={styles.Pagination}>
        <button
          onClick={handleFirstPage}
          disabled={currentPage === 1}
          className={styles.PaginationButton}
        >
          <FontAwesomeIcon icon={faAngleDoubleLeft} size="lg" />
        </button>
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className={styles.PaginationButton}
        >
          <FontAwesomeIcon icon={faAngleLeft} size="lg" />
        </button>
        <span>
          {currentPage} из {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={styles.PaginationButton}
        >
          <FontAwesomeIcon icon={faAngleRight} size="lg" />
        </button>
        <button
          onClick={handleLastPage}
          disabled={currentPage === totalPages}
          className={styles.PaginationButton}
        >
          <FontAwesomeIcon icon={faAngleDoubleRight} size="lg" />
        </button>

        <select
          className={styles.PaginationSelect}
          value={usersPerPage}
          onChange={e => {
            setUsersPerPage(Number(e.target.value));
          }}
        >
          {[5, 10, 15, 20, 25].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Показать {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default UserCardGrid;