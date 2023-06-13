import React from 'react';
import './pagination.scss';


import classnames from 'classnames';

import { usePagination, RDOTS,LDOTS } from '../../utilities/pagination/use-pagination';


interface PaginationProps {
    currentPage:number,
    totalCount:number,
    pageSize:number,
    onPageChange:(page:number) => void
}


const Pagination: React.FC<PaginationProps> = ({currentPage,totalCount,pageSize,onPageChange}) => {
    const siblingCount = 1;
    const paginationRange = usePagination({
        currentPage,
        totalCount,
        siblingCount,
        pageSize
    });


  
    if (currentPage === 0 || !paginationRange || paginationRange.length <2) {
        return null;
    }

    const onNext = () => {
        onPageChange(currentPage+1);
    }

    const onPrevious = () => {
        onPageChange(currentPage-1)
    }

    let lastPage = paginationRange[paginationRange.length - 1];


    return (
        <ul className={classnames('pagination-container')}>
            <li className={classnames('pagination-item',{disabled: currentPage === 1})}
            onClick={onPrevious}>
                <div className='arrow left'></div>
            </li>
            {paginationRange.map(pageNumber => {
                if (pageNumber === RDOTS){
                    return <li className='pagination-item dots' key={-1}>&#8230;</li>
                }
                if (pageNumber === LDOTS){
                    return <li className='pagination-item dots' key={-2}>&#8230;</li>
                }
                return (
                    <li
                        className={classnames('pagination-item',{
                            selected: pageNumber === currentPage
                        })}
                        key = {pageNumber}
                        onClick={()=> onPageChange(pageNumber as number)}>
                            {pageNumber}
                    </li>
                );
            })}
            <li className={classnames('pagination-item', {disabled: currentPage === lastPage})}
                onClick={onNext}
            >
                <div className='arrow right'></div>
            </li>
        </ul>
    );

};

export default Pagination;