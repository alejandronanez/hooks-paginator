import { useState, useEffect } from 'react';

function chunker(array, size) {
  let newArray = [];

  while (array.length) {
    newArray.push(array.splice(0, size));
  }

  return newArray;
}

function usePaginator({ data = [], pageSize }) {
  if (!Array.isArray(data)) {
    throw new Error('Data must be an array');
  }

  const [chunkedData, setChunkedData] = useState([]);
  // prev/next pages info
  const [isPrevPageEnabled, setIsPrevPageEnabled] = useState(false);
  const [isNextPageEnabled, setIsNextPageEnabled] = useState(false);
  // page info
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  // current data
  const [currentPageData, setCurrentPageData] = useState([]);

  // Initialize everything
  useEffect(() => {
    const chunkedArray = chunker(data, pageSize);
    setChunkedData(chunkedArray);
    setCurrentPageData(chunkedArray[0]);
    setTotalPages(chunkedArray.length);
  }, []);

  // Check if next/prev pages are available
  useEffect(() => {
    isNextPageAvailable();
    isPreviousPageAvailable();
  });

  function isNextPageAvailable() {
    setIsNextPageEnabled(currentPage + 1 <= totalPages);
  }

  function isPreviousPageAvailable() {
    setIsPrevPageEnabled(currentPage - 1 > 0);
  }

  function moveToNextPage() {
    if (!isNextPageEnabled) {
      return;
    }

    updateCurrentPage(currentPage + 1);
  }

  function moveToPreviousPage() {
    if (!isPrevPageEnabled) {
      return;
    }

    updateCurrentPage(currentPage - 1);
  }

  function updateCurrentPage(currentPageIndex) {
    setCurrentPage(currentPageIndex);
    setCurrentPageData(chunkedData[currentPageIndex - 1]);
  }

  return {
    chunkedData,
    currentPage,
    setCurrentPage,
    moveToNextPage,
    moveToPreviousPage,
    isNextPageEnabled,
    isPrevPageEnabled,
    currentPageData,
    totalPages,
  };
}

export default usePaginator;
