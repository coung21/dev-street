import React from 'react';

function Paging({ page, setPage }) {
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage !== page) {
      setPage(newPage);
    }
  };

  return (
    <nav className="ml-auto" aria-label="pagination">
      <ul className="pagination">
        <li className="page-item1">
          <button
            aria-label="Previous"
            className="page-link"
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
          >
            <span aria-hidden="true">
              <i aria-hidden="true" className="fa fa-angle-double-left"></i>
            </span>
          </button>
        </li>
        <li className="page-item1">
          <button
            aria-label="Next"
            className="page-link"
            onClick={() => handlePageChange(page + 1)}
          >
            <span aria-hidden="true">
              <i aria-hidden="true" className="fa fa-angle-double-right"></i>
            </span>
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Paging;
