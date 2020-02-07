import React from 'react'

const Pagination = ({ page, hitsPerPage, nbHits, nbPages, stepPage, toPage}) => {
  return (
    <>
    <h3 className="text-center">Showing {page * hitsPerPage + 1}-{(page + 1) * hitsPerPage} of {nbHits} results.</h3>
    <nav aria-label="...">
      <ul className="pagination pagination-lg justify-content-center">
        <li className={page ? "page-item" : "page-item disabled"}>
          <button className="page-link" onClick={() => stepPage(-1)}>Previous</button>
        </li>
        {page > 0 &&
          <li className="page-item">
            <button className="page-link" onClick={() => stepPage(-1)}>{page}</button>
          </li>
        }
        <li className="page-item active" aria-current="page">
          <button className="page-link">{page + 1}<span className="sr-only">(current)</span></button>
        </li>
        {(page < nbPages - 1) &&
          <li className="page-item">
            <button className="page-link" onClick={() => stepPage(1)}>{page + 2}</button>
          </li>
        }
        {(page < nbPages - 3) && (
          <>
            <li className="page-item disabled" aria-current="page">
              <button className="page-link">...</button>
            </li>
            <li className="page-item">
              <button className="page-link" onClick={() => toPage(nbPages - 1)}>{nbPages}</button>
            </li>
          </>
        )}
        <li className={page === nbPages - 1 ? "page-item disabled" : "page-item"}>
          <button className="page-link" onClick={() => stepPage(1)}>Next</button>
        </li>
      </ul>
    </nav>
    </>
  )
}

export default Pagination
