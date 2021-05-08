import React, { useContext, useState } from 'react';
import ErrorCenterContext from '../../context/ErrorCenterContext';

const sizeOptions = [5, 10, 25, 50, 100];

export default function FilterEvent() {
  const { levelOptions, userOptions, filterOptions, setFilterOptions } = useContext(ErrorCenterContext);

  const formValuesInitialState = {
    description: '',
    origin: '',
    date: '',
    quantity: '',
    levels: levelOptions,
    selectedLevel: '',
    user: userOptions,
    selectedUser: '',
    selectedSize: '',
  };

  const [formValues, setFormValues] = useState(formValuesInitialState);

  const handleChange = ({ target: { value } }, key) => {
    setFormValues({ ...formValues, [key]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setFilterOptions({
      ...filterOptions,
      description: (formValues.description).toLowerCase(),
      origin: (formValues.origin).toLowerCase(),
      date: formValues.date,
      quantity: formValues.quantity,
      level: formValues.selectedLevel,
      user: formValues.selectedUser,
      size: formValues.selectedSize,
    })
  };

  const handleResetFilter = () => {
    setFormValues(formValuesInitialState);
    setFilterOptions({
      ...filterOptions,
      description: '',
      origin: '',
      date: '',
      quantity: '',
      level: '',
      user: '',
      page: 0,
      size: '',
    });
  };

  return (
    <div>
      <form className="content" onSubmit={handleSubmit}>
        <div className="content-row">
          <label className="form-label" htmlFor="select_level">
            Level:
            <select
              className="form-input-text"
              value={formValues.selectedLevel}
              id="select_level"
              onChange={(event) => handleChange(event, 'selectedLevel')}
            >
              <option key="none" value="">todos</option>
              {formValues.levels.map((option, index) => (
                <option key={index} value={option.description}>{option.description}</option>
              ))}
            </select>
          </label>

          <label className="form-label content-middle" htmlFor="date_form">
            Data:
            <input
              className="form-input-text"
              id="date_form"
              type="text"
              placeholder="AAAA-MM-DD"
              value={formValues.date}
              onChange={(event) => handleChange(event, 'date')}
            />
          </label>

          <label className="form-label content-middle" htmlFor="quantity_form">
            Quantidade:
            <input
              className="form-input-text"
              id="quantity_form"
              type="number"
              value={formValues.quantity}
              onChange={(event) => handleChange(event, 'quantity')}
            />
          </label>
          <label className="form-label content-middle" htmlFor="select_size">
            Registros:
            <select
              className="form-input-text"
              value={formValues.selectedSize}
              id="select_size"
              onChange={(event) => handleChange(event, 'selectedSize')}
            >
              <option key="none" value="">todos</option>
              {sizeOptions.map((option, index) => (
                <option key={index} value={option}>{option}</option>
              ))}
            </select>
          </label>
        </div>

        <div className="content-row">
          <label className="form-label" htmlFor="select_user">
            Usuário:
            <select
              className="form-input-text"
              value={formValues.selectedUser}
              id="select_user"
              onChange={(event) => handleChange(event, 'selectedUser')}
            >
              <option key="none" value="">todos</option>
              {formValues.user.map((option, index) => (
                <option key={index} value={option.email}>{option.email}</option>
              ))}
            </select>
          </label>

          <label className="form-label content-middle" htmlFor="origin_form">
            Origem:
            <input
              className="form-input-text"
              id="origin_form"
              type="text"
              value={formValues.origin}
              onChange={(event) => handleChange(event, 'origin')}
            />
          </label>

          <label className="form-label content-middle" htmlFor="description_form">
            Descrição:
            <input
              className="form-input-text"
              id="description_form"
              type="text"
              value={formValues.description}
              onChange={(event) => handleChange(event, 'description')}
            />
          </label>

        </div>










        {/* <label className="form-label" htmlFor="user_form">
          Usuário:
            <input
            className="form-input-text"
            id="user_form"
            type="text"
            value={formValues.user}
            onChange={(event) => handleChange(event, 'user')}
          />
        </label> */}



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