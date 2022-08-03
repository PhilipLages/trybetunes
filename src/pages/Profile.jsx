import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      description: '',
      image: '',
      isLoading: false,
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

  render() {
    const { name, email, description, image, isLoading } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        <h3>Informações de perfil</h3>
        {isLoading
          ? <Loading />
          : (
            <div>
              <div>
                <img data-testid="profile-image" src={ image } alt={ name } />
                <Link to="/profile/edit">Editar perfil</Link>
              </div>
              <h4>Nome</h4>
              <p>{name}</p>
              <h4>E-mail</h4>
              <p>{email}</p>
              <h4>Descrição</h4>
              <p>{description}</p>
            </div>
          ) }
      </div>
    );
  }
}

export default Profile;
