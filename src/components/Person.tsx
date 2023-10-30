import React from 'react';

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

interface IProps {
  item: IPerson;
}

class Person extends React.Component<IProps> {
  render() {
    return <li>{this.props.item.name}</li>;
  }
}

export default Person;
