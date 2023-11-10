import { ChangeEventHandler } from 'react';

interface IProps {
  onChange: ChangeEventHandler<HTMLSelectElement>;
  itemsPerPage: number;
}

export const ItemsPerPageSelect = ({ onChange, itemsPerPage }: IProps) => {
  return (
    <select value={itemsPerPage} onChange={onChange}>
      <option>5</option>
      <option>10</option>
    </select>
  );
};
