import React, { useContext, useState } from 'react';
import ErrorCenterContext from '../../context/ErrorCenterContext';

export default function FilterEvent() {
  const { levelOptions, setFilterOptions } = useContext(ErrorCenterContext);

  const formValuesInitialState = {
    description: '',
    origin: '',
    date: '',
    quantity: '',
    levels: levelOptions,
    selectedLevel: '',
    user: '',
  }

  const [formValues, setFormValues] = useState(formValuesInitialState);

  const handleChange = ({ target: { value } }, key) => {
    setFormValues({ ...formValues, [key]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setFilterOptions({
      description: (formValues.description).toLowerCase(),
      origin: (formValues.origin).toLowerCase(),
      date: formValues.date,
      quantity: formValues.quantity,
      level: formValues.selectedLevel,
      user: formValues.user,
      page: 1,
      size: 50,
    })
  };

  const handleResetFilter = () => {
    setFormValues(formValuesInitialState);
    setFilterOptions({
      description: '',
      origin: '',
      date: '',
      quantity: '',
      level: '',
      user: '',
      page: 1,
      size: 50,
    });
  };

  return (
    <div>
      <form className="content" onSubmit={handleSubmit}>
        <select
          className="form-input-text"
          value={formValues.selectedLevel}
          onChange={(event) => handleChange(event, 'selectedLevel')}
        >
          <option key="none" value="">Sem filtro</option>
          {formValues.levels.map((option, index) => (
            <option key={index} value={option.description}>{option.description}</option>
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

        <div className="content-row">
          <input className="form-button" type="submit" value="Aplicar filtro" />
          <button
            className="form-button"
            type="button"
            onClick={handleResetFilter}
          >
            Limpar filtros
        </button>
        </div>

      </form>
    </div>
  );
}