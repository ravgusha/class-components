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
    return (
      <li className="card">
        <p>
          <span>Name: </span>
          {this.props.item.name}
        </p>
        <p>
          <span>Birth year:</span> {this.props.item.birth_year}
        </p>
        <p>
          <span>Gender:</span> {this.props.item.gender}
        </p>
        <p>
          <span>Hair color: </span>
          {this.props.item.hair_color}
        </p>
      </li>
    );
  }
}

export default Person;
