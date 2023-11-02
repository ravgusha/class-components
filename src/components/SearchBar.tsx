import React from 'react';

interface IProps {
  // eslint-disable-next-line no-unused-vars
  onSubmut: (query: string) => Promise<void>;
}

interface IState {
  query: string;
}

class SearchBar extends React.Component<IProps, IState> {
  state = {
    query: '',
  };



  onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ query: event.target.value });
    localStorage.setItem('query', event.target.value);
  };

  onSubmut = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(this.state.query);
    this.props.onSubmut(this.state.query);
  };

  render() {
    return (
      <form onSubmit={this.onSubmut}>
        <input
          type="text"
          id="input"
          value={this.state.query}
          onChange={this.onInputChange}
        />
        <button type="submit">Search</button>
      </form>
    );
  }
}

export default SearchBar;
