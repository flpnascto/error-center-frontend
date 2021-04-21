import React, { useContext, useEffect, useState } from 'react';
import ErrorCenterContext from '../context/ErrorCenterContext';
import { useHistory } from 'react-router';
import Header from '../components/Header';
import * as api from '../services/api';
import { setStorage } from '../services/localSorage';

import './style.css';

export default function Login() {
  const { login, setLogin } = useContext(ErrorCenterContext)
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  })
  const [btActive, setBtActive] = useState(true);

  useEffect(() => {
    const { email, password } = formValues;
    const regexEmail = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    const verifyEmail = email.match(regexEmail);
    const minPasswordLength = 5;

    if (verifyEmail && password.length >= minPasswordLength) {
      setBtActive(true);
    } else {
      setBtActive(false);
    }
  }, [formValues]);

  const history = useHistory();

  const handleChange = ({ target: { value } }, key) => {
    setFormValues({ ...formValues, [key]: value });
  };

  const handleLogin = async () => {
    const response = await api.getToken(formValues);
    const { access_token, error, error_description } = response;
    console.log('handleLogin')
    console.log(response)
    if (access_token) {
      setStorage('token', response);
      setLogin({ ...login, isLogged: true });
      history.push('/');
    } else {
      // Aprimorar retorno de ERRO
      alert(`${error}, desrição: ${error_description}`)
    }
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
          disabled={!btActive}
          onClick={handleLogin}
        >
          Entrar
      </button>
      </div>
    </div>
  );
}