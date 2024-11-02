import React from 'react';
import './MovieModal.css';

function MovieModal({ movie, onClose, movieDetails, isLoadingDetails }) {
  if (!movie || !movieDetails || isLoadingDetails) return null;

  const { details, credits } = movieDetails;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        {isLoadingDetails ? (
          <div className="loading-container">
            <p>Loading...</p>
          </div>
        ) : (
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
              <h3>詳細情報</h3>
              <div className="details-info">
                <p>ジャンル: {details.genres.map(genre => genre.name).join(', ')}</p>
                <p>上映時間: {details.runtime} 分</p>
                <p>製作国: {details.production_countries.map(country => country.name).join(', ')}</p>
                <p>製作会社: {details.production_companies.map(company => company.name).join(', ')}</p>
                <p>収支: 収入 - {details.revenue.toLocaleString()}円, 予算 - {details.budget.toLocaleString()}円</p>
                <p>公式サイト: {details.homepage || '情報なし'}</p>
              </div>
              <h3>キャスト</h3>
              <div className="cast-info">
                {credits.slice(0, 2).map(cast => (
                  <div key={cast.id} className="cast-member">
                    <img 
                      src={`https://image.tmdb.org/t/p/w185${cast.profile_path}`}
                      alt={cast.name}
                    />
                    <p>{cast.name}</p>
                    <p>キャラクター: {cast.character}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MovieModal;