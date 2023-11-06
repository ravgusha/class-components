import React, { useEffect } from 'react';
import { usePaginationRange, DOTS } from '../hooks/usePaginationRange';
import Card, { IProduct } from './Card';
import { useNavigate } from 'react-router-dom';

interface IProps {
  data: IProduct[];
  contentPerPage: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const Pagination = ({
  data,
  contentPerPage,
  currentPage,
  setCurrentPage,
}: IProps) => {
  const getTotalPageCount = () => {
    return Math.ceil(data.length / contentPerPage);
  };

  const totalPageCount = getTotalPageCount();

  const paginationRange = usePaginationRange({
    totalPageCount,
    currentPage,
  });

  const navigate = useNavigate();

  function goToNextPage() {
    setCurrentPage((page) => page + 1);
    navigate(`/search/${currentPage + 1}`);
  }

  function gotToPreviousPage() {
    setCurrentPage((page) => page - 1);
    navigate(`/search/${currentPage - 1}`);
  }

  function changePage(event: React.MouseEvent<HTMLButtonElement>) {
    const pageNumber = Number(event.currentTarget.textContent);
    setCurrentPage(pageNumber);
    navigate(`/search/${pageNumber}`);
  }

  let paginatedData: IProduct[] = [];

  const getPaginatedData = () => {
    const startIndex = currentPage * contentPerPage - contentPerPage;
    const endIndex = startIndex + contentPerPage;
    console.log(data);
    console.log(data.slice(startIndex, endIndex));
    paginatedData = data.slice(startIndex, endIndex);
  };

  getPaginatedData();

  useEffect(() => {
    getTotalPageCount();
    getPaginatedData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <div>
      {/* show the post 10 post at a time*/}
      <div className="card-list">
        {paginatedData &&
          paginatedData.map((dataItem, index) => (
            <Card key={index} item={dataItem} />
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
