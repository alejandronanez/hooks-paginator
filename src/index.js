import React from 'react';
import ReactDOM from 'react-dom';
// Get fake data - Not related to the library
import fakeData from './fakeData';

import usePaginator from './Paginator';

import './styles.css';

function App() {
  const {
    currentPageData,
    currentPage,
    moveToNextPage,
    moveToPreviousPage,
    totalPages,
    isNextPageEnabled,
    isPrevPageEnabled,
  } = usePaginator({
    data: fakeData(),
    pageSize: 5,
  });
  return (
    <div className="App">
      <h1>CurrentPage: {currentPage}</h1>
      <h1>Total Pages: {totalPages}</h1>
      <button
        onClick={moveToPreviousPage}
        type="button"
        disabled={!isPrevPageEnabled}
      >
        Prev Page
      </button>
      <button
        onClick={moveToNextPage}
        type="button"
        disabled={!isNextPageEnabled}
      >
        Next Page
      </button>
      <ul>
        {currentPageData.map((d, index) => (
          <li key={d.id}>{d.email}</li>
        ))}
      </ul>
    </div>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
