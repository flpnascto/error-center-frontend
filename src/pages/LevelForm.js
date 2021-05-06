import React, { useState } from 'react';
import Header from '../components/Header';
import ErrorResponse from '../components/ErrorResponse';
import { addLevel } from '../services/api';
import LoadingBox from '../components/LoadingBox';

export default function LevelForm() {
  const [infoMensage, setInfoMessage] = useState({
    message: '',
    status: false,
  });

  const [formValues, setFormValues] = useState({
    description: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = ({ target: { value } }, key) => {
    setFormValues({ ...formValues, [key]: value });
    setInfoMessage({ ...infoMensage, message: false });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const response = await addLevel(formValues);
    setLoading(false);

    const { id, description, error } = response;

    if (id) {
      setInfoMessage({
        message: `Level "${description} adiconado com sucesso`,
        status: true,
      });
      setFormValues({ description: '' });
    } else {
      setInfoMessage({
        message: error,
        status: false,
      });
    }
  };

  return (
    <div>
      <Header />
      <ErrorResponse message={infoMensage.message} status={infoMensage.status} />
      <form className="content" onSubmit={handleSubmit}>
        <label className="form-label" htmlFor="namedescription_form">
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
            <input className="form-button" type="submit" value="Adicionar level" />
          )
        }
      </form>
    </div>
  );
};
