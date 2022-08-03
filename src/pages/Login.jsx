import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      isDisable: true,
      isLoading: false,
    };
  }

  handleDisable = () => {
    const { userName } = this.state;
    const THREE = 3;
    const disable = userName.length >= THREE ? { isDisable: false } : { isDisable: true };
    this.setState(disable);
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, () => this.handleDisable());
  }

  handleLoading = () => {
    const { isLoading } = this.state;
    const verifyLoading = isLoading ? { isLoading: false } : { isLoading: true };
    this.setState(verifyLoading);
  }

  handleSubmit = async () => {
    const { userName } = this.state;
    const { history } = this.props;
    this.handleLoading();
    await createUser({ name: userName });
    this.handleLoading();
    history.push('/search');
  }

  render() {
    const { isDisable, userName, isLoading } = this.state;
    return (
      <div className="login" data-testid="page-login">
        {isLoading
          ? <Loading />
          : (
            <form className="profile-edit">
              <label htmlFor="userName">
                Insira seu nome:
                <input
                  data-testid="login-name-input"
                  type="text"
                  value={ userName }
                  onChange={ this.handleChange }
                  name="userName"
                  id="userName"
                />
              </label>
              <button
                data-testid="login-submit-button"
                type="button"
                onClick={ this.handleSubmit }
                disabled={ isDisable }
              >
                Entrar
              </button>
            </form>
          )}
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
