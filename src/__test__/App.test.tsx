import { render, within, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Card from '../components/Card';
import CardList from '../components/CardList';
import MyContext from '../MyContext';

const item = {
  id: 123,
  name: 'Kitana',
  weapon: 'ice',
  hp: 100,
};

const items = [
  {
    id: 1,
    name: 'Kitana',
    weapon: 'ice',
    hp: 100,
  },
  {
    id: 2,
    name: 'SubZero',
    weapon: 'ice',
    hp: 100,
  },
  {
    id: 3,
    name: 'Liu',
    weapon: 'fire',
    hp: 100,
  },
];

describe('App', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ test: 100 }),
      })
    ) as jest.Mock;
  });

  test('renders card', () => {
    // const { getByTestId } = render(<Card key={'zxc'} item={item} />);
    // const card = getByTestId('card');
    // const element = card.getByText(/kitana/i);
    // expect(element).toBeInTheDocument();
    render(<Card key={'zxc'} item={item} />);
    const { getByText } = within(screen.getByTestId('card'));
    expect(getByText('Kitana')).toBeInTheDocument();
  });

  test('renders three cards', async () => {
    render(
      <MyContext.Provider value={{items}}>
        <CardList />
      </MyContext.Provider>
    );
    const cards = await screen.findAllByTestId('card');
    expect(cards).toHaveLength(3);
  });
});
