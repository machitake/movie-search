import './App.css';
import React, { useState, useEffect, useCallback } from 'react';
import Pagination from './components/Pagination';
import MovieModal from './components/MovieModal';
function MovieSearch() {
  //検索キーワード
  const [query, setQuery] = useState('');
  //映画のリスト
  const [movies, setMovies] = useState([]);
  //現在のページ
  const [currentPage, setCurrentPage] = useState(1);
  //総ページ数
  const [totalPages, setTotalPages] = useState(0);
  //選択された映画
  const [selectedMovie, setSelectedMovie] = useState(null);
  //モーダルの表示状態
  const [isModalOpen, setIsModalOpen] = useState(false);
  // 映画の詳細情報 
  const [movieDetails, setMovieDetails] = useState(null);  
  // 映画の詳細情報のローディング状態
  const [isLoadingDetails, setIsLoadingDetails] = useState(false); 

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
    fetchMovieDetails(movie.id);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  };

  const searchMovies = useCallback((page) => {
    const apiKey = process.env.REACT_APP_TMDB_API_KEY;
    // 映画検索
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}&language=ja-JP&page=${page}`)
      .then(res => res.json())
      .then(data => {
        setMovies(data.results);
        setTotalPages(data.total_pages);
      })
      .catch(error => console.error('Error:', error));
  }, [query]);

  const fetchMovieDetails = useCallback((movieId) => {
    setIsLoadingDetails(true);
  
    const apiKey = process.env.REACT_APP_TMDB_API_KEY;
  
    Promise.all([
      fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=ja-JP`),
      fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}&language=ja-JP`)
    ])
    .then(([detailsRes, creditsRes]) => {
      return Promise.all([detailsRes.json(), creditsRes.json()]);
    })
    .then(([details, credits]) => {
      console.log('Movie Details:', details);
      console.log('Movie Credits:', credits);
      setMovieDetails({ details, credits: credits.cast });
    })
    .catch(error => {
      console.error('Error:', error);
    })
    .finally(() => {
      setIsLoadingDetails(false);
    });
  }, []);

  useEffect(() => {
    if (query) {
      searchMovies(currentPage);
    }
  }, [currentPage, searchMovies, query]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleInputChange = (event) => {
    setQuery(event.target.value);
    setCurrentPage(1);
  };

  return (
    <div className='movie-search-container'>
      <h1>映画検索</h1>
      <div className="search-bar">
        <input 
          type="text" 
          value={query} 
          onChange={handleInputChange} 
          placeholder="映画を検索"
        />
      </div>

      <ul className="movie-list">
        {movies.map(movie => (
          <li className="movie-item" key={movie.id} onClick={() => handleMovieClick(movie)} >
            <img 
              src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} 
              alt={movie.title} 
            />
            <h3>{movie.title}</h3>
            <p>{movie.overview}</p>
            <p>リリース日: {movie.release_date}</p>
          </li>
        ))}
      </ul>

      {/* モーダルコンポーネントを追加 */}
      {isModalOpen && (
        <MovieModal 
          movie={selectedMovie}
          onClose={handleCloseModal}
          movieDetails={movieDetails}
          isLoadingDetails={isLoadingDetails}
        />
      )}

      <Pagination 
        currentPage={currentPage} 
        totalPages={totalPages} 
        onPageChange={handlePageChange} 
      />
    </div>
  );
}

export default MovieSearch;