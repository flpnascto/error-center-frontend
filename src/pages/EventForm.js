import React, { useContext, useState } from 'react';
import ErrorCenterContext from '../context/ErrorCenterContext';
import Header from '../components/Header';
import ErrorResponse from '../components/ErrorResponse';
import { addEvent } from '../services/api';
import LoadingBox from '../components/LoadingBox';

export default function EventForm() {
  const { login, levelOptions } = useContext(ErrorCenterContext);

  const [infoMensage, setInfoMessage] = useState({
    message: '',
    status: false,
  });

  const formValuesInitialState = {
    description: '',
    log: '',
    origin: '',
    date: '',
    quantity: 1,
    user: login.email,
    levels: levelOptions,
    selectedLevel: levelOptions[0].id,
  };

  const [formValues, setFormValues] = useState(formValuesInitialState);

  const [loading, setLoading] = useState(false);

  const handleChange = ({ target: { value } }, key) => {
    setFormValues({ ...formValues, [key]: value });
    setInfoMessage({ ...infoMensage, message: false });
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
    setLoading(true);
    const response = await addEvent(eventData);
    setLoading(false)
    const { id, error } = response;

    if (id) {
      setInfoMessage({
        message: 'Evento cadastrado com sucesso',
        status: true,
      });
      setFormValues(formValuesInitialState)
    } else {
      setInfoMessage({
        message: error,
        status: false,
      })
    }
  };

  return (
    <div>
      <Header />
      <ErrorResponse message={infoMensage.message} status={infoMensage.status} />
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
            min="1"
            value={formValues.quantity}
            onChange={(event) => handleChange(event, 'quantity')}
          />
        </label>

        {loading
          ? <LoadingBox />
          : (
            <input className="form-button" type="submit" value="Adicionar evento" />
          )
        }
      </form>
    </div>
  );
};
