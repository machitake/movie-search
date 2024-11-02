import './App.css';
import React, { useState, useEffect } from 'react';
import Pagination from './components/Pagination';

function MovieSearch() {
  //検索キーワード
  const [query, setQuery] = useState('');
  //映画のリスト
  const [movies, setMovies] = useState([]);
  //現在のページ
  const [currentPage, setCurrentPage] = useState(1);
  //総ページ数
  const [totalPages, setTotalPages] = useState(0);

  //ページ変更用の関数
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };


  //映画を検索する関数
  const searchMovies = (page) => {
    const apiKey = process.env.REACT_APP_TMDB_API_KEY;
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}&language=ja-JP&page=${page}`)
      .then(res => res.json())
      .then(data => {
        setMovies(data.results);
        // console.log(data.results);
        setTotalPages(data.total_pages);
        // console.log(data.total_pages);
      })
      .catch(error => console.error('Error:', error));
  };

  //currentPageが変更されたときに映画を検索
  useEffect(() => {
    searchMovies(currentPage);
  }, [currentPage]);

  //入力のたびにsetQueryを更新
  const handleInputChange = (event) => {
    setQuery(event.target.value);
    setCurrentPage(1);
    searchMovies(1);
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
          <li className="movie-item" key={movie.id} onClick={() => console.log(movie)}>
            {/* ポスター画像 */}
            <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt={movie.title} />
            {/* タイトル */}
            <h3>{movie.title}</h3>
            {/* 概要 */}
            <p>{movie.overview}</p>
            {/* リリース日 */}
            <p>{movie.release_date}</p>
          </li>
        ))}
      </ul>

      <Pagination 
        currentPage={currentPage} 
        totalPages={totalPages} 
        onPageChange={handlePageChange} 
      />
    </div>
  );
}

export default MovieSearch;