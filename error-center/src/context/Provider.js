
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ErrorCenterContext from './ErrorCenterContext';

function Provider({ children }) {
  const [login, setLogin] = useState({
    firstname: '',
    lastname: '',
    email: '',
    isLogged: false,
  });

  const contextValue = {
    login,
    setLogin,
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
