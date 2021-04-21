import React, { useState } from 'react';
import { useHistory } from 'react-router';
import Header from '../components/Header';
import { addLevel } from '../services/api';

export default function LevelForm() {
  const [formValues, setFormValues] = useState({
    description: '',
  });

  const history = useHistory();

  const handleChange = ({ target: { value } }, key) => {
    setFormValues({ ...formValues, [key]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await addLevel(formValues);
    const { id, description, message } = response;
    if (id) {
      alert(`Level "${description}" adiconado com sucesso`);
      history.push('/')
    } else {
      alert(`Não foi possível realizar o cadastro do level.` +
        `\nErro: ${message}`)
    }
  };

  return (
    <div>
      <Header />
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

        <input className="form-button" type="submit" value="Adicionar level" />

      </form>
    </div>
  );

}