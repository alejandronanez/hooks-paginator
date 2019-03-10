import React, { useState, useEffect } from "react";

function chunker(array, size) {
  let newArray = [];

  while (array.length) {
    newArray.push(array.splice(0, size));
  }

  return newArray;
}

function usePaginator({ data = [], pageSize }) {
  if (!Array.isArray(data)) {
    throw new Error("Data must be an array");
  }

  const [chunkedData, setChunkedData] = useState([]);
  // prev/next pages info
  const [isPrevPageEnabled, setPrevPageEnabled] = useState(false);
  const [isNextPageEnabled, setNextPageEnabled] = useState(false);
  // page info
  const [currentPage, setCurrentPage] = useState(1);
  const [nextPage, setNextPage] = useState(currentPage + 1);
  const [totalPages, setTotalPages] = useState(1);
  const [prevPage, setPrevPage] = useState(currentPage - 1);
  // current data
  const [currentPageData, setCurrentPageData] = useState([]);
  const [nextPageData, setNextPageData] = useState([]);
  const [prevPageData, setPrevPageData] = useState([]);

  useEffect(() => {
    const chunkedArray = chunker(data, pageSize);
    setChunkedData(chunkedArray);
    setCurrentPageData(chunkedArray[0]);
    setTotalPages(chunkedArray.length);
  }, []);

  return {
    chunkedData,
    currentPage,
    nextPage,
    prevPage,
    setCurrentPage,
    setNextPage,
    setPrevPage,
    isNextPageEnabled,
    isPrevPageEnabled,
    currentPageData,
    nextPageData,
    prevPageData,
    totalPages
  };
}

export default usePaginator;
