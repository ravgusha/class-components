import React, { useEffect, useState } from 'react';

import PersonList from '../components/PersonList';
import SearchBar from '../components/SearchBar';
import ErrorBoundary from '../components/ErrorBoundary';
import { IProduct } from '../components/Person';

import logo from '../assets/logo.svg';

const Homepage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState<IProduct[] | undefined>([]);

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
      fetch(`https://dummyjson.com/products?limit=10`)
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          setIsLoaded(true);
          setItems(result.products);
        });
    }
  }, []);

  // const onToggleError = () => {
  //   setItems(undefined);
  // };

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
      <ErrorBoundary>
        <div className="wrapper">
          <img alt="logo" src={logo} className="logo" />
          <SearchBar onSearchSubmut={onSubmut} />
          <PersonList items={items} />
        </div>
        {/* <button className="error-btn" onClick={onToggleError}>
          Error
        </button> */}
      </ErrorBoundary>
    );
  }
};

export default Homepage;
