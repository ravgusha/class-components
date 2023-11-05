import React, { useState } from 'react';
import { usePaginationRange, DOTS } from '../hooks/usePaginationRange';
import { ICard, IProduct } from './Card';

interface IProps {
  data: IProduct[];
  RenderComponent: ({ item }: ICard) => JSX.Element;
  buttonConst: number;
  contentPerPage: number;
  siblingCount: number;
}
const Pagination = ({
  data,
  RenderComponent,
  buttonConst,
  contentPerPage,
  siblingCount,
}: IProps) => {
  const [totalPageCount] = useState(Math.ceil(data.length / contentPerPage));
  const [currentPage, setCurrentPage] = useState(1);
  const paginationRange = usePaginationRange({
    totalPageCount,
    buttonConst,
    siblingCount,
    currentPage,
  });

  function goToNextPage() {
    setCurrentPage((page) => page + 1);
  }
  function gotToPreviousPage() {
    setCurrentPage((page) => page - 1);
  }
  function changePage(event: React.MouseEvent<HTMLButtonElement>) {
    const pageNumber = Number(event.currentTarget.textContent);
    setCurrentPage(pageNumber);
  }

  const getPaginatedData = () => {
    const startIndex = currentPage * contentPerPage - contentPerPage;
    const endIndex = startIndex + contentPerPage;
    console.log(data.slice(startIndex, endIndex));
    return data.slice(startIndex, endIndex);
  };

  const paginatedData = getPaginatedData();

  return (
    <div>
      {/* show the post 10 post at a time*/}
      <div className="card-list">
        {paginatedData.map((dataItem, index) => (
          <RenderComponent key={index} item={dataItem} />
        ))}
      </div>
      {/* show the pagiantion
                it consists of next and previous buttons
                along with page numbers, in our case, 5 page
                numbers at a time */}
      <div className="pagination">
        {/* previous button */}
        <button
          onClick={gotToPreviousPage}
          className={` prev ${currentPage === 1 ? 'disabled' : ''}`}
        >
          previous
        </button>
        {/* show paginated button group */}
        {paginationRange &&
          paginationRange.map((item, index) => {
            if (item === DOTS) {
              return (
                <button key={index} className={`paginationItem`}>
                  &#8230;
                </button>
              );
            }
            return (
              <button
                key={index}
                onClick={changePage}
                className={`paginationItem ${
                  currentPage === item ? 'active' : null
                }`}
              >
                <span>{item}</span>
              </button>
            );
          })}
        {/* next button */}
        <button
          onClick={goToNextPage}
          className={`next ${currentPage === totalPageCount ? 'disabled' : ''}`}
        >
          next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
