import { useCallback, useEffect, useState } from 'react';

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
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const navigate = useNavigate();

  const ROWS_PER_PAGE = 5;

  const getTotalPageCount = (rowCount: number): number =>
    Math.ceil(rowCount / ROWS_PER_PAGE);

  useEffect(() => {
    const query = localStorage.getItem('query') as string;
    setSearchQuery(query);

    fetchCharacters();
  }, [currentPage]);

  const fetchCharacters = () => {
    fetch(
      `https://belka.romakhin.ru/api/v1/morkom?page_size=${ROWS_PER_PAGE}&page=${
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
        setSearchQuery('');
      });
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
        <SearchBar onSearchSubmut={fetchCharacters} />
        <div className="loading">Loading...</div>
      </div>
    );
  } else {
    return (
      <div className="wrapper">
        <img alt="logo" src={logo} className="logo" />
        <SearchBar onSearchSubmut={fetchCharacters} />
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
