import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import FilterEvent from '../components/FilterEvent';
import ResponseModal from '../components/ResponseModal';
import { getEvents, removeEvent } from '../services/api';
import { useHistory } from 'react-router';
import ErrorCenterContext from '../context/ErrorCenterContext';
import LoadingPage from '../components/LoadingPage';

export default function EventsList() {
  const [filterVisible, setFilterVisible] = useState(false);

  const infoMessageInitialState = {
    message: '',
    status: false,
    isEnable: false,
  }
  const [infoMensage, setInfoMessage] = useState(infoMessageInitialState);

  const { apiData, setApiData, filterOptions } = useContext(ErrorCenterContext);

  const [loading, setLoading] = useState(false);

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

  const deleteEvent = async ({ target }) => {
    setLoading(true);
    const eventId = target.value;
    const response = await removeEvent(eventId);
    setLoading(false);
    const { message, error } = response;

    if (message) {
      setInfoMessage({
        message: message,
        status: true,
        isEnable: true
      });
    } else {
      setInfoMessage({
        message: error,
        status: false,
        isEnable: true
      })
    }
  }

  const closeModal = () => setInfoMessage(infoMessageInitialState);

  return (
    <div>
      <Header />
      {infoMensage.isEnable &&
        (<div className="modal">
          <ResponseModal message={infoMensage.message} status={infoMensage.status} close={closeModal} />
        </div>)
      }
      {!loading && (
        <div className="content-row">
          <button
            className='top-button'
            onClick={() => setFilterVisible(!filterVisible)}
          >
            {filterButtonText}
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
                  <th> admin</th>
                </tr>
              </thead>
              <tbody>
                {(apiData.length < 1)
                  ? (
                    <tr>
                      <td colSpan={7} className="row-text-center">
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
                        <td className="row-text-center">
                          {item.id}
                          <button
                            className="button-remove"
                            value={item.id}
                            onClick={(event) => deleteEvent(event)}
                          >
                            X
                      </button>
                        </td>
                      </tr>
                    ))
                  )
                }
              </tbody>
            </table>
          </div>
        )

      }

    </div>
  );
}