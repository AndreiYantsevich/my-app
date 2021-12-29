import React, {FC, useState} from 'react';
import style from './Paginator.module.css';
import cn from "classnames";

type PropsType = {
    pageSize: number;
    totalItemsCount: number;
    currentPage: number;
    onPageChanged: (currentPage: number) => void;
    portionSize?: number
}

const Paginator: FC<PropsType> = ({
                                      pageSize,
                                      currentPage,
                                      onPageChanged,
                                      totalItemsCount,
                                      portionSize = 10
                                  }) => {

    let pagesCount = Math.ceil(totalItemsCount / pageSize);

    let pages = [];

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }
    let portionCount = Math.ceil(pagesCount / portionSize);
    let [portionNumber, setPortionNumber] = useState(1);
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionPageNumber = portionNumber * portionSize;

    return <div className={style.paginator}>
        {portionNumber > 1 &&
            <button onClick={() => {
                setPortionNumber(portionNumber - 1)
            }}>PREV</button>}

        {pages
            .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
            .map((p) => {
                return <span className={cn({
                    [style.selectedPage]: currentPage === p
                }, style.pageNumber)}
                             key={p}
                             onClick={() => {
                                 onPageChanged(p);
                             }}>{p}</span>
            })}
        {portionCount > portionNumber &&
            <button onClick={() => {
                setPortionNumber(portionNumber + 1)
            }}>NEXT</button>}
    </div>
}

export default Paginator;