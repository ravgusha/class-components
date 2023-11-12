import shortid from 'shortid';
import Card from './Card';
import { useContext } from 'react';
import MyContext from '../MyContext';

const CardList = () => {
  const { items } = useContext(MyContext);
  return (
    <ul className="card-list">
      {items.map((item) => (
        <Card item={item} key={shortid.generate()} />
      ))}
    </ul>
  );
};

export default CardList;
