import { render, within, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Card from '../components/Card';
import CardList from '../components/CardList';
import MyContext from '../MyContext';
import Homepage from '../containers/Homepage';
import { BrowserRouter } from 'react-router-dom';

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
  {
    id: 4,
    name: 'Kitana2',
    weapon: 'ice',
    hp: 100,
  },
  {
    id: 5,
    name: 'SubZero2',
    weapon: 'ice',
    hp: 100,
  },
  {
    id: 6,
    name: 'Liu3',
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
    render(<Card key={'zxc'} item={item} />);
    const { getByText } = within(screen.getByTestId('card'));
    expect(getByText('Kitana')).toBeInTheDocument();
  });

  test('renders text if no data', async () => {
    render(
      <BrowserRouter>
        <MyContext.Provider
          value={{
            items: [],
            searchQuery: '',
            setSearchQuery: () => {},
            setCurrentPage: () => {},
          }}
        >
          <Homepage />
        </MyContext.Provider>
      </BrowserRouter>
    );
    expect(await screen.findByText('no data')).toBeTruthy();
  });

  test('renders three cards', async () => {
    render(
      <MyContext.Provider
        value={{
          items,
          searchQuery: '',
          setSearchQuery: () => {},
          setCurrentPage: () => {},
        }}
      >
        <CardList />
      </MyContext.Provider>
    );
    const cards = await screen.findAllByTestId('card');
    expect(cards).toHaveLength(6);
  });

  // test('component updates URL query parameter when page changes', async () => {
  //   render(
  //     <BrowserRouter>
  //       <MyContext.Provider
  //         value={{
  //           items,
  //           searchQuery: '',
  //           setSearchQuery: () => {},
  //           setCurrentPage: () => {},
  //         }}
  //       >
  //         <Homepage />
  //       </MyContext.Provider>
  //     </BrowserRouter>
  //   );
  //   // const nextPageButton = await screen.findByRole('button', {
  //   //   name: '>',
  //   // });
  //   // await userEvent.click(screen.getByRole('button', { name: /5/ }));
  //   // expect(nextPageButton).toBeTruthy();
  //   await waitFor(() => expect(screen.getByText('kitana')).toBeInTheDocument());
  //   expect(screen.findByText('kitana')).toBeTruthy();
  // });
});
