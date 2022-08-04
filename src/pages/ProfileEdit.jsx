import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getUser, updateUser } from '../services/userAPI';
import MyImage from '../myImage.png';
import Header from '../components/Header';
import Loading from './Loading';

class ProfileEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      description: '',
      image: MyImage,
      isLoading: false,
      isDisable: true,
    };
  }

  async componentDidMount() {
    this.handleLoading();
    const user = await getUser();
    const { name, email, description } = user;
    this.handleLoading();
    this.setState({ name, email, description });
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
        <section className="profile">
          <h2>Editar perfil</h2>
          {isLoading
            ? <Loading />
            : (
              <form className="edit-profile">
                <img src={ image } alt={ name } />
                <label htmlFor="changeImage">
                  <p>Imagem de perfil:</p>
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
                  <p>Nome: </p>
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
                  <p>E-mail:</p>
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
                  <p>Descrição:</p>
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
        </section>
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
