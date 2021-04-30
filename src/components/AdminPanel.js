import React, { useContext } from 'react';
import { useHistory } from 'react-router';
import ErrorCenterContext from '../context/ErrorCenterContext';

export default function AdminPanel() {
  const { login } = useContext(ErrorCenterContext);

  const history = useHistory();

  const handleNewLevel = () => history.push('/level');

  // ALTERAR APÓS CRIAR ROTAS ESPECÍFICAS
  const handleClick = () => history.push('/')

  return (
    <div className="content">
      <button
        className="form-button"
        type="button"
        disabled={!login.isLogged}
        onClick={handleClick} >
        Editar usuários
      </button>
      <button
        className="form-button"
        type="button"
        disabled={!login.isLogged}
        onClick={handleNewLevel} >
        Cadastar Level
      </button>
      <button
        className="form-button"
        type="button"
        disabled={!login.isLogged}
        onClick={handleClick} >
        Editar Level
      </button>
    </div>
  );
}