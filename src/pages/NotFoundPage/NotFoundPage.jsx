import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.css';

const NotFoundPage = () => (
  <main className={styles.main}>
    <h1>Page Not Found</h1>
    <Link to="/" className={styles.link}>Go to Home</Link>
  </main>
);

export default NotFoundPage;
