// HomePage.jsx
import React, { useEffect, useState } from 'react';
import MovieList from '../../components/MovieList/MovieList';
import { fetchTrendingMovies } from '../../api/tmdbApi';
import styles from './HomePage.module.css';

const HomePage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getTrendingMovies = async () => {
      try {
        const response = await fetchTrendingMovies();
        setMovies(response.data.results);
      } catch (error) {
        console.error('Error fetching trending movies:', error);
      }
    };
    getTrendingMovies();
  }, []);

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Trending Movies</h1>
      <MovieList movies={movies} /> {/* Використання MovieList */}
    </main>
  );
};

export default HomePage;
