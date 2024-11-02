import React from 'react';
import './MovieModal.css';

function MovieModal({ movie, onClose }) {
  if (!movie) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <div className="modal-body">
          <div className="modal-image">
            <img 
              src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
              alt={movie.title}
            />
          </div>
          <div className="modal-info">
            <h2>{movie.title}</h2>
            <p className="release-date">公開日: {movie.release_date}</p>
            <p className="rating">評価: {movie.vote_average} / 10</p>
            <h3>あらすじ</h3>
            <p className="overview">{movie.overview}</p>
            <div className="additional-info">
              <p>原題: {movie.original_title}</p>
              <p>人気度: {movie.popularity}</p>
              <p>投票数: {movie.vote_count}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieModal;