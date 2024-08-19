import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import MovieList from '../../components/MovieList/MovieList'; // Правильний шлях до MovieList
import { searchMovies } from '../../api/tmdbApi';
import styles from './MoviesPage.module.css';

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState(searchParams.get('query') || '');

  const handleSearch = async (event) => {
    event.preventDefault(); // Запобігти перезавантаженню сторінки
    setSearchParams({ query }); // Оновити параметри запиту URL
    
    if (query) {
      try {
        const response = await searchMovies(query);
        setMovies(response.data.results);
      } catch (error) {
        console.error('Error searching movies:', error);
      }
    } else {
      setMovies([]); // Очистити список фільмів, якщо немає запиту
    }
  };

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  return (
    <main className={styles.main}>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search for movies..."
          className={styles.searchInput}
        />
        <button type="submit" className={styles.searchButton}>Search</button>
      </form>
      <MovieList movies={movies} /> {/* Використання MovieList */}
    </main>
  );
};

export default MoviesPage;
