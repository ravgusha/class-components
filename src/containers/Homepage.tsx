import React from 'react';
import PersonList from '../components/PersonList';
import SearchBar from '../components/SearchBar';
import logo from '../assets/logo.svg';
import ErrorBoundary from '../components/ErrorBoundary';

export interface IPerson {
  birth_year: string;
  eye_color: string;
  films: string[];
  gender: string;
  hair_color: string;
  height: string;
  homeworld: string;
  mass: string;
  name: string;
  skin_color: string;
  species: string[];
  starships: string[];
  vehicles: string[];
}

interface IProps {}

interface IState {
  error?: null;
  isLoaded: boolean;
  items: IPerson[] | undefined;
  query: string;
  hasError: boolean;
}

class Homepage extends React.Component<IProps, IState> {
  state = {
    isLoaded: false,
    items: [],
    query: '',
    hasError: false,
  };

  onSubmut = async (query: string) => {
    await fetch(`https://swapi.dev/api/people/?search=${query}`)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        this.setState({
          isLoaded: true,
          items: result.results,
        });
      });
  };

  componentDidMount() {
    if (localStorage.getItem('query')) {
      const query = localStorage.getItem('query') as string;
      this.setState({ query });
      this.onSubmut(query);
    } else {
      fetch(`https://swapi.dev/api/people`)
        .then((response) => response.json())
        .then((result) => {
          this.setState({
            isLoaded: true,
            items: result.results,
          });
        });
    }
  }

  onToggleError = () => {
    // this.setState({ hasError: true });
    this.setState({ items: undefined });
  };

  render() {
    const { isLoaded, items } = this.state;
    // if (this.state.hasError) {
    //   // Можно отрендерить запасной UI произвольного вида
    //   return <h1>Что-то пошло не так.</h1>;
    // }
    if (!isLoaded) {
      return (
        <div className="wrapper">
          <img alt="logo" src={logo} className="logo" />
          <SearchBar onSubmut={this.onSubmut} />
          <div className="loading">Loading...</div>
        </div>
      );
    } else {
      return (
        <ErrorBoundary>
          <div className="wrapper">
            <img alt="logo" src={logo} className="logo" />
            <SearchBar onSubmut={this.onSubmut} />
            <PersonList items={items} />
          </div>
          <button className="error-btn" onClick={this.onToggleError}>
            Error
          </button>
        </ErrorBoundary>
      );
    }
  }
}

export default Homepage;
