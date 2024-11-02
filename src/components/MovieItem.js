import React from 'react';

const MovieItem = ({ movie, onMovieClick }) => {
  return (
    <li className="movie-item" key={movie.id} onClick={() => onMovieClick(movie)} >
      <img 
        src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} 
        alt={movie.title} 
      />
      <h3>{movie.title}</h3>
      <p>{movie.overview.slice(0, 100)}...</p>
      <p>リリース日: {movie.release_date}</p>
    </li>
  );
};

export default MovieItem;