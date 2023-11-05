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

const Person = ({item}: IProps) => {
  return (
    <li className="card">
      <p>
        <span>Name: </span>
        {item.name}
      </p>
      <p>
        <span>Birth year:</span> {item.birth_year}
      </p>
      <p>
        <span>Gender:</span> {item.gender}
      </p>
      <p>
        <span>Hair color: </span>
        {item.hair_color}
      </p>
    </li>
  );
};

export default Person;
