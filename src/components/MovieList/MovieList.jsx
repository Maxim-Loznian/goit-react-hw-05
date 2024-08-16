import React from 'react';
import PropTypes from 'prop-types';
import styles from './MovieList.module.css';

const MovieList = ({ movies }) => (
  <ul className={styles.movieList}>
    {movies.map(movie => (
      <li key={movie.id} className={styles.movieItem}>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className={styles.movieImage}
        />
        <h3 className={styles.movieTitle}>{movie.title}</h3>
      </li>
    ))}
  </ul>
);

MovieList.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    poster_path: PropTypes.string.isRequired,
  })).isRequired,
};

export default MovieList;
