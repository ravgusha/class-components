/* eslint-disable react-hooks/exhaustive-deps */
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';
import { ItemsPerPageSelect } from '../components/ItemsPerPageSelect';
import CardList from '../components/CardList';
import { IPerson } from '../components/Card';
import MyContext from '../MyContext';

import logo from '../assets/logo.svg';

const Homepage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState<IPerson[]>([]);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState(
    localStorage.getItem('query') || ''
  );

  const navigate = useNavigate();

  const getTotalPageCount = (rowCount: number): number =>
    Math.ceil(rowCount / itemsPerPage);

  useEffect(() => {
    fetchCharacters();
  }, [currentPage, itemsPerPage, searchQuery]);

  const fetchCharacters = () => {
    fetch(
      `https://belka.romakhin.ru/api/v1/morkom?page_size=${itemsPerPage}&page=${
        currentPage - 1
      }&search.name=${searchQuery}`
    )
      .then((response) => response.json())
      .then((result) => {
        setIsLoaded(true);
        setItems(result.results);
        setTotalItems(result.total);
        navigate(`/search/1`);
      });
  };

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const number = Number(e.target.value);
    setItemsPerPage(number);
    setCurrentPage(1);
  };

  const handleNextPageClick = useCallback(() => {
    const current = currentPage;
    const next = current + 1;
    const total = items ? getTotalPageCount(totalItems) : current;

    setCurrentPage(next <= total ? next : current);
  }, [currentPage, items]);

  const handlePrevPageClick = useCallback(() => {
    const current = currentPage;
    const prev = current - 1;

    setCurrentPage(prev > 0 ? prev : current);
  }, [currentPage]);

  if (!isLoaded) {
    return (
      <div className="wrapper">
        <img alt="logo" src={logo} className="logo" />
        <div className="loading">Loading...</div>
      </div>
    );
  } else {
    return (
      <MyContext.Provider value={{ items, searchQuery, setSearchQuery, setCurrentPage }}>
        <div className="wrapper" data-testid="wrapper">
          <img alt="logo" src={logo} className="logo" />
          <SearchBar />
          <ItemsPerPageSelect
            itemsPerPage={itemsPerPage}
            onChange={handleChange}
          />
          {items ? (
            <ul className="card-list">
              <CardList />
            </ul>
          ) : (
            'no data'
          )}
          {items && (
            <Pagination
              onNextPageClick={handleNextPageClick}
              onPrevPageClick={handlePrevPageClick}
              disable={{
                left: currentPage === 1,
                right: currentPage === getTotalPageCount(totalItems),
              }}
              nav={{
                current: currentPage,
                total: getTotalPageCount(totalItems),
              }}
            />
          )}
        </div>
      </MyContext.Provider>
    );
  }
};

export default Homepage;
