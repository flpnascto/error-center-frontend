import React from 'react';
import { Link } from 'react-router-dom';
import logoTrybe from '../../assets/logo_trybe.png'

import './style.css'

export default function Footer() {

  return (
    <div className="footer-container">
      <div className="content-row">
        <Link to="https://www.betrybe.com/" >
          <img
            src={logoTrybe}
            alt="Trybe"
            height="50px">
          </img>
        </Link>
        <span>Projeto de Aceleração JAVA - Trybe / Conta Azul</span>
        <Link className='text-link' to="/contato">
          <span>Desenvolvedores</span>
        </Link>
        <Link className='text-link' to="/info">
          <span>Informações</span>
        </Link>
      </div>
    </div>
  );
}