
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ErrorCenterContext from './ErrorCenterContext';

function Provider({ children }) {
  const [login, setLogin] = useState({
    email: '',
    password: '',
    isLogged: false,
  });

  const [btActive, setBtActive] = useState(true);

  useEffect(() => {
    const { email } = login;
    const regexEmail = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    const verifyEmail = email.match(regexEmail);
    if (verifyEmail) {
      setBtActive(true);
    } else {
      setBtActive(false);
    }
  }, [login]);

  const contextValue = {
    login,
    setLogin,
    btActive,
    setBtActive,

  };

  return (
    <ErrorCenterContext.Provider value={contextValue}>
      {children}
    </ErrorCenterContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
