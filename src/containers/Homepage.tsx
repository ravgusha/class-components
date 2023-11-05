import { useEffect, useState } from 'react';

import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';
import Card, { IProduct } from '../components/Card';

import logo from '../assets/logo.svg';

const Homepage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState<IProduct[]>([]);

  const onSubmut = async (query: string) => {
    await fetch(`https://dummyjson.com/products/search?q=${query}`)
      .then((response) => response.json())
      .then((result) => {
        setIsLoaded(true);
        setItems(result.products);
      });
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
          RenderComponent={Card}
          buttonConst={3}
          contentPerPage={10}
          siblingCount={1}
        />
      </div>
    );
  }
};

export default Homepage;
