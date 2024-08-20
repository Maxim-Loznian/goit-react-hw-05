import React, { useState, useEffect } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import MovieList from '../../components/MovieList/MovieList';
import { searchMovies } from '../../api/tmdbApi';
import styles from './MoviesPage.module.css';

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState(searchParams.get('query') || '');
  const location = useLocation(); // Отримання локації

  useEffect(() => {
    const fetchMovies = async () => {
      const queryParam = searchParams.get('query');
      if (queryParam) {
        try {
          const response = await searchMovies(queryParam);
          setMovies(response.data.results);
        } catch (error) {
          console.error('Error searching movies:', error);
        }
      } else {
        setMovies([]); // Очистити список фільмів, якщо немає запиту
      }
    };

    fetchMovies();
  }, [searchParams]);

  useEffect(() => {
    if (location.state?.query) {
      setQuery(location.state.query);
      setSearchParams({ query: location.state.query });
    }
  }, [location.state, setSearchParams]);

  const handleSearch = async (event) => {
    event.preventDefault();
    setSearchParams({ query }); // Оновити параметри запиту URL
    
    if (query) {
      try {
        const response = await searchMovies(query);
        setMovies(response.data.results);
      } catch (error) {
        console.error('Error searching movies:', error);
      }
    } else {
      setMovies([]);
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
