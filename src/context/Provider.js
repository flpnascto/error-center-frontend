
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ErrorCenterContext from './ErrorCenterContext';

function Provider({ children }) {
  const [login, setLogin] = useState({
    firstname: '',
    lastname: '',
    email: '',
    isLogged: false,
  });

  const [levelOptions, setLevelOptions] = useState([]);

  const [apiData, setApiData] = useState([]);

  const [filterOptions, setFilterOptions] = useState({
    description: '',
    origin: '',
    date: '',
    quantity: '',
    level: '',
    user: '',
    page: 1,
    size: 50,
  });

  const contextValue = {
    login,
    setLogin,
    levelOptions,
    setLevelOptions,
    apiData,
    setApiData,
    filterOptions,
    setFilterOptions,
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