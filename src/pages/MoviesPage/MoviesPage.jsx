import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { searchMovies } from '../../api/tmdbApi';
import styles from './MoviesPage.module.css';

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState(searchParams.get('query') || '');

  const handleSearch = async () => {
    if (query) {
      try {
        const response = await searchMovies(query);
        setMovies(response.data.results);
      } catch (error) {
        console.error('Error searching movies:', error);
      }
    }
  };

  // Use this function to handle when the user presses the "Enter" key
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  // Call handleSearch whenever the query changes
  React.useEffect(() => {
    if (query) {
      handleSearch();
    }
  }, [query]);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
    setSearchParams({ query: event.target.value });
  };

  return (
    <main className={styles.main}>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Search for movies..."
        className={styles.searchInput}
      />
      <button onClick={handleSearch} className={styles.searchButton}>Search</button>
      <ul className={styles.movieList}>
        {movies.length > 0 ? (
          movies.map(movie => (
            <li key={movie.id} className={styles.movieItem}>
              <Link to={`/movies/${movie.id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className={styles.poster}
                />
                <p>{movie.title}</p>
              </Link>
            </li>
          ))
        ) : (
          <p>No movies found</p>
        )}
      </ul>
    </main>
  );
};

export default MoviesPage;
