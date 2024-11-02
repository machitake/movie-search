import React from 'react';

export default function Pagination({ currentPage, totalPages, onPageChange }) {

  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
      scrollToTop();
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
      scrollToTop();
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div>
      <button onClick={handlePrevPage} disabled={currentPage === 1}>前へ</button>
      <span>ページ {currentPage} / {totalPages}</span>
      <button onClick={handleNextPage} disabled={currentPage === totalPages || totalPages === 0}>次へ</button>
    </div>
  );
}