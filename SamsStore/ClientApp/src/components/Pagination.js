import React from 'react'
import _ from 'lodash'

export const Pagination = (props) => {
    const { itemCount, pageSize, currentPage } = props
    //console.log(currentPage)
    const pagesCount = Math.ceil(itemCount / pageSize)
    if (pagesCount === 1) return null
    const pages = _.range(1, pagesCount + 1)

    return (
        <nav>
            <ul className="pagination">
                {pages.map(page => (
                    <li key={page} className={page === currentPage ? 'page-item active' : 'page-item'}>
                        <a className="page-link" onClick={() => props.onPageChange(page)}>{page}</a>
                    </li>
                ))}

            </ul>
        </nav>
    )
}