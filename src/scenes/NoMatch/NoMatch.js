import React from "react";
import { Link } from "react-router-dom";
import styles from "./NoMatch.module.css";

function NoMatch() {
  return (
    <div className={styles.container}>
      <h1 className={styles.bigTitle}>404</h1>
      <Link className={styles.link} to="/">
        Go back to dashboard.
      </Link>
    </div>
  );
}

export default NoMatch;
