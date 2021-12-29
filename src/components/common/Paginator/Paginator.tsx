import React, {FC} from 'react';
import style from './Paginator.module.css';

type PropsType = {
    pageSize: number;
    totalUsersCount: number;
    currentPage: number;
    onPageChanged: (currentPage: number) => void;
}

const Paginator: FC<PropsType> = ({
                                      pageSize,
                                      currentPage,
                                      onPageChanged,
                                      totalUsersCount
                                  }) => {

    let pagesCount = Math.ceil(totalUsersCount / pageSize);

    let pages = [];

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    return (
        <div>
            {pages.map(p => {
                return <span
                    className={currentPage === p ? style.selectedPage : ''}
                    onClick={() => {
                        onPageChanged(p)
                    }}>{p}</span>
            })}
        </div>
    );
};

export default Paginator;