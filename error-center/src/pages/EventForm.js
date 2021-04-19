import React, { useContext, useEffect, useState } from 'react';
import ErrorCenterContext from '../context/ErrorCenterContext';
import Header from '../components/Header';
import { getLevels, addEvent } from '../services/api';

export default function EventForm() {
  const { login } = useContext(ErrorCenterContext);

  const options = ['error', 'warning', 'info'];

  // const options = getLevels();

  const [formValues, setFormValues] = useState({
    description: '',
    log: '',
    origin: '',
    date: '',
    quantity: 0,
    user: login.email,
    level: options[0],
  })

  const handleChange = ({ target: { value } }, key) => {
    setFormValues({ ...formValues, [key]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // INSERIR AQUI
    const response = await addEvent(formValues);
    console.log(response)
  }

  return (
    <div>
      <Header />
      <form className="content" onSubmit={handleSubmit}>
        <select
          className="form-input-text"
          value={formValues.options}
          onChange={(event) => handleChange(event, 'level')}
        >
          {options.map((option, index) => (
            <option key={index} value={option}>{option}</option>
          ))}
        </select>

        <label className="form-label" htmlFor="description_form">
          Descrição:
            <input
            className="form-input-text"
            id="description_form"
            type="text"
            value={formValues.description}
            onChange={(event) => handleChange(event, 'description')}
          />
        </label>

        <label className="form-label" htmlFor="log_form">
          Log:
            <input
            className="form-input-text"
            id="log_form"
            type="text"
            value={formValues.log}
            onChange={(event) => handleChange(event, 'log')}
          />
        </label>

        <label className="form-label" htmlFor="origin_form">
          Origem:
            <input
            className="form-input-text"
            id="origin_form"
            type="text"
            value={formValues.origin}
            onChange={(event) => handleChange(event, 'origin')}
          />
        </label>

        <label className="form-label" htmlFor="date_form">
          Data:
            <input
            className="form-input-text"
            id="date_form"
            type="text"
            value={formValues.date}
            onChange={(event) => handleChange(event, 'date')}
          />
        </label>

        <label className="form-label" htmlFor="quantity_form">
          Quantidade:
            <input
            className="form-input-text"
            id="quantity_form"
            type="number"
            value={formValues.quantity}
            onChange={(event) => handleChange(event, 'quantity')}
          />
        </label>

        <label className="form-label" htmlFor="user_form">
          Usuário:
            <input
            className="form-input-text"
            id="user_form"
            type="text"
            value={formValues.user}
            onChange={(event) => handleChange(event, 'user')}
          />
        </label>

        <input className="form-button" type="submit" value="Adicionar evento" />
      </form>
    </div>
  );
}