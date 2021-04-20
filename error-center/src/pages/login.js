import React, { useContext } from 'react';
import ErrorCenterContext from '../context/ErrorCenterContext';
import Header from '../components/Header';
import { useHistory } from 'react-router';

import './style.css';

export default function Login() {
  const { btActive, login, setLogin } = useContext(ErrorCenterContext);

  const { password, email } = login;

  const minPasswordLength = 6;

  const history = useHistory();

  const handleChange = ({ target: { value } }, key) => {
    setLogin({ ...login, [key]: value });
  };

  const handleLogin = () => {
    setLogin({ ...login, isLogged: true });
    history.push('/');
  }

  return (
    <div>
      <Header />
      <div className="content">
        <label className="form-label" htmlFor="email">
          Email:
        <br />
          <input
            className="form-input-text"
            type="email"
            id="email"
            onChange={(event) => handleChange(event, 'email')}
          />
        </label>
        <br />
        <label className="form-label" htmlFor="password">
          Password:
        <br />
          <input
            className="form-input-text"
            type="password"
            id="password"
            onChange={(event) => handleChange(event, 'password')}
          />
        </label>
        <br />
        <button
          className="form-button"
          type="button"
          disabled={!btActive || password.length <= minPasswordLength}
          onClick={handleLogin}
        >
          Entrar
      </button>
      </div>
    </div>
  );
}