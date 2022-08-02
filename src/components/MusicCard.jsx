import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

class MusicCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isChecked: props.isChecked,
      isLoading: false,
    };
  }

  handleLoading = () => {
    const { isLoading } = this.state;
    const verifyLoading = isLoading ? { isLoading: false } : { isLoading: true };
    this.setState(verifyLoading);
  }

  addFavorite = async () => {
    const { music } = this.props;
    this.handleLoading();
    await addSong(music);
    this.handleLoading();
  }

  removeFavorite = async () => {
    const { music } = this.props;
    this.handleLoading();
    await removeSong(music);
    this.handleLoading();
  }

  handleCheck = () => {
    const { isChecked } = this.state;
    const { getSongs } = this.props;
    const verifyCheck = isChecked ? { isChecked: false } : { isChecked: true };
    this.setState(verifyCheck, async () => {
      const add = await this.addFavorite();
      const remove = await this.removeFavorite();
      getSongs();
      return !isChecked ? add : remove;
    });
  }

  render() {
    const { music: { trackName, previewUrl, trackId } } = this.props;
    const { isChecked, isLoading } = this.state;
    return (
      <div>
        {isLoading
          ? <Loading />
          : (
            <div>
              <h4>{trackName}</h4>
              <audio data-testid="audio-component" src={ previewUrl } controls>
                <track kind="captions" />
                O seu navegador não suporta o elemento
                {' '}
                {' '}
                <code>audio</code>
                .
              </audio>
              <label htmlFor={ trackId }>
                <p>Favorita</p>
                <input
                  data-testid={ `checkbox-music-${trackId}` }
                  type="checkbox"
                  checked={ isChecked }
                  onChange={ this.handleCheck }
                  name="isFavorite"
                  id={ trackId }
                />
              </label>
            </div>
          )}
      </div>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.shape({
    trackName: PropTypes.string.isRequired,
    previewUrl: PropTypes.string.isRequired,
    trackId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  }).isRequired,
  isChecked: PropTypes.bool.isRequired,
  getSongs: PropTypes.func.isRequired,
};

export default MusicCard;
