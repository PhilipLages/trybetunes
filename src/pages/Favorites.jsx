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
    return (
      <div data-testid="page-favorites">
        <Header />
        <h3>Músicas favoritas</h3>
        {isLoading
          ? <Loading />
          : (
            <section>
              {favorites.map((favorite) => (
                <MusicCard
                  getSongs={ this.getSongs }
                  isChecked
                  key={ favorite.trackId }
                  music={ favorite }
                />))}
            </section>
          )}
      </div>
    );
  }
}

export default Favorites;
