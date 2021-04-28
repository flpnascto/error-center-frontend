import React from 'react'
import { useHistory } from 'react-router';

import './style.css';

export default function ErrorResponse({ message, status }) {

  const history = useHistory();

  return (
    <div className='error__container'>
      {status &&
        (<div className='error__positive'>{message}</div>)
      }
      {!status &&
        (<div className='error__negative'>Ocorreu um erro. {message}.</div>)
      }
      <button className='top-button' onClick={() => history.goBack()}>Voltar</button>
    </div>
  );
};