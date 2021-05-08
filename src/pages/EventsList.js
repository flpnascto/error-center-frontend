import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import FilterEvent from '../components/FilterEvent';
import ErrorCenterContext from '../context/ErrorCenterContext';
import { getEvents } from '../services/api';
import { useHistory } from 'react-router';
import LoadingPage from '../components/LoadingPage';

export default function EventsList() {
  const [filterVisible, setFilterVisible] = useState(false);

  const { apiData, setApiData, filterOptions, setFilterOptions } = useContext(ErrorCenterContext);

  const [loading, setLoading] = useState(false);

  const handlePageChange = (action) => {
    if (action === 'add') {
      setFilterOptions({ ...filterOptions, page: filterOptions.page + 1 });
    };

    if (action === 'sub' && filterOptions.page > 0) {
      setFilterOptions({ ...filterOptions, page: filterOptions.page - 1 });
    };

  }

  useEffect(() => {
    async function fetchEvents() {
      setLoading(true);
      const response = await getEvents(filterOptions);
      setApiData(response);
      setLoading(false);
    }
    fetchEvents();
  }, [filterOptions, setApiData]);

  const history = useHistory();

  const filterButtonText = filterVisible
    ? 'Ocultar filtro'
    : 'Mostrar opções de filtro';

  return (
    <div>
      <Header />
      {!loading && (
        <div className="content-row">
          <button
            className='top-button'
            onClick={() => setFilterVisible(!filterVisible)}
          >{filterButtonText}
          </button>
          <button className='top-button' onClick={() => history.goBack()}>Voltar</button>
        </div>
      )}
      {filterVisible && <FilterEvent />}
      { loading
        ? (<LoadingPage />)
        : (
          <div className="content">
            <table>
              <thead>
                <tr>
                  <th>Tipo</th>
                  <th>Descrição</th>
                  <th>Origem</th>
                  <th>Data</th>
                  <th>Quantidade</th>
                  <th>Usuário</th>
                </tr>
              </thead>
              <tbody>
                {(apiData.length < 1)
                  ? (
                    <tr>
                      <td colSpan={6} className="row-text-center">
                        Nenhum evento encontrado
                </td>
                    </tr>
                  )
                  : (
                    apiData.map((item) => (
                      <tr key={item.id} >
                        <td className="row-text-center" >{item.level}</td>
                        <td>{item.description}</td>
                        <td>{item.origin}</td>
                        <td className="row-text-center" >{item.date}</td>
                        <td className="row-text-center" >{item.quantity}</td>
                        <td>{item.user}</td>
                      </tr>
                    ))
                  )
                }
              </tbody>
            </table>
            { (filterOptions.size > 1) &&
              (<div>
                <button onClick={() => handlePageChange('add')}>Próxima</button>
                <span>{filterOptions.page + 1}</span>
                { (filterOptions.page > 0) && (<button onClick={() => handlePageChange('sub')}>Anterior</button>)}
              </div>)}
          </div>
        )

      }
    </div>
  );
}