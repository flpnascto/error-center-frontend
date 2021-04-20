import React, { useContext } from 'react';
import { useHistory } from 'react-router';
import Header from '../components/Header';
import ErrorCenterContext from '../context/ErrorCenterContext';


export default function Welcome() {
  const { login, setLogin } = useContext(ErrorCenterContext);
  const history = useHistory();

  const handleForm = () => history.push('/form');

  const handleEventList = () => history.push('/events');

  const handleNewUser = () => history.push('/user');

  const logout = () => {
    setLogin({
      email: '',
      password: '',
      isLogged: false,
    });
  }

  const doLogin = (<div className="title">
    Olá, realize o login para entrar no sistema!
  </div>)

  const logged = (<div className="title">
    Olá, <strong>{login.email}</strong>, seja bem vindo ao sistema!
  </div>)

  return (
    <div>
      <Header />
      <div className="content">
        {!login.isLogged && doLogin}
        {login.isLogged && logged}

        <button
          className="form-button"
          type="button"
          disabled={!login.isLogged}
          onClick={handleForm} >
          Cadastrar Evento
        </button>

        <button
          className="form-button"
          type="button"
          disabled={!login.isLogged}
          onClick={handleEventList} >
          Listar Evento
        </button>

        <button
          className="form-button"
          type="button"
          onClick={handleNewUser} >
          Cadastrar Usuário
        </button>

        <button
          className="form-button"
          type="button"
          disabled={!login.isLogged}
          onClick={logout} >
          Sair
        </button>

      </div>
    </div>
  );
}