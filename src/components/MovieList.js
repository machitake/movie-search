// MovieList.js
import React from 'react';
import MovieItem from './MovieItem';

const MovieList = ({ movies, onMovieClick }) => {
  return (
    <ul className="movie-list">
      {movies.map((movie) => (
        <MovieItem key={movie.id} movie={movie} onMovieClick={onMovieClick} />
      ))}
    </ul>
  );
};

export default MovieList;