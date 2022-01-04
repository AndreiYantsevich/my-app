import React, {MouseEvent} from 'react';
import styles from './Pagination.module.css';

type PaginationType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (page: number) => void
}

const Pagination = (props: PaginationType) => {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages = [];

    // show all pages
    for (let i = 1; i <= pagesCount; i++) pages.push(
        <span
            key={i}
            className={props.currentPage === i
                ? `${styles.page} ${styles.currentPage}`
                : `${styles.page}`}
            onClick={(e: MouseEvent<HTMLSpanElement>) => props.onPageChanged(i)}>{i}
			</span>
    );

// 1 ... 4 5 (6) 7 8 ... 510
    if ((props.currentPage + 4) < pagesCount) {
        pages[props.currentPage + 2] = (
            <span
                key={props.currentPage + 3}
                className={`${styles.page} ${styles.dots}`}>...</span>);
        pages = pages.filter((p, i) => i < (props.currentPage + 3) || i === (pagesCount - 1));
    }
    if (props.currentPage > 5) {
        pages[1] = (<span
            key={2}
            className={`${styles.page} ${styles.dots}`}>...</span>)
        pages = pages.filter((p, i) => i < 2 || i > props.currentPage - 4);
    }

    // show component
    return <div className={styles.pagination}>{pages}</div>;
}

export default Pagination;