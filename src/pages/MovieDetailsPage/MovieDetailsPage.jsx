import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate, Link, Outlet, useLocation } from 'react-router-dom';
import { fetchMovieDetails } from '../../api/tmdbApi';
import styles from './MovieDetailsPage.module.css';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [movie, setMovie] = useState(null);
  const backLinkLocationRef = useRef(location.state?.from ?? '/'); // Зберігає попередню локацію

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        const response = await fetchMovieDetails(movieId);
        setMovie(response.data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };
    getMovieDetails();
  }, [movieId]);

  return (
    <main className={styles.main}>
      {movie ? (
        <>
          <button onClick={() => navigate(backLinkLocationRef.current)} className={styles.goBack}>
            Go Back
          </button>
          <h1 className={styles.title}>{movie.title}</h1>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className={styles.poster}
          />
          <p className={styles.overview}>{movie.overview}</p>
          <nav className={styles.nav}>
            <Link to="cast" className={styles.link}>Cast</Link>
            <Link to="reviews" className={styles.link}>Reviews</Link>
          </nav>
          <Outlet />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </main>
  );
};

export default MovieDetailsPage;
