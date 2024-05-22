import React, { useMemo } from "react";
import { useTable, useSortBy, usePagination, useFilters } from "react-table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleRight, faAngleLeft, faAngleDoubleRight, faAngleDoubleLeft, faSortAsc, faSortDesc } from "@fortawesome/free-solid-svg-icons";

import styles from "./assets/styles/UserRecordGrid.module.css";

function UserRecordGrid({ users }) {
  const columns = useMemo(
    () => [
      {
        Header: "Полное имя",
        accessor: "name",
      },
      {
        Header: "Учетная запись",
        accessor: "account",
      },
      {
        Header: "Электронная почта",
        accessor: "email",
      },
      {
        Header: "Группа",
        accessor: "group",
      },
      {
        Header: "Номер телефона",
        accessor: "number",
      },
    ],
    []
  );

  const data = useMemo(() => users, [users]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    useFilters,
    useSortBy,
    usePagination
  );

  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  <div className={styles.ThContent}>
                    {column.render("Header")}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? <FontAwesomeIcon icon={faSortDesc} size="sm"  />
                          : <FontAwesomeIcon icon={faSortAsc} size="sm"  />
                        : ""}
                    </span>
                  </div> 
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className={styles.Pagination}>
        <div className={styles.PaginationButtonsContainer}>
          <button type="button" className={styles.PaginationButton} onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
            <FontAwesomeIcon icon={faAngleDoubleLeft} size="lg" />
          </button>
          <button type="button" className={styles.PaginationButton} onClick={() => previousPage()} disabled={!canPreviousPage}>
            <FontAwesomeIcon icon={faAngleLeft} size="lg" />
          </button>
          <span>
            {pageIndex + 1} из {pageOptions.length === 0 ? 1 : pageOptions.length}{" "}
          </span>
          <button type="button" className={styles.PaginationButton} onClick={() => nextPage()} disabled={!canNextPage}>
            <FontAwesomeIcon icon={faAngleRight} size="lg" />
          </button>
          <button type="button" className={styles.PaginationButton} onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
            <FontAwesomeIcon icon={faAngleDoubleRight} size="lg" />
          </button>
        </div>
        <span>
          Перейти:{" "}
          <input  
            type="number"
            className={styles.PaginationGoTo}
            defaultValue={pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
          />
        </span>
        <select
          className={styles.PaginationSelect}
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Показать {pageSize}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}

export default UserRecordGrid