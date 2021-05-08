import React from 'react'
import { Redirect, useHistory } from 'react-router';

import './style.css';

export default function ErrorResponse({ message, status }) {
  const isVisible = (message) ? true : false;
  const errorMessage = `Ocorreu um erro. ${message}.`;
  const history = useHistory();

  return (
    <div className='error__container'>
      {(message === 'invalid_token') && <Redirect to='/login' />}

      {status &&
        (<div className='error__positive'>{message}</div>)
      }
      {!status &&
        (<div className='error__negative'>{isVisible && errorMessage}</div>)
      }
      <button className='top-button' onClick={() => history.goBack()}>Voltar</button>
    </div>
  );
};