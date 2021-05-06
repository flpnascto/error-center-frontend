import React, { useState } from 'react';
import Header from '../components/Header';
import ErrorResponse from '../components/ErrorResponse';
import { addUser } from '../services/api';
import LoadingBox from '../components/LoadingBox';

export default function EventForm() {
  const [infoMensage, setInfoMessage] = useState({
    message: '',
    status: false,
  });

  const formValuesInitialState = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    password_confirm: '',
  };

  const [formValues, setFormValues] = useState(formValuesInitialState);

  const [loading, setLoading] = useState(false);

  const handleChange = ({ target: { value } }, key) => {
    setFormValues({ ...formValues, [key]: value });
    setInfoMessage({ ...infoMensage, message: '' });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (formValues.password !== formValues.password_confirm) {
      setInfoMessage({
        message: 'Passwords precisam ser iguais',
        status: false,
      });
    } else {
      setLoading(true);
      const response = await addUser(formValues);
      setLoading(false);
      const { email, error } = response;
      if (email) {
        setInfoMessage({
          message: 'Usuário cadastrado com sucesso',
          status: true,
        });
        setFormValues(formValuesInitialState);
      } else {
        setInfoMessage({
          message: error,
          status: false,
          isEnable: true
        })
      }
    }
  }

  return (
    <div>
      <Header />
      <ErrorResponse message={infoMensage.message} status={infoMensage.status} />
      <form className="content" onSubmit={handleSubmit}>
        <label className="form-label" htmlFor="name_form">
          Nome:
            <input
            className="form-input-text"
            id="name_form"
            type="text"
            value={formValues.firstname}
            onChange={(event) => handleChange(event, 'firstname')}
          />
        </label>

        <label className="form-label" htmlFor="surname_form">
          Sobrenome:
            <input
            className="form-input-text"
            id="surname_form"
            type="text"
            value={formValues.lastname}
            onChange={(event) => handleChange(event, 'lastname')}
          />
        </label>

        <label className="form-label" htmlFor="email_form">
          Email:
            <input
            className="form-input-text"
            id="email_form"
            type="text"
            value={formValues.email}
            onChange={(event) => handleChange(event, 'email')}
          />
        </label>

        <label className="form-label" htmlFor="password_form">
          Password:
            <input
            className="form-input-text"
            id="password_form"
            type="password"
            value={formValues.password}
            onChange={(event) => handleChange(event, 'password')}
          />
        </label>

        <label className="form-label" htmlFor="password_form">
          Confirmar Password:
            <input
            className="form-input-text"
            id="password_form"
            type="password"
            value={formValues.password_confirm}
            onChange={(event) => handleChange(event, 'password_confirm')}
          />
        </label>

        {loading
          ? <LoadingBox />
          : (
            <input className="form-button" type="submit" value="Adicionar usuário" />
          )
        }
      </form>
    </div>
  );
}