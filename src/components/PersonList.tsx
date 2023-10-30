import React from 'react';
import Person, { IPerson } from './Person';
import shortid from 'shortid';

interface IProps {
  items: IPerson[];
}

class PersonList extends React.Component<IProps> {
  render() {
    return (
      <ul>
        {this.props.items.map((item) => (
          <Person item={item} key={shortid.generate()}/>
        ))}
      </ul>
    );
  }
}

export default PersonList;
