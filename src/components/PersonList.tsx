import shortid from 'shortid';

import Person, { IPerson } from './Person';

interface IProps {
  items: IPerson[] | undefined;
}

const PersonList = ({ items }: IProps) => {
  return (
    <ul className="card-list">
      {items && items.length > 0
        ? items.map((item) => <Person item={item} key={shortid.generate()} />)
        : null}
    </ul>
  );
};

export default PersonList;
