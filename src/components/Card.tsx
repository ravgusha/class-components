export interface IPerson {
  id: number;
  name: string;
  weapon: string;
  hp: number;
}

export interface ICard {
  item: IPerson;
  key: string;
}

const Card = ({ item }: ICard) => {
  const { id, name, weapon, hp } = item;
  return (
    <div className="card" data-testid="card">
      <h1 className="card-title">{name}</h1>
      <p>ID: {id}</p>
      <p>Weapon: {weapon}</p>
      <p>Hp: {hp}</p>
    </div>
  );
};

export default Card;
