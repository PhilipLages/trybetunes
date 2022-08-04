import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import MyImage from '../myImage.png';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      image: MyImage,
      isLoading: false,
    };
  }

  async componentDidMount() {
    this.handleLoading();
    const response = await getUser();
    this.handleLoading();
    this.setState({ userName: response.name });
  }

  handleLoading = () => {
    const { isLoading } = this.state;
    const verifyLoading = isLoading ? { isLoading: false } : { isLoading: true };
    this.setState(verifyLoading);
  }

  render() {
    const { userName, image } = this.state;
    return (
      <div>
        <header className="header" data-testid="header-component">
          <div className="user-logo">
            <h1 className="logo">
              Trybe
              <span className="color-change">Tunes</span>
            </h1>
            <div className="user">
              <img src={ image } alt={ userName } />
              <h1
                data-testid="header-user-name"
              >
                {`Olá, ${userName}!`}
              </h1>
            </div>
          </div>
          <nav className="nav">
            <Link to="/search" data-testid="link-to-search">Pesquisar</Link>
            <Link to="/favorites" data-testid="link-to-favorites">Favoritos</Link>
            <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
          </nav>
        </header>
      </div>
    );
  }
}

export default Header;
