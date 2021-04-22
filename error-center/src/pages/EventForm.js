import React, { useContext, useState } from 'react';
import ErrorCenterContext from '../context/ErrorCenterContext';
import Header from '../components/Header';
import ErrorResponse from '../components/ErrorResponse';
import { addEvent } from '../services/api';

export default function EventForm() {
  const { login, levelOptions } = useContext(ErrorCenterContext);

  const [infoMensage, setInfoMessage] = useState({
    message: '',
    status: false,
    isEnable: false,
  });

  const [formValues, setFormValues] = useState({
    description: '',
    log: '',
    origin: '',
    date: '',
    quantity: 0,
    user: login.email,
    levels: levelOptions,
    selectedLevel: levelOptions[0].id,
  });

  const handleChange = ({ target: { value } }, key) => {
    setFormValues({ ...formValues, [key]: value });
    setInfoMessage({ isEnable: false })
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const eventData = {
      date: formValues.date,
      description: formValues.description,
      level: parseInt(formValues.selectedLevel, 10),
      log: formValues.log,
      origin: formValues.origin,
      quantity: formValues.quantity,
    };

    const response = await addEvent(eventData);

    const { id, message } = response;

    if (id) {
      setInfoMessage({
        message: 'Evento cadastrado com sucesso',
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
  };

  return (
    <div>
      <Header />
      {infoMensage.isEnable &&
        (<ErrorResponse message={infoMensage.message} status={infoMensage.status} />)
      }
      <form className="content" onSubmit={handleSubmit}>
        <select
          className="form-input-text"
          value={formValues.selectedLevel}
          onChange={(event) => handleChange(event, 'selectedLevel')}
        >
          {formValues.levels.map((option, index) => (
            <option key={index} value={option.id}>{option.description}</option>
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

        <input className="form-button" type="submit" value="Adicionar evento" />
      </form>
    </div>
  );
};
