import React from 'react';

export default function Pagination({ currentPage, totalPages, handlePageChange }) {

  // 前のページ
  const handlePrevPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  // 次のページ
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  // ページがない場合はnullを返す
  if (totalPages === 0) {
    return null;
  }

  return (
    <div>
      <button onClick={handlePrevPage} disabled={currentPage === 1}>前へ</button>
      <span>ページ {currentPage} / {totalPages}</span>
      <button onClick={handleNextPage} disabled={currentPage === totalPages || totalPages === 0}>次へ</button>
    </div>
  );
}