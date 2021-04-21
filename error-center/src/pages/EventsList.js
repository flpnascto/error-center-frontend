import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { getEvents } from '../services/api';

export default function EventsList() {

  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchEvents() {
      const response = await getEvents();
      setData(response);
    }
    fetchEvents();
  }, [setData]);

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
              data.map((item) => (
                <tr key={item.id} >
                  <td className="row-text-center" >{item.levelDescription}</td>
                  <td>{item.description}</td>
                  <td>{item.origin}</td>
                  <td className="row-text-center" >{item.date}</td>
                  <td className="row-text-center" >{item.quantity}</td>
                  <td>{item.userEmail}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}