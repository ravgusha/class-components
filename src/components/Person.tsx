export interface IProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: [];
}

interface IProps {
  item: IProduct;
}

const Person = ({ item }: IProps) => {
  return (
    <li className="card">
      <p>
        <span>Name: </span>
        {item.title}
      </p>
      <p>
        <span>Brand:</span> {item.brand}
      </p>
      <p>
        <span>Price:</span> {item.price}
      </p>
      <p>
        <span>Category </span>
        {item.category}
      </p>
    </li>
  );
};

export default Person;
