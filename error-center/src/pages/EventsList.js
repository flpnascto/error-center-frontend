import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import ErrorCenterContext from '../context/ErrorCenterContext';
import { getEvents } from '../services/api';

export default function EventsList() {

  const { apiData, setApiData, filterOptions } = useContext(ErrorCenterContext);

  useEffect(() => {
    async function fetchEvents() {
      const response = await getEvents(filterOptions);
      setApiData(response);
    }
    fetchEvents();
  }, [filterOptions, setApiData]);

  return (
    <div>
      <Header />
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
            {
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
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}