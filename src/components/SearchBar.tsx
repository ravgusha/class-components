import { FormEvent, useContext } from 'react';
import MyContext from '../MyContext';

interface IProps {
  onSearchSubmut: (query?: string | undefined) => void;
}

const SearchBar = ({ onSearchSubmut }: IProps) => {
  const { setSearchQuery } = useContext(MyContext);

  const onInputChange = (event: FormEvent<HTMLInputElement>) => {
    const element = event.currentTarget as HTMLInputElement;
    const value = element.value;

    setSearchQuery(value);
    localStorage.setItem('query', value);
  };

  const onSubmut = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearchSubmut();
  };

  return (
    <form onSubmit={onSubmut} className="search-bar">
      <input
        type="text"
        id="input"
        className="search-bar__input"
        onChange={onInputChange}
      />
      <button type="submit" className="search-btn">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
