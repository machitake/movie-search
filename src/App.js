import './App.css';
import React, { useState, useEffect, useCallback } from 'react';
import Pagination from './components/Pagination';
import MovieModal from './components/MovieModal';
import MovieList from './components/MovieList';
import SearchBar from './components/SearchBar';

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

  // モーダル表示（映画詳細データ取得）
  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
    fetchMovieDetails(movie.id);
  };

  // モーダル閉じる
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  };

  // 映画検索
  const searchMovies = useCallback((page) => {
    const apiKey = process.env.REACT_APP_TMDB_API_KEY;
    // 映画検索
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}&language=ja-JP&page=${page}`)
      .then(res => res.json())
      .then(data => {
        setMovies(data.results);
        setTotalPages(data.total_pages);
        scrollToTop();
      })
      .catch(error => console.error('Error:', error));
  }, [query]);

  // 映画詳細データ取得
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
      setMovieDetails({ details, credits: credits.cast });
    })
    .catch(error => {
      console.error('Error:', error);
    })
    .finally(() => {
      setIsLoadingDetails(false);
    });
  }, []);

  // 映画検索
  useEffect(() => {
    if (query) {
      searchMovies(currentPage);
    }
  }, [currentPage, searchMovies, query]);

  // ページ変更
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // ページ変更時にトップにスクロール
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleInputChange = (event) => {
    setQuery(event.target.value);
    setCurrentPage(1);
  };

  return (
    <div className='movie-search-container'>
      <h1>映画検索</h1>

      {/* 検索バー */}
      <SearchBar query={query} onInputChange={handleInputChange} />

      {/* 映画一覧 */}
      <MovieList movies={movies} onMovieClick={handleMovieClick} />

      {/* モーダルコンポーネント */}
      {isModalOpen && (
        <MovieModal 
          movie={selectedMovie}
          onClose={handleCloseModal}
          movieDetails={movieDetails}
          isLoadingDetails={isLoadingDetails}
        />
      )}

      {/* ページネーションコンポーネント */}
      <Pagination 
        currentPage={currentPage} 
        totalPages={totalPages} 
        handlePageChange={handlePageChange} 
      />
    </div>
  );
}

export default MovieSearch;