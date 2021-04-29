import React, { useContext } from 'react';
import ErrorCenterContext from '../context/ErrorCenterContext';

export default function UserPanel({ actionButton }) {
  const { login } = useContext(ErrorCenterContext);

  return (
    <button
      className="form-button"
      type="button"
      disabled={!login.isLogged}
      onClick={actionButton} >
      Cadastrar Evento
    </button>
  );
}