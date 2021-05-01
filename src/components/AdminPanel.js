import React, { useContext } from 'react';
import { useHistory } from 'react-router';
import ErrorCenterContext from '../context/ErrorCenterContext';
import { getLevels } from '../services/api'

export default function AdminPanel() {
  const { login, setLevelOptions } = useContext(ErrorCenterContext);

  const history = useHistory();

  const handleEventList = async () => {
    const optionsResponse = await getLevels();
    if (optionsResponse.error) return history.push('/login')

    setLevelOptions(optionsResponse);
    history.push('/level/edit');
  }

  return (
    <div className="content">
      <button
        className="form-button"
        type="button"
        disabled={!login.isLogged}
        onClick={() => history.push('/user/all')} >
        Listar usuários
      </button>
      <button
        className="form-button"
        type="button"
        disabled={!login.isLogged}
        onClick={() => history.push('/level')} >
        Cadastar Level
      </button>
      <button
        className="form-button"
        type="button"
        disabled={!login.isLogged}
        onClick={handleEventList} >
        Editar Level
      </button>
    </div>
  );
}