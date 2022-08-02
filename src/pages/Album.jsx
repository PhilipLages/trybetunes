import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends Component {
  constructor(props) {
    super(props);
    this.state = {
      musics: [],
      artistName: '',
      albumName: '',
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const musics = await getMusics(id);
    this.setState({ musics }, () => {
      const find = musics.find((music) => music);
      this.setState({ artistName: find.artistName, albumName: find.collectionName });
    });
  }

  render() {
    const { musics, artistName, albumName } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <section>
          <h2 data-testid="artist-name">{artistName}</h2>
          <h3 data-testid="album-name">{`${albumName} - ${artistName}`}</h3>
        </section>
        <section>
          {musics.slice(1)
            .map((music) => <MusicCard key={ music.trackId } music={ music } />)}
        </section>
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
