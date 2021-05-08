import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import ErrorCenterContext from '../context/ErrorCenterContext';
import { getUser } from '../services/api';
import { useHistory } from 'react-router';
import LoadingPage from '../components/LoadingPage';

export default function EventsList() {
  const { apiData, setApiData } = useContext(ErrorCenterContext);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchUsers() {
      setLoading(true);
      const response = await getUser();
      setApiData(response);
      setLoading(false);
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

      { loading
        ? (<LoadingPage />)
        : (
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
        )}
    </div>
  );
}