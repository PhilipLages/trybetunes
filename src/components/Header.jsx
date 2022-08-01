import React, { Component } from 'react';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';

class Header extends Component {
  constructor() {
    super();
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
        <header data-testid="header-component">
          {isLoading
            ? <Loading />
            : (
              <p>{`Bem vindx, ${userName}`}</p>
            ) }
        </header>
      </div>
    );
  }
}

export default Header;
