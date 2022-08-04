import React, { Component } from 'react';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Header from '../components/Header';
import Loading from './Loading';
import MusicCard from '../components/MusicCard';

class Favorites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favorites: [],
      isLoading: false,
    };
  }

  componentDidMount() {
    this.getSongs();
  }

  handleLoading = () => {
    const { isLoading } = this.state;
    const verifyLoading = isLoading ? { isLoading: false } : { isLoading: true };
    this.setState(verifyLoading);
  }

  getSongs = async () => {
    this.handleLoading();
    const favoriteSongs = await getFavoriteSongs();
    this.handleLoading();
    this.setState({ favorites: favoriteSongs });
  }

  render() {
    const { favorites, isLoading } = this.state;
    console.log(favorites);
    return (
      <div data-testid="page-favorites">
        <Header />
        <div className="musics">
          <h2>Músicas favoritas</h2>
          {isLoading
            ? <Loading />
            : (
              <section>
                {favorites.map((favorite) => (
                  <div className="favorite-songs" key={ favorite.trackId }>
                    <img src={ favorite.artworkUrl100 } alt={ favorite.trackName } />
                    <MusicCard
                      getSongs={ this.getSongs }
                      isChecked
                      music={ favorite }
                    />
                  </div>
                ))}
              </section>
            )}
        </div>
      </div>
    );
  }
}

export default Favorites;
