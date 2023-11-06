import { useEffect, useState } from 'react';

import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';
import { IProduct } from '../components/Card';

import logo from '../assets/logo.svg';
import { useNavigate } from 'react-router-dom';

const Homepage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState<IProduct[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();

  const onSubmut = async (query: string) => {
    await fetch(`https://dummyjson.com/products/search?q=${query}`)
      .then((response) => response.json())
      .then((result) => {
        setIsLoaded(true);
        setItems(result.products);
      });
    setCurrentPage(1);
    navigate(`/search/1`);
  };

  useEffect(() => {
    if (localStorage.getItem('query')) {
      const query = localStorage.getItem('query') as string;
      onSubmut(query);
    } else {
      fetch(`https://dummyjson.com/products?limit=100`)
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          setIsLoaded(true);
          setItems(result.products);
          navigate(`/search/1`);
        });
    }
  }, []);

  if (!isLoaded) {
    return (
      <div className="wrapper">
        <img alt="logo" src={logo} className="logo" />
        <SearchBar onSearchSubmut={onSubmut} />
        <div className="loading">Loading...</div>
      </div>
    );
  } else {
    return (
      <div className="wrapper">
        <img alt="logo" src={logo} className="logo" />
        <SearchBar onSearchSubmut={onSubmut} />
        <Pagination
          data={items}
          contentPerPage={10}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    );
  }
};

export default Homepage;
