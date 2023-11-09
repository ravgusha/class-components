import shortid from 'shortid';
import Card, { IPerson } from './Card';

interface ICardList {
  items: IPerson[];
}
const CardList = ({items}: ICardList) => {
  return (
    <ul className="card-list">
      {items.map((item) => (
        <Card item={item} key={shortid.generate()} />
      ))}
    </ul>
  );
};

export default CardList;
