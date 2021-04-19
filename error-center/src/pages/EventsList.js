import React from 'react';
import Header from '../components/Header';

export default function EventsList() {

  const data = [
    {
      id: 1,
      description: 'descriçao um',
      log: 'log one',
      origin: 'computador',
      date: '10/01/2021',
      quantity: 3,
      user: 'usuario teste one',
      level: 'warning',
    },
    {
      id: 2,
      description: 'descriçao dois',
      log: 'log two',
      origin: 'tablet-androin',
      date: '20/02/2021',
      quantity: 3,
      user: 'usuario teste two',
      level: 'error',
    },
    {
      id: 3,
      description: 'descriçao três',
      log: 'log three',
      origin: 'iPhone',
      date: '30/03/2021',
      quantity: 3,
      user: 'usuario teste three',
      level: 'info',
    }
  ]

  return (
    <div>
      <Header />
      <div className="content">
        <table>
          <thead>
            <tr>
              <th>Tipo</th>
              <th>Descrição</th>
              <th>Log</th>
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
                  <td className="row-text-center" >{item.level}</td>
                  <td>{item.description}</td>
                  <td>{item.log}</td>
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