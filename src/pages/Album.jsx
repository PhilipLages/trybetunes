import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import Loading from './Loading';

class Album extends Component {
  constructor(props) {
    super(props);
    this.state = {
      musics: [],
      favorites: [],
      artistName: '',
      albumName: '',
      isLoading: false,
    };
  }

  async componentDidMount() {
    this.handleLoading();
    const favoriteSongs = await getFavoriteSongs();
    this.handleLoading();
    this.fetchMusics();
    this.setState({ favorites: favoriteSongs });
  }

  handleLoading = () => {
    const { isLoading } = this.state;
    const verifyLoading = isLoading ? { isLoading: false } : { isLoading: true };
    this.setState(verifyLoading);
  }

  fetchMusics = async () => {
    const { match: { params: { id } } } = this.props;
    const musics = await getMusics(id);
    this.setState({ musics }, () => {
      const find = musics.find((music) => music);
      this.setState({ artistName: find.artistName, albumName: find.collectionName });
    });
  }

  render() {
    const { musics, artistName, albumName, isLoading, favorites } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {isLoading
          ? <Loading />
          : (
            <div>
              <section>
                <h2 data-testid="artist-name">{artistName}</h2>
                <h3 data-testid="album-name">{`${albumName} - ${artistName}`}</h3>
              </section>
              <section>
                {musics.slice(1)
                  .map((music) => (
                    <MusicCard
                      isChecked={ favorites
                        .some((favorite) => favorite.trackId === music.trackId) }
                      key={ music.trackId }
                      music={ music }
                    />))}
              </section>
            </div>
          )}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default Album;
