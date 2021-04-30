import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import ErrorCenterContext from '../context/ErrorCenterContext';
import { getUser } from '../services/api';
import { useHistory } from 'react-router';

export default function EventsList() {
  const { apiData, setApiData } = useContext(ErrorCenterContext);

  useEffect(() => {
    async function fetchUsers() {
      const response = await getUser();
      setApiData(response);
    }
    fetchUsers();
  }, [setApiData]);

  const history = useHistory();

  return (
    <div>
      <Header />
      <div className="content-row content-end">
        <button className='top-button' onClick={() => history.goBack()}>Voltar</button>
      </div>

      <div className="content">
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Sobrenome</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {(apiData.length < 1)
              ? (
                <tr>
                  <td colSpan={3} className="row-text-center">
                    Nenhum usuário encontrado
                </td>
                </tr>
              )
              : (
                apiData.map((item) => (
                  <tr key={item.id} >
                    <td>{item.firstname}</td>
                    <td>{item.lastname}</td>
                    <td>{item.email}</td>
                  </tr>
                ))
              )
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}