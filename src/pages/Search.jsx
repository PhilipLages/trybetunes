import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      artistSearch: '',
      artistSaved: '',
      isDisable: true,
      isLoading: false,
      albums: [],
    };
  }

  handleDisable = () => {
    const { artistSearch } = this.state;
    const TWO = 2;
    const disable = artistSearch.length >= TWO
      ? { isDisable: false } : { isDisable: true };
    this.setState(disable);
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, () => this.handleDisable());
  }

  handleLoading = () => {
    const { isLoading } = this.state;
    const verifyLoading = isLoading ? { isLoading: false } : { isLoading: true };
    this.setState(verifyLoading);
  }

  handleFetchAlbums = async () => {
    const { artistSearch } = this.state;
    this.handleLoading();
    const response = await searchAlbumsAPI(artistSearch);
    this.handleLoading();
    this.setState({ albums: response, artistSearch: '', artistSaved: artistSearch });
  }

  render() {
    const { artistSearch, artistSaved, isDisable, isLoading, albums } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        {isLoading
          ? <Loading />
          : (
            <form>
              <label htmlFor="artistName">
                <p>Pesquisar álbuns: </p>
                <input
                  data-testid="search-artist-input"
                  type="text"
                  value={ artistSearch }
                  onChange={ this.handleChange }
                  name="artistSearch"
                  id="artistName"
                />
              </label>
              <button
                data-testid="search-artist-button"
                type="button"
                onClick={ this.handleFetchAlbums }
                disabled={ isDisable }
              >
                Pesquisar
              </button>
            </form>
          )}
        <section>
          {albums.length === 0
            ? (<p>Nenhum álbum foi encontrado</p>)
            : (
              <div>
                <p>{`Resultado de álbuns de: ${artistSaved}`}</p>
                <div className="albums">
                  {albums
                    .map((album) => (
                      <div key={ album.collectionId }>
                        <img src={ album.artworkUrl100 } alt={ album.collectionName } />
                        <h2>{album.collectionName}</h2>
                        <p>{album.artistName}</p>
                        <Link
                          to={ `/album/${album.collectionId}` }
                          data-testid={ `link-to-album-${album.collectionId}` }
                        >
                          Ir para o álbum
                        </Link>
                      </div>
                    ))}
                </div>
              </div>
            )}
        </section>
      </div>
    );
  }
}

export default Search;
