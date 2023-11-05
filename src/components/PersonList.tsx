import React from 'react';
import shortid from 'shortid';

import Person, { IPerson } from './Person';

interface IProps {
  items: IPerson[];
}

class PersonList extends React.Component<IProps> {
  render() {
    return (
      <ul className="card-list">
        {this.props.items.map((item) => (
          <Person item={item} key={shortid.generate()} />
        ))}
      </ul>
    );
  }
}

export default PersonList;
