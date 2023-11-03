import React from 'react';

import PersonList from '../components/PersonList';
import SearchBar from '../components/SearchBar';
import ErrorBoundary from '../components/ErrorBoundary';
import { IPerson } from '../components/Person';

import logo from '../assets/logo.svg';

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
    this.setState({ items: undefined });
  };

  render() {
    const { isLoaded, items } = this.state;

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
