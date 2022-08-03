import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getUser, updateUser } from '../services/userAPI';
import Header from '../components/Header';
import Loading from './Loading';

class ProfileEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      description: '',
      image: '',
      isLoading: false,
      isDisable: true,
    };
  }

  async componentDidMount() {
    this.handleLoading();
    const user = await getUser();
    const { name, email, description, image } = user;
    this.handleLoading();
    this.setState({ name, email, description, image });
  }

  handleLoading = () => {
    const { isLoading } = this.state;
    const verifyLoading = isLoading ? { isLoading: false } : { isLoading: true };
    this.setState(verifyLoading);
  }

  handleDisable = () => {
    const { name, email, description, image } = this.state;
    const disabled = name.length === 0
    || email.length === 0 || description.length === 0 || image.length === 0;
    this.setState({ isDisable: disabled });
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, () => this.handleDisable());
  }

  handleSubmit = async () => {
    const { name, email, description, image } = this.state;
    const { history } = this.props;
    this.handleLoading();
    await updateUser({ name, email, description, image });
    this.handleLoading();
    history.push('/profile');
  }

  render() {
    const { isLoading, name, email, description, image, isDisable } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        <h3>Editar perfil</h3>
        {isLoading
          ? <Loading />
          : (
            <form>
              <img src={ image } alt={ name } />
              <label htmlFor="changeImage">
                Imagem de perfil:
                <input
                  data-testid="edit-input-image"
                  type="text"
                  value={ image }
                  onChange={ this.handleChange }
                  name="image"
                  id="changeImage"
                />
              </label>
              <label htmlFor="changeName">
                Nome:
                <input
                  data-testid="edit-input-name"
                  type="text"
                  value={ name }
                  onChange={ this.handleChange }
                  name="name"
                  id="changeName"
                />
              </label>
              <label htmlFor="changeEmail">
                E-mail:
                <input
                  data-testid="edit-input-email"
                  type="email"
                  value={ email }
                  onChange={ this.handleChange }
                  name="email"
                  id="changeEmail"
                />
              </label>
              <label htmlFor="changeDescription">
                Descrição:
                <textarea
                  data-testid="edit-input-description"
                  value={ description }
                  onChange={ this.handleChange }
                  name="description"
                  id="changeDescription"
                  cols="20"
                  rows="5"
                />
              </label>
              <button
                data-testid="edit-button-save"
                type="button"
                onClick={ this.handleSubmit }
                disabled={ isDisable }
              >
                Atualizar
              </button>
            </form>
          )}
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default ProfileEdit;
