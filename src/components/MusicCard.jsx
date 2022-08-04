import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { addSong, removeSong } from '../services/favoriteSongsAPI';

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
    const verifyCheck = isChecked ? { isChecked: false } : { isChecked: true };
    if (!isChecked) {
      this.addFavorite();
    } else {
      this.removeFavorite();
    }
    this.setState(verifyCheck, () => {
      const { getSongs } = this.props;
      if (getSongs) {
        getSongs();
      }
    });
  }

  render() {
    const { music: { trackName, previewUrl, trackId } } = this.props;
    const { isChecked } = this.state;
    return (
      <div className="music-card">
        <h4>{trackName}</h4>
        <div>
          <audio
            className="audio"
            data-testid="audio-component"
            src={ previewUrl }
            controls
          >
            <track kind="captions" />
            O seu navegador não suporta o elemento
            {' '}
            {' '}
            <code>audio</code>
            .
          </audio>
          <label htmlFor={ trackId }>
            <input
              className="checkbox"
              data-testid={ `checkbox-music-${trackId}` }
              type="checkbox"
              checked={ isChecked }
              onChange={ this.handleCheck }
              name="isFavorite"
              id={ trackId }
            />
            <FontAwesomeIcon icon={ faHeart } size="2x" className="heart-icon" />
          </label>
        </div>
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
  getSongs: PropTypes.func,
};

MusicCard.defaultProps = {
  getSongs: () => {},
};

export default MusicCard;
