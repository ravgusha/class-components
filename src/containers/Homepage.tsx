import React from 'react';
import PersonList from '../components/PersonList';
import SearchBar from '../components/SearchBar';

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
  items: IPerson[];
  query: string;
}

class Homepage extends React.Component<IProps, IState> {
  state = {
    isLoaded: false,
    items: [],
    query: '',
  };

  onSubmut = async (query: string) => {
    const response = await fetch(
      `https://swapi.dev/api/people/?search=${query}`
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        this.setState({
          isLoaded: true,
          items: result.results,
        });
      });
    console.log(response);
    // console.log(query);
  };

  componentDidMount() {
    fetch(`https://swapi.dev/api/people`)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        this.setState({
          isLoaded: true,
          items: result.results,
        });
      });
  }

  render() {
    const { isLoaded, items } = this.state;

    if (!isLoaded) {
      return (
        <div>
          <SearchBar onSubmut={this.onSubmut} />
          <div>Loading...</div>
        </div>
      );
    } else {
      return (
        <div>
          <SearchBar onSubmut={this.onSubmut} />
          <PersonList items={items} />
        </div>
      );
    }
  }
}

export default Homepage;
