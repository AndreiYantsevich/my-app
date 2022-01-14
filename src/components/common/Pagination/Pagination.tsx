import React, {FC, MouseEvent} from 'react';
import styles from './Pagination.module.css';

type PropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (page: number) => void
}

const Pagination: FC<PropsType> = ({
                                       totalUsersCount,
                                       pageSize,
                                       currentPage,
                                       onPageChanged
                                   }) => {
    let pagesCount = Math.ceil(totalUsersCount / pageSize);
    let pages = [];

    // show all pages
    for (let i = 1; i <= pagesCount; i++) pages.push(
        <span
            key={i}
            className={currentPage === i
                ? `${styles.page} ${styles.currentPage}`
                : `${styles.page}`}
            onClick={(e: MouseEvent<HTMLSpanElement>) => onPageChanged(i)}>{i}
			</span>
    );

// 1 ... 4 5 (6) 7 8 ... 510
    if ((currentPage + 4) < pagesCount) {
        pages[currentPage + 2] = (
            <span
                key={currentPage + 3}
                className={`${styles.page} ${styles.dots}`}>...</span>);
        pages = pages.filter((p, i) => i < (currentPage + 3) || i === (pagesCount - 1));
    }
    if (currentPage > 5) {
        pages[1] = (<span
            key={2}
            className={`${styles.page} ${styles.dots}`}>...</span>)
        pages = pages.filter((p, i) => i < 2 || i > currentPage - 4);
    }

    // show component
    return <div className={styles.pagination}>{pages}</div>;
}

export default Pagination;