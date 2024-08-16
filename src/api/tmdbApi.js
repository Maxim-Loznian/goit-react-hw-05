import axios from 'axios';

// Ваш реальний API ключ та токен доступу
const API_KEY = 'f29794a718ccced2c1cb00bdb6fbe240'; // Ваш API ключ
const ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMjk3OTRhNzE4Y2NjZWQyYzFjYjAwYmRiNmZiZTI0MCIsIm5iZiI6MTcyMzczMzA0NS43OTE2MTgsInN1YiI6IjY2YmRkODFhYmRlYWY3NmQxZWUxNDMwZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qaflhWZse_iHa_I1sWMbTsoUiio1vb2ZtZxT06qogdg'; 

const BASE_URL = 'https://api.themoviedb.org/3';

const instance = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'en-US',
  },
  headers: {
    Authorization: `Bearer ${ACCESS_TOKEN}`, // Ваш реальний токен
  },
});

export const fetchTrendingMovies = () =>
  instance.get('/trending/movie/day');

export const searchMovies = (query) =>
  instance.get('/search/movie', {
    params: { query, include_adult: false },
  });

export const fetchMovieDetails = (movieId) =>
  instance.get(`/movie/${movieId}`);

export const fetchMovieCast = (movieId) =>
  instance.get(`/movie/${movieId}/credits`);

export const fetchMovieReviews = (movieId) =>
  instance.get(`/movie/${movieId}/reviews`);
