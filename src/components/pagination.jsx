import React from 'react';
import _ from "lodash"
import PropTypes from "prop-types"

// Use sfc because we are not going to have any local state and
//  we can pass all the data that this component need via props
const Pagination = ({ itemsCount, pageSize, onPagechanged,currentPage }) => {
    const pagesCount = Math.ceil(itemsCount / pageSize);
    if (pagesCount === 1) return null;
    // Use lodash to generate array with numbers => [1...pagesCount]
    const pages = _.range(1, pagesCount + 1);
    return <nav>
        <ul className="pagination">
            {pages.map(page => (
                // in mapping each children must has a key
                <li key={page} className={page === currentPage ? "page-item active" : "page-item"}>
                    <a className="page-link" onClick={() => onPagechanged(page)}>{page}</a>
                </li>
            ))}
        </ul>
    </nav>;
}
//  Define type checking requirement
Pagination.propTypes = {
    itemsCount: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    onPagechanged: PropTypes.func.isRequired,
    currentPage: PropTypes.number.isRequired
}
export default Pagination;