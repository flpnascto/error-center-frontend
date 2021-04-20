import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import ErrorCenterContext from '../../context/ErrorCenterContext';

import './style.css'

export default function Header() {
  const history = useHistory();
  const { login } = useContext(ErrorCenterContext)

  return (
    <div>
      <header className="content-header">
        <img src="https://contaazul.com/wp-content/themes/assets/general/divorce/layout/images/logo.svg" alt="Conta Azul" width="200px"></img>

        <div className="title-header" >Aceleração - Grupo X</div>

        {!login.isLogged &&
          (<button
            type="button"
            className="login-bt"
            onClick={() => history.push('/login')}
          >
            Entrar
          </button>)
        }

        {login.isLogged && (<div>{login.email.split("@")[0]}</div>)}

      </header>
    </div>
  );
}