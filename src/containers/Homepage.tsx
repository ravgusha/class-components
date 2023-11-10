/* eslint-disable react-hooks/exhaustive-deps */
import { ChangeEvent, useCallback, useEffect, useState } from 'react';

import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';
import { IPerson } from '../components/Card';

import logo from '../assets/logo.svg';
import { useNavigate } from 'react-router-dom';
import CardList from '../components/CardList';

const Homepage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState<IPerson[]>([]);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const navigate = useNavigate();

  const getTotalPageCount = (rowCount: number): number =>
    Math.ceil(rowCount / itemsPerPage);

  useEffect(() => {
    const query = localStorage.getItem('query') as string;
    setSearchQuery(query);

    fetchCharacters();
  }, [currentPage, itemsPerPage, searchQuery]);

  const fetchCharacters = () => {
    console.log(searchQuery);
    fetch(
      `https://belka.romakhin.ru/api/v1/morkom?page_size=${itemsPerPage}&page=${
        currentPage - 1
      }&search.name=${searchQuery}`
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setIsLoaded(true);
        setItems(result.results);
        setTotalItems(result.total);
        navigate(`/search/1`);
      });
  };

  const searchSubmit = (query: string | undefined) => {
    const searchQuery = query as string;
    console.log(searchQuery);
    setSearchQuery(searchQuery);
  };

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const number = Number(e.target.value);
    setItemsPerPage(number);
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
      <div className="wrapper">
        <img alt="logo" src={logo} className="logo" />
        <SearchBar onSearchSubmut={searchSubmit} />
        <select value={itemsPerPage} onChange={handleChange}>
          <option>5</option>
          <option>10</option>
        </select>
        {items ? (
          <ul className="card-list">
            <CardList items={items} />
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
            nav={{ current: currentPage, total: getTotalPageCount(totalItems) }}
          />
        )}
      </div>
    );
  }
};

export default Homepage;
