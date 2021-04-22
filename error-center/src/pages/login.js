import React, { useContext, useEffect, useState } from 'react';
import ErrorCenterContext from '../context/ErrorCenterContext';
import { useHistory } from 'react-router';
import Header from '../components/Header';
import ErrorResponse from '../components/ErrorResponse';
import * as api from '../services/api';
import { setStorage } from '../services/localSorage';

import './style.css';

export default function Login() {
  const { login, setLogin } = useContext(ErrorCenterContext)

  const [infoMensage, setInfoMessage] = useState({
    message: '',
    status: false,
    isEnable: false,
  });

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
    setInfoMessage({ isEnable: false });
  };

  const handleToken = async () => {
    const response = await api.getToken(formValues);
    const { access_token } = response;

    if (access_token) {
      setStorage('token', response);
      return true;
    }

    setInfoMessage({
      message: 'Usuário e/ou senha inválidos',
      status: false,
      isEnable: true
    });
    return false;
  };

  const handleLogin = async () => {
    const successToken = await handleToken();

    if (successToken) {
      const { firstname, lastname, email } = await api.login();
      setLogin({
        firstname,
        lastname,
        email,
        isLogged: true
      })
      history.push('/')
    } else {
      setLogin({ ...login, isLogged: false });
    }
  };

  return (
    <div>
      <Header />
      {infoMensage.isEnable &&
        (<ErrorResponse message={infoMensage.message} status={infoMensage.status} />)
      }
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
};
