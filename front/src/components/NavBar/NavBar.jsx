import React, { useState } from "react";
import { Link } from "react-router-dom";

import styles from "./assets/styles/NavBar.module.css";

function Navbar() {
  const [isActive, setIsActive] = useState(false);

  const toggleActiveClass = () => {
    setIsActive(!isActive);
  };

  const removeActive = () => {
    setIsActive(false)
  }

  return (
    <div className="AppNav">
      <header className="AppNav-header">
        <nav className={styles.NavBar}>
          <Link to="/" className={styles.Logo}>SafeBoard JS</Link>
          <ul className={`${styles.NavMenu} ${isActive ? styles.active : ''}`}>
            <li onClick={removeActive}>
              <Link to="/" className={`${styles.NavLink}`}>Главная</Link>
            </li>
            <li onClick={removeActive}>
              <Link to="/users" className={styles.NavLink}>Пользователи</Link>
            </li>
          </ul>
          <div className={`${styles.hamburger} ${isActive ? styles.active : ''}`}  onClick={toggleActiveClass}>
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
          </div>
        </nav>
      </header>
    </div>
  );
}

export default Navbar;