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

export interface ICard {
  item: IProduct;
  key: number;
}

const Card = ({ item }: ICard) => {
  console.log(item);
  const { title, brand, price } = item;
  return (
    <div className="card">
      <h1>{title}</h1>
      <p>Brand: {brand}</p>
      <p>Proce: {price}$</p>
    </div>
  );
};

export default Card;
