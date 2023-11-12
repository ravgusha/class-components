import { FormEvent, useContext } from 'react';
import MyContext from '../MyContext';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const { setSearchQuery, setCurrentPage } = useContext(MyContext);
  const navigate = useNavigate();
  let inputValue = '';

  const onInputChange = (event: FormEvent<HTMLInputElement>) => {
    const element = event.currentTarget as HTMLInputElement;
    inputValue = element.value;
  };

  const onSubmut = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSearchQuery(inputValue);
    localStorage.setItem('query', inputValue);
    navigate(`/search/1`);
    setCurrentPage(1);
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
