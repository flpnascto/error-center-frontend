import React from 'react'
import { Redirect, } from 'react-router';

import './style.css';

export default function ErrorResponse({ message, status, close }) {
  return (
    <div className='modal__container'>
      {(message === 'invalid_token') && <Redirect to='/login' />}

      {status &&
        (<div className='modal__positive'>{message}</div>)
      }
      {!status &&
        (<div className='modal__negative'>Ocorreu um erro. {message}.</div>)
      }
      <button className='top-button modal__button' onClick={() => close()}>OK</button>
    </div>
  );
};