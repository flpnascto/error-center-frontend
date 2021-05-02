import React, { useContext, useState } from 'react';
import Header from '../components/Header';
import ErrorCenterContext from '../context/ErrorCenterContext';
import ErrorResponse from '../components/ErrorResponse';
import { updateLevel } from '../services/api';
import LoadingBox from '../components/LoadingBox';

export default function EditLevel() {
  const { levelOptions } = useContext(ErrorCenterContext);

  const formValuesInitialState = {
    levels: levelOptions,
    id: levelOptions[0].id,
    description: '',
  };

  const [formValues, setFormValues] = useState(formValuesInitialState);

  const [infoMensage, setInfoMessage] = useState({
    message: '',
    status: false,
    isEnable: false,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = ({ target: { value } }, key) => {
    setFormValues({ ...formValues, [key]: value });
    setInfoMessage({ isEnable: false })
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const response = await updateLevel(formValues);
    setLoading(false);

    const { id, description, error } = response;

    if (id) {
      setInfoMessage({
        message: 'Level alterado com sucesso',
        status: true,
        isEnable: true
      });
      const index = (formValuesInitialState.levels).findIndex((e) => e.id === id);
      formValuesInitialState.levels[index] = { ...formValuesInitialState.levels[index], description: description }
      setFormValues(formValuesInitialState);
    } else {
      setInfoMessage({
        message: error,
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
          value={formValues.id}
          onChange={(event) => handleChange(event, 'id')}
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

        {loading
          ? <LoadingBox />
          : (
            <input className="form-button" type="submit" value="Editar level" />
          )
        }
      </form>
    </div>
  );
}