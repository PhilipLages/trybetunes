import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      artistName: '',
      isDisable: true,
    };
  }

  handleDisable = () => {
    const { artistName } = this.state;
    const TWO = 2;
    const disable = artistName.length >= TWO ? { isDisable: false } : { isDisable: true };
    this.setState(disable);
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, () => this.handleDisable());
  }

  render() {
    const { artistName, isDisable } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <label htmlFor="artistName">
            <p>Pesquisar artistas: </p>
            <input
              data-testid="search-artist-input"
              type="text"
              value={ artistName }
              onChange={ this.handleChange }
              name="artistName"
              id="artistName"
            />
          </label>
          <button
            data-testid="search-artist-button"
            type="button"
            disabled={ isDisable }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
