import React, { ChangeEvent, FormEvent, useState } from 'react';

interface IProps {
  onSearchSubmut: (query: string) => Promise<void>;
}

const SearchBar = ({onSearchSubmut}: IProps) => {
  const [query, setQuery] = useState("");

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    localStorage.setItem('query', event.target.value);
  };

  const onSubmut = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearchSubmut(query);
  };

  return (
    <form onSubmit={onSubmut} className="search-bar">
      <input
        type="text"
        id="input"
        value={query}
        onChange={onInputChange}
        className="search-bar__input"
      />
      <button type="submit" className="search-btn">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
