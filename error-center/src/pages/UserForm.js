import React, { useState } from 'react';
import { useHistory } from 'react-router'
import Header from '../components/Header';
import { addUser } from '../services/api';

export default function EventForm() {
  const [formValues, setFormValues] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
  })

  const history = useHistory();

  const handleChange = ({ target: { value } }, key) => {
    setFormValues({ ...formValues, [key]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Atualizar posteriormente para retornar todo formValues
    const data = {
      email: formValues.email,
      password: formValues.password,
    }
    const response = await addUser(data);
    console.log(response)
    const { id, email, message, statusCode } = response;
    if (id) {
      alert(`Usuário ${email}, id:${id} criado com sucesso`);
      history.push('/');
    } else {
      alert(`${message}, code: ${statusCode}`)
    }
  }

  return (
    <div>
      <Header />
      <form className="content" onSubmit={handleSubmit}>
        <label className="form-label" htmlFor="name_form">
          Nome:
            <input
            className="form-input-text"
            id="name_form"
            type="text"
            value={formValues.name}
            onChange={(event) => handleChange(event, 'name')}
          />
        </label>

        <label className="form-label" htmlFor="surname_form">
          Sobrenome:
            <input
            className="form-input-text"
            id="surname_form"
            type="text"
            value={formValues.surname}
            onChange={(event) => handleChange(event, 'surname')}
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