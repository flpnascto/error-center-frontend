import React, { useState } from 'react';
import { useHistory } from 'react-router'
import Header from '../components/Header';
import ErrorResponse from '../components/ErrorResponse';
import { addUser } from '../services/api';

export default function EventForm() {
  const [infoMensage, setInfoMessage] = useState({
    message: '',
    status: false,
    isEnable: false,
  });

  const [formValues, setFormValues] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
  })

  const history = useHistory();

  const handleChange = ({ target: { value } }, key) => {
    setFormValues({ ...formValues, [key]: value });
    setInfoMessage({ isEnable: false })
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await addUser(formValues);
    console.log(response)
    const { email, message, statusCode } = response;
    if (email) {
      setInfoMessage({
        message: 'Usuário cadastrado com sucesso',
        status: true,
        isEnable: true
      })
    } else {
      setInfoMessage({
        message: message,
        status: false,
        isEnable: true
      })
    }
  }

  return (
    <div>
      <Header />
      {infoMensage.isEnable &&
        (<ErrorResponse message={infoMensage.message} status={infoMensage.status} />)
      }
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
            type="text"
            value={formValues.password}
            onChange={(event) => handleChange(event, 'password')}
          />
        </label>

        <input className="form-button" type="submit" value="Adicionar usuário" />
      </form>
    </div>
  );
}