import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieCast } from '../../api/tmdbApi';
import styles from './MovieCast.module.css';

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const getCast = async () => {
      try {
        const response = await fetchMovieCast(movieId);
        setCast(response.data.cast);
      } catch (error) {
        console.error('Error fetching movie cast:', error);
      }
    };
    getCast();
  }, [movieId]);

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Cast</h2>
      <ul className={styles.list}>
        {cast.map(member => (
          <li key={member.id} className={styles.item}>
            <img
              src={`https://image.tmdb.org/t/p/w200${member.profile_path}`}
              alt={member.name}
              className={styles.image}
            />
            <p>{member.name}</p>
            <p>{member.character}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default MovieCast;
