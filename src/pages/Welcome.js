import React, { useContext } from 'react';
import { useHistory } from 'react-router';
import Header from '../components/Header';
import UserPanel from '../components/UserPanel';
import AdminPanel from '../components/AdminPanel';
import ErrorCenterContext from '../context/ErrorCenterContext';
import * as api from '../services/api';

export default function Welcome() {
  const { login, setLogin, setLevelOptions } = useContext(ErrorCenterContext);
  const history = useHistory();

  const handleLevels = async () => {
    const optionsResponse = await api.getLevels();
    if (optionsResponse.error) return history.push('/login')
    setLevelOptions(optionsResponse);
  }

  const handleForm = async () => {
    await handleLevels();
    history.push('/form');
  }

  const handleEventList = async () => {
    await handleLevels();
    if (login.isAdmin) return history.push('/events/admin')
    history.push('/events');
  }

  const handleNewUser = () => history.push('/user');

  const logout = () => {
    setLogin({
      firstname: '',
      lastname: '',
      email: '',
      isAdmin: false,
      isLogged: false,
    });
    localStorage.clear();
  }

  const doLogin = (<div className="title">
    Olá, realize o login para entrar no sistema!
  </div>)

  const logged = (<div className="title">
    Olá, <strong>{login.firstname + ' ' + login.lastname}</strong>, seja bem vindo ao sistema!
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
          onClick={handleEventList} >
          Listar Eventos
        </button>

        {!login.isAdmin && <UserPanel actionButton={handleForm} />}
        {login.isAdmin && <AdminPanel />}


        <button
          className="form-button"
          type="button"
          onClick={handleNewUser} >
          Cadastrar Usuário
        </button>

        {login.isLogged
          ? (<button
            className="form-button"
            type="button"
            onClick={logout} >
            Sair
          </button>)

          : (<button
            className="form-button"
            type="button"
            onClick={() => history.push('/login')} >
            Entrar
          </button>)
        }
      </div>
    </div>
  );
}