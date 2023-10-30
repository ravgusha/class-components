import React from 'react';
import PersonList from '../components/PersonList';

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
}

class Homepage extends React.Component<IProps, IState> {
  state = {
    // error: null,
    isLoaded: false,
    items: [],
  };

  componentDidMount() {
    fetch('https://swapi.dev/api/people/')
      .then((response) => response.json())
      .then(
        (result) => {
          console.log(result);
          this.setState({
            isLoaded: true,
            items: result.results,
          });
        },

        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  render() {
    const { isLoaded, items } = this.state;
    // if (error) {
    //   return <div>Error: {error.message}</div>;
    // } else
     if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return <PersonList items={items} />;
    }
  }
}

export default Homepage;
