import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
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
    const { userName, isLoading } = this.state;
    return (
      <div>
        <header className="header" data-testid="header-component">
          {isLoading
            ? <Loading />
            : (
              <div className="user-logo">
                <h1 className="logo">
                  Trybe
                  <span className="color-change">Tunes</span>
                </h1>
                <h1
                  className="user"
                  data-testid="header-user-name"
                >
                  {userName}
                </h1>
              </div>
            ) }
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
