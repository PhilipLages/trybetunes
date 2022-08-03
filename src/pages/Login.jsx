import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      isDisable: true,
      isLoading: false,
    };
  }

  handleDisable = () => {
    const { name } = this.state;
    const THREE = 3;
    const disable = name.length >= THREE ? { isDisable: false } : { isDisable: true };
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
    const { name } = this.state;
    const { history } = this.props;
    this.handleLoading();
    await createUser({ name });
    this.handleLoading();
    history.push('/search');
  }

  render() {
    const { isDisable, name, isLoading } = this.state;
    return (
      <div className="login" data-testid="page-login">
        {isLoading
          ? <Loading />
          : (
            <section className="container">
              <h1>
                Trybe
                <span className="color-change">Tunes</span>
              </h1>
              <form className="form">
                <label htmlFor="name">
                  <h4>Insira seu nome</h4>
                  <input
                    data-testid="login-name-input"
                    type="text"
                    value={ name }
                    onChange={ this.handleChange }
                    name="name"
                    id="name"
                    placeholder="digite aqui"
                  />
                </label>
                <button
                  className="login-btn"
                  data-testid="login-submit-button"
                  type="button"
                  onClick={ this.handleSubmit }
                  disabled={ isDisable }
                >
                  Entrar
                </button>
              </form>
            </section>
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
