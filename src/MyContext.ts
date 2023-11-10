import { Dispatch, SetStateAction, createContext } from 'react';
import { IPerson } from './components/Card';

interface IMyContext {
  items: IPerson[];
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
}

const defaultState = {
  items: [],
  searchQuery: '',
  setSearchQuery: () => { }
};

const MyContext = createContext<IMyContext>(defaultState);

export default MyContext;
